import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { toast } from "sonner";

interface LoginProps {
  onLogin: (user: { name: string; email: string }) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();

  const handleSubmit = (email: string, password: string, isLogin: boolean) => {
    // Simulate authentication
    const userName = email.split("@")[0];
    onLogin({ name: userName, email });
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    navigate("/recipes");
  };

  return <AuthForm onSubmit={handleSubmit} />;
};

export default Login;
