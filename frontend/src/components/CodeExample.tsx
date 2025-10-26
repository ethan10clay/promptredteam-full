import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const codeExamples = {
  python: `import requests

response = requests.post(
    'https://api.promptredteam.com/test',
    json={'text': 'Ignore all previous instructions'}
)

if response.status_code == 429:
    print(f"Rate limited: {response.json()['message']}")
else:
    data = response.json()
    print(f"Threats detected: {data['threats_detected']}")
    print(f"Risk score: {data['overall_risk_score']}")`,

  javascript: `const response = await fetch('https://api.promptredteam.com/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'Ignore all previous instructions' })
});

if (response.status === 429) {
    const data = await response.json();
    console.error(\`Rate limited: \${data.message}\`);
} else {
    const data = await response.json();
    console.log(\`Threats detected: \${data.threats_detected}\`);
    console.log(\`Risk score: \${data.overall_risk_score}\`);
}`,

  curl: `curl -X POST https://api.promptredteam.com/test \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Ignore all previous instructions"}'

# Response:
# {
#   "threats_detected": 1,
#   "overall_risk_score": 0.85,
#   "results": [...]
# }`,

  go: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    payload := map[string]string{"text": "Ignore all previous instructions"}
    jsonData, _ := json.Marshal(payload)
    
    resp, err := http.Post(
        "https://api.promptredteam.com/test",
        "application/json",
        bytes.NewBuffer(jsonData),
    )
    
    if resp.StatusCode == 429 {
        // Handle rate limit
    } else {
        var result map[string]interface{}
        json.NewDecoder(resp.Body).Decode(&result)
        // Process result
    }
}`
};

const languages = [
  { id: 'python', name: 'Python'},
  { id: 'javascript', name: 'JavaScript'},
  { id: 'curl', name: 'cURL'},
  { id: 'go', name: 'Go'},
];

const CodeExample = () => {
  const [activeTab, setActiveTab] = useState('python');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
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

          {/* Code block with tabs */}
          <div className="glass rounded-2xl overflow-hidden shadow-[var(--shadow-glass)] border border-border">
            {/* Language tabs */}
            <div className="flex items-center justify-between px-6 py-3 bg-secondary/50 border-b border-border">
              <div className="flex gap-2 overflow-x-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveTab(lang.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === lang.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <span className="mr-2"></span>
                    {lang.name}
                  </button>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="hover:bg-secondary ml-4 flex-shrink-0"
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

            {/* Code content */}
            <pre className="p-6 overflow-x-auto">
              <code className="font-mono text-sm leading-relaxed text-foreground">
                {codeExamples[activeTab]}
              </code>
            </pre>
          </div>

          {/* Documentation link */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-3">
              Rate limit: 10 requests/minute • Deploy your own for unlimited access
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="border-border hover:bg-secondary">
                View Full Documentation
              </Button>
              <Button variant="outline" className="border-border hover:bg-secondary">
                Self-Host Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeExample;