import { ChefHat } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 40,
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg`}
      >
        <ChefHat className="text-primary-foreground" size={iconSizes[size]} />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-foreground">ErgoChef+</span>
          <span className="text-sm text-muted-foreground">AI-Powered Cooking with Posture Care</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
