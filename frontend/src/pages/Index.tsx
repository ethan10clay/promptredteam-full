import Hero from "@/components/Hero";
import Demo from "@/components/Demo";
import HowItWorks from "@/components/HowItWorks";
import CodeExample from "@/components/CodeExample";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Demo />
      <HowItWorks />
      <CodeExample />
    </div>
  );
};

export default Index;
