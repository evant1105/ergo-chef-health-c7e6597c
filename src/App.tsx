import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import AIAssistant from "./pages/AIAssistant";
import Posture from "./pages/Posture";
import About from "./pages/About";
import CookingSession from "./pages/CookingSession";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {user && <Header user={user} onLogout={handleLogout} />}
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/recipes" /> : <Login onLogin={handleLogin} />}
            />
            <Route
              path="/recipes"
              element={user ? <Recipes /> : <Navigate to="/" />}
            />
            <Route
              path="/assistant"
              element={user ? <AIAssistant /> : <Navigate to="/" />}
            />
            <Route
              path="/posture"
              element={user ? <Posture /> : <Navigate to="/" />}
            />
            <Route
              path="/about"
              element={user ? <About /> : <Navigate to="/" />}
            />
            <Route
              path="/cooking/:id"
              element={user ? <CookingSession /> : <Navigate to="/" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
