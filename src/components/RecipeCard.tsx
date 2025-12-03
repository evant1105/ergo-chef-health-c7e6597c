import { Clock, Users, Flame, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time: string;
  servings: number;
  calories: number;
  imageUrl?: string;
  steps: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onStartCooking: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onStartCooking }: RecipeCardProps) => {
  const difficultyClass = {
    Easy: "difficulty-easy",
    Medium: "difficulty-medium",
    Hard: "difficulty-hard",
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border animate-fade-in">
      <div className="h-48 bg-recipe-card flex items-center justify-center overflow-hidden">
        {recipe.imageUrl ? (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <ChefHat className="text-primary/30" size={80} />
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">{recipe.title}</h3>
          <span className={`difficulty-badge ${difficultyClass[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame size={14} />
            <span>{recipe.calories} cal</span>
          </div>
        </div>

        <Button
          onClick={() => onStartCooking(recipe)}
          className="w-full bg-foreground text-background hover:bg-foreground/90"
        >
          <ChefHat size={16} className="mr-2" />
          Start Cooking
        </Button>
      </div>
    </div>
  );
};

export default RecipeCard;
