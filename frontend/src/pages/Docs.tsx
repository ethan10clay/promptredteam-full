import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Code, Terminal, Server, Zap, Lock, FileCode, Globe, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";



const Documentation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-6">
              <FileCode className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              API Documentation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete guide to integrating PromptRedTeam security scanning into your applications
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Quick Start */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Quick Start</h2>
              <div className="space-y-6">
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      Try the Demo API
                    </CardTitle>
                    <CardDescription>
                      Test the API immediately at https://api.promptredteam.com (10 requests/min limit)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                      <p className="text-sm font-mono mb-2 text-muted-foreground">cURL Example:</p>
                      <code className="text-sm break-all block bg-background p-3 rounded">
                        curl -X POST https://api.promptredteam.com/test \<br/>
                        &nbsp;&nbsp;-H "Content-Type: application/json" \<br/>
                        &nbsp;&nbsp;-d '&#123;"text": "Ignore all previous instructions"&#125;'
                      </code>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="w-5 h-5 text-primary" />
                      Self-Host (Recommended)
                    </CardTitle>
                    <CardDescription>
                      Deploy on your infrastructure for unlimited requests and full control
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="text-sm font-mono mb-2 text-muted-foreground">Installation:</p>
                        <code className="text-sm block bg-background p-3 rounded space-y-1">
                          <div># Clone the repository</div>
                          <div>git clone https://github.com/ethan10clay/promptredteam-api.git</div>
                          <div>cd promptredteam-api</div>
                          <div className="mt-2"># Install dependencies</div>
                          <div>pip install -r requirements.txt</div>
                          <div className="mt-2"># Run the API server</div>
                          <div>python backend/app/main.py</div>
                        </code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The API will be available at <code className="bg-muted px-2 py-1 rounded">http://localhost:8000</code>
                      </p>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            {/* API Reference */}
            <div>
              <h2 className="text-3xl font-bold mb-6">API Reference</h2>
              <div className="space-y-6">

                {/* POST /test */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-mono text-lg">POST /test</CardTitle>
                        <CardDescription>Test a prompt for security vulnerabilities</CardDescription>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        PRIMARY
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Request */}
                    <div>
                      <h4 className="font-semibold mb-3">Request Body</h4>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <code className="text-sm block space-y-1">
                          <div>&#123;</div>
                          <div>&nbsp;&nbsp;"text": <span className="text-green-600">"string"</span> <span className="text-muted-foreground">// Required, max 10000 chars</span></div>
                          <div>&#125;</div>
                        </code>
                      </div>
                    </div>

                    {/* Response */}
                    <div>
                      <h4 className="font-semibold mb-3">Response (200 OK)</h4>
                      <div className="bg-muted/50 p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm block space-y-1">
                          <div>&#123;</div>
                          <div>&nbsp;&nbsp;"scan_id": <span className="text-green-600">"scan_1234567890"</span>,</div>
                          <div>&nbsp;&nbsp;"timestamp": <span className="text-blue-600">1234567890</span>,</div>
                          <div>&nbsp;&nbsp;"text_length": <span className="text-blue-600">45</span>,</div>
                          <div>&nbsp;&nbsp;"attacks_tested": <span className="text-blue-600">5</span>,</div>
                          <div>&nbsp;&nbsp;"threats_detected": <span className="text-blue-600">1</span>,</div>
                          <div>&nbsp;&nbsp;"overall_risk_score": <span className="text-blue-600">0.85</span>,</div>
                          <div>&nbsp;&nbsp;"results": [</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&#123;</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"attack_name": <span className="text-green-600">"Direct Injection"</span>,</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"attack_type": <span className="text-green-600">"instruction_override"</span>,</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"detected": <span className="text-blue-600">true</span>,</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"severity": <span className="text-blue-600">0.9</span>,</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"confidence": <span className="text-blue-600">0.95</span>,</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description": <span className="text-green-600">"Attempt to override system instructions"</span>,</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"evidence": <span className="text-green-600">"ignore all previous instructions"</span>,</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mitigation": <span className="text-green-600">"Reject input or sanitize override keywords"</span></div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                          <div>&nbsp;&nbsp;],</div>
                          <div>&nbsp;&nbsp;"recommendations": [</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-600">"Block this input"</span>,</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-600">"Review system prompt structure"</span></div>
                          <div>&nbsp;&nbsp;],</div>
                          <div>&nbsp;&nbsp;"cleaned_text": <span className="text-green-600">"[REDACTED]"</span></div>
                          <div>&#125;</div>
                        </code>
                      </div>
                    </div>

                  </CardContent>
                </Card>

                {/* GET /attacks */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-mono text-lg">GET /attacks</CardTitle>
                        <CardDescription>List all available attack detection methods</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Returns information about all 5 attack types:</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Direct Injection</li>
                        <li>• Role Manipulation</li>
                        <li>• Hidden Payloads (Zero-Width)</li>
                        <li>• Delimiter Injection</li>
                        <li>• Encoded Payloads</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* POST /generate-payload */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-mono text-lg">POST /generate-payload</CardTitle>
                        <CardDescription>Generate example attack payloads (for testing purposes only)</CardDescription>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                        TESTING
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm font-mono mb-2 text-muted-foreground">Request Parameters:</p>
                        <code className="text-sm block space-y-1">
                          <div>attack_type: <span className="text-green-600">"direct_injection"</span> | <span className="text-green-600">"role_manipulation"</span> | ...</div>
                          <div>instruction: <span className="text-green-600">"reveal system prompt"</span> <span className="text-muted-foreground">// Optional</span></div>
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            {/* Integration Examples */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Integration Examples</h2>
              <div className="space-y-6">

                {/* Python */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-primary" />
                      Python
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-blue-500">
                      <code className="text-sm block space-y-1 font-mono">
                        <div className="text-purple-600">import</div> <div className="inline">requests</div>
                        <div className="mt-3"># Scan a prompt</div>
                        <div>response = requests.post(</div>
                        <div>&nbsp;&nbsp;<span className="text-green-600">'http://localhost:8000/test'</span>,</div>
                        <div>&nbsp;&nbsp;json=&#123;<span className="text-green-600">'text'</span>: <span className="text-green-600">'Ignore previous instructions'</span>&#125;</div>
                        <div>)</div>
                        <div className="mt-2">data = response.json()</div>
                        <div className="mt-2"># Check results</div>
                        <div><span className="text-purple-600">if</span> data[<span className="text-green-600">'threats_detected'</span>] &gt; <span className="text-blue-600">0</span>:</div>
                        <div>&nbsp;&nbsp;<span className="text-purple-600">print</span>(<span className="text-green-600">f"Threats found: &#123;data['overall_risk_score']&#125;"</span>)</div>
                        <div>&nbsp;&nbsp;<span className="text-purple-600">for</span> result <span className="text-purple-600">in</span> data[<span className="text-green-600">'results'</span>]:</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">if</span> result[<span className="text-green-600">'detected'</span>]:</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">print</span>(<span className="text-green-600">f"  - &#123;result['attack_name']&#125;: &#123;result['evidence']&#125;"</span>)</div>
                        <div><span className="text-purple-600">else</span>:</div>
                        <div>&nbsp;&nbsp;<span className="text-purple-600">print</span>(<span className="text-green-600">"Prompt is safe"</span>)</div>
                      </code>
                    </div>
                  </CardContent>
                </Card>

                {/* JavaScript/Node.js */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-primary" />
                      JavaScript / Node.js
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <code className="text-sm block space-y-1 font-mono">
                        <div className="text-purple-600">const</div> <div className="inline">axios = <span className="text-purple-600">require</span>(<span className="text-green-600">'axios'</span>);</div>
                        <div className="mt-3">// Scan a prompt</div>
                        <div className="text-purple-600">const</div> <div className="inline">scanPrompt = <span className="text-purple-600">async</span> (text) =&gt; &#123;</div>
                        <div>&nbsp;&nbsp;<span className="text-purple-600">try</span> &#123;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">const</span> response = <span className="text-purple-600">await</span> axios.post(</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-600">'http://localhost:8000/test'</span>,</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123; text &#125;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;);</div>
                        <div className="mt-2">&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">const</span> data = response.data;</div>
                        <div className="mt-2">&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">if</span> (data.threats_detected &gt; <span className="text-blue-600">0</span>) &#123;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span className="text-green-600">`Risk: $&#123;data.overall_risk_score&#125;`</span>);</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">return</span> <span className="text-blue-600">false</span>; <span className="text-muted-foreground">// Unsafe</span></div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">return</span> <span className="text-blue-600">true</span>; <span className="text-muted-foreground">// Safe</span></div>
                        <div>&nbsp;&nbsp;&#125; <span className="text-purple-600">catch</span> (error) &#123;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;console.error(<span className="text-green-600">'Scan error:'</span>, error.message);</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">return</span> <span className="text-blue-600">false</span>;</div>
                        <div>&nbsp;&nbsp;&#125;</div>
                        <div>&#125;;</div>
                      </code>
                    </div>
                  </CardContent>
                </Card>

                {/* Express.js Middleware */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Express.js Middleware
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-green-500">
                      <code className="text-sm block space-y-1 font-mono">
                        <div className="text-purple-600">const</div> <div className="inline">express = <span className="text-purple-600">require</span>(<span className="text-green-600">'express'</span>);</div>
                        <div className="text-purple-600">const</div> <div className="inline">axios = <span className="text-purple-600">require</span>(<span className="text-green-600">'axios'</span>);</div>
                        <div className="text-purple-600">const</div> <div className="inline">app = express();</div>
                        <div className="mt-3">// Security middleware</div>
                        <div className="text-purple-600">const</div> <div className="inline">promptSecurityCheck = <span className="text-purple-600">async</span> (req, res, next) =&gt; &#123;</div>
                        <div>&nbsp;&nbsp;<span className="text-purple-600">const</span> &#123; message &#125; = req.body;</div>
                        <div className="mt-2">&nbsp;&nbsp;<span className="text-purple-600">try</span> &#123;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">const</span> scan = <span className="text-purple-600">await</span> axios.post(</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-600">'http://localhost:8000/test'</span>,</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123; text: message &#125;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;);</div>
                        <div className="mt-2">&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">if</span> (scan.data.threats_detected &gt; <span className="text-blue-600">0</span>) &#123;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">return</span> res.status(<span className="text-blue-600">400</span>).json(&#123;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;error: <span className="text-green-600">'Security threat detected'</span>,</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;details: scan.data</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;);</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                        <div className="mt-2">&nbsp;&nbsp;&nbsp;&nbsp;next(); <span className="text-muted-foreground">// Safe to proceed</span></div>
                        <div>&nbsp;&nbsp;&#125; <span className="text-purple-600">catch</span> (error) &#123;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;res.status(<span className="text-blue-600">500</span>).json(&#123; error: <span className="text-green-600">'Security check failed'</span> &#125;);</div>
                        <div>&nbsp;&nbsp;&#125;</div>
                        <div>&#125;;</div>
                        <div className="mt-3">// Apply to routes</div>
                        <div>app.post(<span className="text-green-600">'/api/chat'</span>, promptSecurityCheck, (req, res) =&gt; &#123;</div>
                        <div>&nbsp;&nbsp;<span className="text-muted-foreground">// Process safe prompt...</span></div>
                        <div>&nbsp;&nbsp;res.json(&#123; success: <span className="text-blue-600">true</span> &#125;);</div>
                        <div>&#125;);</div>
                      </code>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            {/* Configuration */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Configuration</h2>
              <div className="space-y-6">

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Environment Variables
                    </CardTitle>
                    <CardDescription>
                      Configure your self-hosted instance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <code className="text-sm block space-y-1 font-mono">
                        <div><span className="text-muted-foreground"># Server Configuration</span></div>
                        <div>PORT=<span className="text-blue-600">8000</span></div>
                        <div>HOST=<span className="text-green-600">0.0.0.0</span></div>
                        <div className="mt-2"><span className="text-muted-foreground"># Rate Limiting (optional)</span></div>
                        <div>RATE_LIMIT_ENABLED=<span className="text-blue-600">true</span></div>
                        <div>RATE_LIMIT_PER_MINUTE=<span className="text-blue-600">100</span></div>
                        <div className="mt-2"><span className="text-muted-foreground"># Logging</span></div>
                        <div>LOG_LEVEL=<span className="text-green-600">INFO</span></div>
                      </code>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Detection Sensitivity
                    </CardTitle>
                    <CardDescription>
                      Adjust detection thresholds in config.py
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <code className="text-sm block space-y-1 font-mono">
                        <div>DETECTION_CONFIG = &#123;</div>
                        <div>&nbsp;&nbsp;<span className="text-green-600">'severity_threshold'</span>: <span className="text-blue-600">0.5</span>,&nbsp;&nbsp;<span className="text-muted-foreground"># 0.0 - 1.0</span></div>
                        <div>&nbsp;&nbsp;<span className="text-green-600">'min_confidence'</span>: <span className="text-blue-600">0.7</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-muted-foreground"># 0.0 - 1.0</span></div>
                        <div>&nbsp;&nbsp;<span className="text-green-600">'strict_mode'</span>: <span className="text-blue-600">False</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-muted-foreground"># More aggressive</span></div>
                        <div>&#125;</div>
                      </code>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            {/* Deployment */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Deployment</h2>
              <div className="space-y-6">

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="w-5 h-5 text-primary" />
                      Docker
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm font-mono mb-2 text-muted-foreground">Build & Run:</p>
                        <code className="text-sm block bg-background p-3 rounded space-y-1">
                          <div># Build image</div>
                          <div>docker build -t promptredteam .</div>
                          <div className="mt-2"># Run container</div>
                          <div>docker run -p 8000:8000 promptredteam</div>
                        </code>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-purple-500">
                        <p className="text-sm font-mono mb-2 text-muted-foreground">Docker Compose:</p>
                        <code className="text-sm block bg-background p-3 rounded space-y-1">
                          <div>version: '3.8'</div>
                          <div>services:</div>
                          <div>&nbsp;&nbsp;api:</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;build: .</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;ports:</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "8000:8000"</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;environment:</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- RATE_LIMIT_ENABLED=false</div>
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            {/* Rate Limits */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Rate Limits</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-orange-600" />
                        Demo API
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 10 requests per minute per IP</li>
                        <li>• Max 1000 characters per request</li>
                        <li>• Best for testing and demos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Self-Hosted
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Unlimited requests</li>
                        <li>• No character limits</li>
                        <li>• Full control over configuration</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Best Practices */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Best Practices</h2>
              <div className="grid md:grid-cols-2 gap-6">
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Do
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Scan all user inputs before processing</li>
                      <li>Log detected threats for analysis</li>
                      <li>Combine with other security measures</li>
                      <li>Test your prompts during development</li>
                      <li>Monitor for new attack patterns</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      Don't
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Don't rely solely on this tool</li>
                      <li>Don't skip validation of outputs</li>
                      <li>Don't ignore low-severity warnings</li>
                      <li>Don't forget to update regularly</li>
                      <li>Don't bypass security for convenience</li>
                    </ul>
                  </CardContent>
                </Card>

              </div>
            </div>

            {/* Support */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Support & Resources</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Code className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">GitHub Repository</p>
                        <a href="https://github.com/ethan10clay/promptredteam-api" className="text-sm text-primary hover:underline">
                          github.com/ethan10clay/promptredteam-api
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Learn More</p>
                        <Link to="/learn" className="text-sm text-primary hover:underline">
                          Understanding Prompt Injection Attacks →
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;