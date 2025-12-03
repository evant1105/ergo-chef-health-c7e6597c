import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  suggestions?: string[];
}

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your AI cooking assistant. I can help you with recipes, cooking techniques, substitutions, and nutritional advice. What would you like to cook today?",
      isBot: true,
      suggestions: ["Quick dinner ideas", "Healthy recipes", "Baking tips", "Ingredient substitutions"]
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input),
        isBot: true
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (query: string): string => {
    const lower = query.toLowerCase();
    if (lower.includes("dinner") || lower.includes("quick")) {
      return "For a quick dinner, I recommend Garlic Butter Shrimp - it takes only 15 minutes! You could also try a simple stir-fry or pasta with olive oil and garlic. Would you like detailed instructions for any of these?";
    }
    if (lower.includes("healthy")) {
      return "For healthy options, try our Greek Salad or Caprese Salad. Both are packed with fresh vegetables and take under 15 minutes. You can also make chicken stir-fry with extra vegetables for a nutritious meal!";
    }
    if (lower.includes("baking")) {
      return "Great choice! Key baking tips: Always measure ingredients precisely, room temperature butter creams better, and don't overmix your batter. What would you like to bake?";
    }
    if (lower.includes("substitute") || lower.includes("replacement")) {
      return "I can help with substitutions! Common ones: Greek yogurt for sour cream, applesauce for oil in baking, chicken broth for wine. What ingredient do you need to replace?";
    }
    return "That's a great question! I'd be happy to help you with that. Could you tell me more about what you're looking to cook or any dietary preferences you have?";
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="text-primary" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">AI Cooking Assistant</h2>
                <p className="text-sm text-muted-foreground">
                  Get personalized recipe suggestions, cooking tips, and answers to your culinary questions
                </p>
              </div>
            </div>
          </div>

          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`animate-fade-in ${message.isBot ? "" : "flex justify-end"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.isBot
                      ? "bg-secondary text-foreground"
                      : "bg-foreground text-background"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleSuggestion(suggestion)}
                          className="text-xs px-3 py-1.5 rounded-full bg-card text-foreground hover:bg-accent transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about cooking..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="bg-background border-border"
              />
              <Button
                onClick={handleSend}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
