import Hero from "@/components/Hero";
import Demo from "@/components/Demo";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CodeExample from "@/components/CodeExample";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Demo />
      <Features />
      <HowItWorks />
      <CodeExample />
      <Footer />
    </div>
  );
};

export default Index;
