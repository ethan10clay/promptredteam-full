import { Target, Lock, Zap } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Direct Injection Detection",
    description: "Catches attempts to override system instructions and manipulate AI behavior",
  },
  {
    icon: Lock,
    title: "Hidden Payload Analysis",
    description: "Discovers encoded attacks and zero-width character exploits invisible to the eye",
  },
  {
    icon: Zap,
    title: "Role Manipulation Prevention",
    description: "Identifies jailbreak attempts and unauthorized role changes (DAN, etc.)",
  },
];

const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300 shadow-[var(--shadow-glass)] group"
                >
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
