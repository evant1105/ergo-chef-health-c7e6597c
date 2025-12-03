import { LogOut, Book, Bot, Camera, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Recipes", icon: Book, path: "/recipes" },
    { label: "AI Assistant", icon: Bot, path: "/assistant" },
    { label: "Posture", icon: Camera, path: "/posture" },
    { label: "About Us", icon: Info, path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div onClick={() => navigate("/recipes")} className="cursor-pointer">
          <Logo size="sm" />
        </div>

        <nav className="hidden md:flex items-center bg-secondary rounded-full p-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-pill flex items-center gap-2 ${
                isActive(item.path) ? "nav-pill-active" : "nav-pill-inactive"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
