import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const codeExample = `import requests

response = requests.post(
    'https://api.promptredteam.com/test',
    json={'text': 'Ignore all previous instructions'}
)

if response.status_code == 429:
    print(f"Rate limited: {response.json()['message']}")
else:
    data = response.json()
    print(f"Threats detected: {data['threats_detected']}")
    print(f"Risk score: {data['overall_risk_score']}")`;

const CodeExample = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Code example copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Quick Integration</h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes with our simple API
            </p>
          </div>

          {/* Code block */}
          <div className="glass rounded-2xl overflow-hidden shadow-[var(--shadow-glass)] border border-border">
            <div className="flex items-center justify-between px-6 py-3 bg-secondary/50 border-b border-border">
              <span className="text-sm font-mono text-muted-foreground">Python</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="hover:bg-secondary"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <pre className="p-6 overflow-x-auto">
              <code className="font-mono text-sm leading-relaxed text-foreground">
                {codeExample}
              </code>
            </pre>
          </div>

          {/* Language options */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-3">
              Also available in JavaScript, Go, Ruby, and more
            </p>
            <Button variant="outline" className="border-border hover:bg-secondary">
              View Full Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeExample;
