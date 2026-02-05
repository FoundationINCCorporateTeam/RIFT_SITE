import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import { 
  Zap, 
  ArrowRight,
  Terminal,
  Copy
} from "lucide-react";
import ComparisonSection from "@/components/home/ComparisonSection";
import InstallSection from "@/components/home/InstallSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";

// Hero code example
const heroCode = `grab http

http.get("/api/users", conduit(req) @
    let users = db.table("users").get()
    give http.json(200, users)
#)

http.serve(8080)`;

// Syntax showcase examples
const syntaxExamples = [
  {
    symbol: '@ #',
    name: 'Block Delimiters',
    description: 'Clean visual blocks instead of curly braces',
    example: 'if active @\n    print("Yes")\n#',
  },
  {
    symbol: '~ !',
    name: 'Array Syntax',
    description: 'Distinctive array notation',
    example: 'let items = ~1, 2, 3!',
  },
  {
    symbol: '=!',
    name: 'Lambda Arrow',
    description: 'Concise function expressions',
    example: 'let double = (x) =! x * 2',
  },
  {
    symbol: '-!',
    name: 'Pipeline Operator',
    description: 'Chain operations elegantly',
    example: 'data -! filter(fn) -! map(fn)',
  },
  {
    symbol: '?.',
    name: 'Safe Navigation',
    description: 'Handle nulls gracefully',
    example: 'user?.profile?.name',
  },
  {
    symbol: '??',
    name: 'Null Coalescing',
    description: 'Default values made easy',
    example: 'let name = input ?? "Guest"',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-blue)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-purple)]/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] mb-6">
                <span className="text-[var(--accent-green)]">●</span>
                <span className="text-sm text-[var(--text-secondary)]">Version 0.1.0 Beta - Now Available</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-[var(--text-primary)]">The Backend Language</span>
                <br />
                <span className="bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-teal)] bg-clip-text text-transparent">
                  That Just Works
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0">
                Zero setup. Built-in everything. From database to deployment in under 10 lines of code.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/installation"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--accent-blue)] text-white font-semibold text-lg hover:bg-[var(--accent-blue)]/90 transition-all duration-200 btn-glow flex items-center justify-center gap-2"
                >
                  Get Started in 30 Seconds
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/playground"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[var(--glass-border)] text-[var(--text-primary)] font-semibold text-lg hover:bg-[var(--bg-secondary)] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Terminal className="w-5 h-5" />
                  Try Live Demo
                </Link>
              </div>
            </div>
            
            {/* Right content - Code example */}
            <div className="lg:pl-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-blue)]/20 to-[var(--accent-purple)]/20 rounded-2xl blur-xl" />
                <div className="relative">
                  <CodeBlock
                    code={heroCode}
                    language="rift"
                    filename="server.rift"
                  />
                </div>
              </div>
              <p className="text-center text-sm text-[var(--text-muted)] mt-4">
                A complete REST API in 8 lines. No dependencies. No setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why RIFT Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Why RIFT?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Other languages make you jump through hoops. RIFT lets you build.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pain points */}
            <div className="glass rounded-xl p-6 glass-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent-orange)]/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🐍</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Python</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Virtual environments, pip, requirements.txt, dependency conflicts...
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 glass-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent-orange)]/20 flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">JavaScript/Node</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                node_modules folder larger than your entire project, npm audit nightmares...
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 glass-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent-orange)]/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🐘</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">PHP</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Apache, nginx, XAMPP, composer, config files everywhere...
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 glass-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent-orange)]/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🦫</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Go</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Verbose error handling, if err != nil on every line...
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 glass-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent-orange)]/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🦀</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Rust</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Compile times measured in coffee breaks, steep learning curve...
              </p>
            </div>
            
            {/* RIFT solution */}
            <div className="glass rounded-xl p-6 border-2 border-[var(--accent-green)] bg-[var(--accent-green)]/5 glass-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent-green)]/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[var(--accent-green)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">RIFT</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                One command install. Zero config. Built-in everything. Just code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Comparison Section */}
      <ComparisonSection />

      {/* Unique Syntax Showcase */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Unique Syntax, Modern Feel
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              RIFT uses distinctive delimiters that reduce visual noise and make code more readable.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {syntaxExamples.map((item, index) => (
              <div key={index} className="glass rounded-xl p-6 glass-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <code className="text-2xl font-bold text-[var(--accent-blue)] font-mono">
                    {item.symbol}
                  </code>
                  <h3 className="font-semibold text-[var(--text-primary)]">{item.name}</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{item.description}</p>
                <code className="block p-3 rounded-lg bg-[var(--bg-tertiary)] text-sm font-mono text-[var(--text-primary)] whitespace-pre">
                  {item.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built-in Features */}
      <FeaturesGrid />

      {/* Installation Preview */}
      <InstallSection />

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[var(--accent-blue)]/20 to-transparent rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Ready to Build Faster?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Join developers who have discovered a better way to build backends. Get started with RIFT in seconds.
          </p>
          
          <div className="glass rounded-xl p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-[var(--bg-tertiary)]">
              <code className="text-sm sm:text-base font-mono text-[var(--text-primary)]">
                curl -sSL https://rift.astroyds.com/rift/install.sh | bash
              </code>
              <button className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors" aria-label="Copy install command">
                <Copy className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-3 rounded-lg border border-[var(--glass-border)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)] transition-all duration-200"
            >
              Read Documentation
            </Link>
            <Link
              href="/examples"
              className="px-6 py-3 rounded-lg border border-[var(--glass-border)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)] transition-all duration-200"
            >
              View Examples
            </Link>
            <Link
              href="/community"
              className="px-6 py-3 rounded-lg border border-[var(--glass-border)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)] transition-all duration-200"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
