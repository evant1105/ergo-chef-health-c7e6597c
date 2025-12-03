import { useState } from "react";
import { Camera, CheckCircle, AlertTriangle, XCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type PostureStatus = "good" | "warning" | "poor" | null;

const Posture = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [demoStatus, setDemoStatus] = useState<PostureStatus>("good");

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
          color: "text-destructive",
          bg: "bg-destructive/10",
          title: "Poor Posture Detected",
          message: "Significant posture issues detected. Please take a break and stretch. Focus on: straightening your spine, pulling shoulders back, and lifting your chin. Consider using a footrest or anti-fatigue mat."
        };
      default:
        return null;
    }
  };

  const statusInfo = demoStatus ? getStatusInfo(demoStatus) : null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">Posture Monitoring</h2>
          <p className="text-muted-foreground mb-6">
            Keep your back straight and shoulders relaxed while cooking. Get AI-powered ergonomic advice.
          </p>

          <div className="bg-secondary rounded-xl p-8 flex flex-col items-center justify-center min-h-[200px]">
            {cameraActive ? (
              <div className="text-center">
                <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-muted-foreground">Camera feed would appear here</p>
                </div>
                <Button variant="outline" onClick={() => setCameraActive(false)}>
                  Stop Camera
                </Button>
              </div>
            ) : (
              <>
                <Camera className="text-muted-foreground mb-4" size={48} />
                <p className="text-muted-foreground mb-4 text-center">
                  Start your camera to monitor your posture while cooking
                </p>
                <Button
                  onClick={() => setCameraActive(true)}
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  <Camera size={16} className="mr-2" />
                  Start Camera
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Demo: AI Posture Advice Examples</h3>
              <p className="text-sm text-muted-foreground">
                Preview what AI posture feedback looks like for different posture statuses. Select a status below to see personalized ergonomic advice.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
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
