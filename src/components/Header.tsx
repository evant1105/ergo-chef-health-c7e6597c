import { useState } from "react";
import { LogOut, Book, Bot, Camera, Info, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface HeaderProps {
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Recipes", icon: Book, path: "/recipes" },
    { label: "AI Assistant", icon: Bot, path: "/assistant" },
    { label: "Posture", icon: Camera, path: "/posture" },
    { label: "About Us", icon: Info, path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div onClick={() => navigate("/recipes")} className="cursor-pointer">
          <Logo size="sm" />
        </div>

        {/* Desktop Navigation */}
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

        <div className="flex items-center gap-4">
          {/* Desktop User Info & Logout */}
          {user && (
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
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

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                {/* Accessibility titles - Hidden visually but present for screen readers */}
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate through the application pages
                </SheetDescription>

                <div className="flex flex-col gap-6 mt-6">
                  <div className="px-2">
                    <Logo size="md" />
                  </div>
                  
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                          isActive(item.path)
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        <item.icon size={20} />
                        {item.label}
                      </button>
                    ))}
                  </nav>

                  {user && (
                    <div className="mt-auto pt-6 border-t border-border">
                      <div className="px-4 mb-4">
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Button
                        variant="destructive"
                        className="w-full justify-start gap-3"
                        onClick={() => {
                          if (onLogout) onLogout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut size={18} />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
