import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, CheckCircle, AlertTriangle, XCircle, Sparkles, Loader2, Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type PostureStatus = "good" | "warning" | "poor" | null;

interface PostureAnalysis {
  status: PostureStatus;
  title: string;
  observations: string[];
  recommendations: string[];
  message: string;
}

const Posture = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<PostureAnalysis | null>(null);
  const [demoStatus, setDemoStatus] = useState<PostureStatus>("good");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      console.log("Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      console.log("Camera stream obtained:", stream.getTracks());
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready before showing
        videoRef.current.onloadedmetadata = () => {
          console.log("Video metadata loaded, playing...");
          videoRef.current?.play().then(() => {
            console.log("Video playing successfully");
            setCameraActive(true);
            toast.success("Camera started! Position yourself and click 'Analyze Posture'");
          }).catch(err => {
            console.error("Video play error:", err);
            toast.error("Could not start video playback");
          });
        };
      } else {
        console.error("Video ref is null despite being rendered");
        toast.error("Internal error: Video element not found");
      }
    } catch (error) {
      console.error("Camera error:", error);
      toast.error("Could not access camera. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setCountdown(null);
    setIsAnalyzing(false);
  };

  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current) {
      console.error("Video or canvas ref not available");
      return null;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error("Could not get canvas context");
      return null;
    }
    
    console.log("Capturing frame - video dimensions:", video.videoWidth, "x", video.videoHeight);
    
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error("Video has no dimensions yet");
      return null;
    }
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    console.log("Frame captured, data URL length:", dataUrl.length);
    
    return dataUrl;
  }, []);

  const analyzePosture = async () => {
    setIsAnalyzing(true);
    setCountdown(5); // Timer set to 5 seconds
    setAnalysis(null);
    
    toast.info("Hold your cooking position for 5 seconds...");
  };

  useEffect(() => {
    if (countdown === null || countdown < 0) return;
    
    if (countdown === 0) {
      // Capture and analyze
      const imageBase64 = captureFrame();
      
      if (!imageBase64) {
        toast.error("Failed to capture image");
        setIsAnalyzing(false);
        setCountdown(null);
        return;
      }
      
      // Send to AI for analysis
      const analyze = async () => {
        try {
          console.log("Sending image to posture analysis API...");
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/posture-analysis`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              },
              body: JSON.stringify({ imageBase64 }),
            }
          );
          
          console.log("Response status:", response.status);

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Analysis failed');
          }

          const result: PostureAnalysis = await response.json();
          setAnalysis(result);
          
          if (result.status === 'good') {
            toast.success("Great posture detected!");
          } else if (result.status === 'warning') {
            toast.warning("Some posture improvements recommended");
          } else {
            toast.error("Posture needs attention");
          }
        } catch (error) {
          console.error("Analysis error:", error);
          toast.error(error instanceof Error ? error.message : "Failed to analyze posture");
        } finally {
          setIsAnalyzing(false);
          setCountdown(null);
        }
      };
      
      analyze();
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, captureFrame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Real Camera Section */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">Posture Monitoring</h2>
          <p className="text-muted-foreground mb-6">
            Keep your back straight and shoulders relaxed while cooking. Get AI-powered ergonomic advice.
          </p>

          <div className="bg-secondary rounded-xl p-4 flex flex-col items-center justify-center min-h-[300px]">
            {/* Video container is always present but hidden via CSS when inactive */}
            <div className={`w-full ${cameraActive ? 'block' : 'hidden'}`}>
              <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {countdown !== null && countdown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-6xl font-bold text-white animate-pulse">
                      {countdown}
                    </div>
                  </div>
                )}
                
                {isAnalyzing && countdown === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Loader2 className="animate-spin" size={48} />
                      <span>Analyzing posture...</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={analyzePosture}
                  disabled={isAnalyzing}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} className="mr-2" />
                      Analyze Posture (5s scan)
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={stopCamera}>
                  <VideoOff size={16} className="mr-2" />
                  Stop Camera
                </Button>
              </div>
            </div>

            {!cameraActive && (
              <>
                <Camera className="text-muted-foreground mb-4" size={48} />
                <p className="text-muted-foreground mb-4 text-center">
                  Start your camera to monitor your posture while cooking
                </p>
                <Button
                  onClick={startCamera}
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  <Video size={16} className="mr-2" />
                  Start Camera
                </Button>
              </>
            )}
          </div>
        </div>

        {/* AI Analysis Results */}
        {analysis && (
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Posture Analysis</h3>
                <p className="text-sm text-muted-foreground">Real-time feedback from your scan</p>
              </div>
            </div>

            {(() => {
              const info = getAnalysisStatusInfo(analysis.status);
              if (!info) return null;
              return (
                <div className={`rounded-xl p-4 ${info.bg} mb-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <info.icon className={info.color} size={20} />
                    <h4 className={`font-semibold ${info.color}`}>{analysis.title}</h4>
                  </div>
                  <p className="text-foreground text-sm mb-4">{analysis.message}</p>
                  
                  {analysis.observations.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-foreground mb-2">Observations:</h5>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {analysis.observations.map((obs, i) => (
                          <li key={i}>{obs}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {analysis.recommendations.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Recommendations:</h5>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {analysis.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Demo Section */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="text-primary" size={20} />
            </div>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            <Button
              variant={demoStatus === "good" ? "default" : "outline"}
              size="sm"
              onClick={() => setDemoStatus("good")}
              className={demoStatus === "good" ? "bg-foreground text-background" : ""}
            >
              <CheckCircle size={14} className="mr-1" />
              Good Posture
            </Button>
            <Button
              variant={demoStatus === "warning" ? "default" : "outline"}
              size="sm"
              onClick={() => setDemoStatus("warning")}
              className={demoStatus === "warning" ? "bg-foreground text-background" : ""}
            >
              <AlertTriangle size={14} className="mr-1" />
              Needs Improvement
            </Button>
            <Button
              variant={demoStatus === "poor" ? "default" : "outline"}
              size="sm"
              onClick={() => setDemoStatus("poor")}
              className={demoStatus === "poor" ? "bg-foreground text-background" : ""}
            >
              <XCircle size={14} className="mr-1" />
              Poor Posture
            </Button>
          </div>

          {statusInfo && (
            <div className={`rounded-xl p-4 ${statusInfo.bg} animate-fade-in`}>
              <div className="flex items-center gap-2 mb-2">
                <statusInfo.icon className={statusInfo.color} size={20} />
                <h4 className={`font-semibold ${statusInfo.color}`}>{statusInfo.title}</h4>
              </div>
              <p className="text-foreground text-sm">{statusInfo.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posture;
