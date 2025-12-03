import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, Circle, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { recipes } from "@/data/recipes";

const CookingSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === id);

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Recipe not found</p>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((s) => s !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const progress = (completedSteps.length / recipe.steps.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/recipes")}
          className="mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Recipes
        </Button>

        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="bg-recipe-card p-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">{recipe.title}</h1>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-foreground">
                    {formatTime(timerSeconds)}
                  </div>
                  <p className="text-xs text-muted-foreground">Elapsed Time</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setTimerRunning(!timerRunning)}
                  >
                    {timerRunning ? <Pause size={16} /> : <Play size={16} />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setTimerSeconds(0);
                      setTimerRunning(false);
                    }}
                  >
                    <RotateCcw size={16} />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="font-semibold text-foreground">
                  {completedSteps.length} / {recipe.steps.length} steps
                </p>
              </div>
            </div>

            <Progress value={progress} className="mb-6 h-2" />

            <div className="space-y-3">
              {recipe.steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => toggleStep(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    completedSteps.includes(index)
                      ? "bg-success/10 border-success/30"
                      : currentStep === index
                      ? "bg-secondary border-primary"
                      : "bg-background border-border hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="text-success mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-muted-foreground mt-0.5" size={20} />
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Step {index + 1}</p>
                      <p className={`text-sm ${completedSteps.includes(index) ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {step}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {completedSteps.length === recipe.steps.length && (
              <div className="mt-6 p-4 bg-success/10 rounded-xl text-center animate-fade-in">
                <CheckCircle className="text-success mx-auto mb-2" size={32} />
                <p className="font-semibold text-success">Cooking Complete!</p>
                <p className="text-sm text-muted-foreground">Great job finishing {recipe.title}!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingSession;
