import { Target, Eye, Heart, ChefHat } from "lucide-react";
import Logo from "@/components/Logo";

const About = () => {
  const cards = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make cooking healthier and more enjoyable by combining culinary expertise with ergonomic science, preventing kitchen-related injuries while enhancing cooking skills.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To become the world's leading platform for health-conscious cooking, where every kitchen becomes a space of wellness, creativity, and proper body mechanics.",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Health first, innovation always, and user experience at the core. We believe in preventing pain before it starts and empowering home cooks worldwide.",
      color: "bg-success/10 text-success"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-recipe-card rounded-3xl p-12 text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">About ErgoChef+</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing home cooking with AI-powered assistance and real-time ergonomic monitoring
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                <card.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-2xl p-8 shadow-sm border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Why ErgoChef+?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">The Problem</h4>
              <p>
                Millions of home cooks experience back pain, neck strain, and shoulder discomfort from prolonged 
                kitchen work. Poor posture during cooking leads to chronic issues that affect daily life.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Our Solution</h4>
              <p>
                ErgoChef+ is the first platform that combines AI cooking assistance with real-time posture 
                monitoring, helping you create delicious meals while maintaining healthy body mechanics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
