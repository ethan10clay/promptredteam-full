import { Send, Search, FileText } from "lucide-react";

const steps = [
  {
    icon: Send,
    title: "Send Your Prompt",
    description: "Simple API integration with just one endpoint",
  },
  {
    icon: Search,
    title: "We Analyze",
    description: "5+ detection algorithms scan for threats in milliseconds",
  },
  {
    icon: FileText,
    title: "Get Results",
    description: "Instant security report with mitigation advice",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to secure your AI
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"></div>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="text-center">
                    {/* Step number */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="p-6 rounded-2xl glass glow-red border-2 border-primary/30 bg-background">
                          <Icon className="w-10 h-10 text-primary" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
