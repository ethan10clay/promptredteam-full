import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-glow-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Shield icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl glass glow-red">
              <Shield className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Test for{" "}
            <span className="text-gradient-red">Prompt Injection </span>{" "}
            Before
            <span className="text-gradient-red"> Attackers </span>
            Do
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Detect hidden payloads, role manipulation, and direct injection attacks in your LLM applications
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 glow-red hover:scale-105 transition-transform"
              onClick={scrollToDemo}
            >
              Try Live Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-border hover:bg-secondary"
              asChild
            >
              <Link to="/Learn">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
