import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for testing and small projects",
    features: [
      "100 scans/month",
      "All attack detection types",
      "API access",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For production applications",
    features: [
      "10,000 scans/month",
      "Priority API access",
      "Webhook notifications",
      "Email support",
      "Early access to new features",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale deployments",
    features: [
      "Unlimited scans",
      "Self-hosted option",
      "Custom attack patterns",
      "SLA guarantee",
      "Dedicated support",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your needs
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`glass rounded-2xl p-8 shadow-[var(--shadow-glass)] ${
                  tier.highlighted
                    ? "border-2 border-primary glow-red scale-105 md:scale-110"
                    : "border border-border"
                } transition-transform hover:scale-105 md:hover:scale-110`}
              >
                {tier.highlighted && (
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && (
                      <span className="text-muted-foreground">{tier.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    tier.highlighted
                      ? "glow-red"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
