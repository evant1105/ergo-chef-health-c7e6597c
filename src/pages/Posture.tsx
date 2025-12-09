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
    setCountdown(5); // CHANGED: Reduced from 10 to 5 seconds
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

  const getStatusInfo = (status: PostureStatus) => {
    switch (status) {
      case "good":
        return {
          icon: CheckCircle,
          color: "text-success",
          bg: "bg-success/10",
          title: "Great Posture!",
          message: "You're maintaining excellent posture. Keep your shoulders relaxed and back straight. Your spine alignment is optimal for comfortable cooking."
        };
      case "warning":
        return {
          icon: AlertTriangle,
          color: "text-warning",
          bg: "bg-warning/10",
          title: "Needs Improvement",
          message: "Your shoulders appear slightly hunched. Try rolling them back and engaging your core. Consider adjusting your countertop height if you're bending forward frequently."
        };
      case "poor":
        return {
          icon: XCircle,
          color: "
