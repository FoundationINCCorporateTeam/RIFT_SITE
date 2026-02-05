import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { ArrowRight, Terminal, Check, AlertCircle, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Installation - RIFT Programming Language",
  description: "Get RIFT running in 30 seconds. One command installation for Linux and macOS.",
};

const installCommand = `curl -sSL https://rift.astroyds.com/rift/install.sh | bash`;
const wgetCommand = `wget -qO- https://rift.astroyds.com/rift/install.sh | bash`;

const helloWorld = `# hello.rift
let name = "World"
print(\`Hello, $@name#!\`)`;

const webServer = `# server.rift
grab http

http.get("/", conduit(req) @
    give http.html(200, "~h1!Welcome to RIFT!~/h1!")
#)

http.get("/api/hello", conduit(req) @
    give http.json(200, @message: "Hello from RIFT!"#)
#)

print("Server running on http://localhost:8080")
http.serve(8080)`;

const cliCommands = [
  { command: "rift --version", description: "Show RIFT version" },
  { command: "rift --help", description: "Show help message" },
  { command: "rift script.rift", description: "Run a RIFT script" },
  { command: "rift repl", description: "Start interactive REPL" },
  { command: "rift doctor", description: "Check installation health" },
  { command: "rift update", description: "Update to latest version" },
  { command: "rift uninstall", description: "Uninstall RIFT" },
  { command: "riftserver app.rift", description: "Start RIFT web server" },
];

const troubleshooting = [
  {
    question: "Python not found",
    answer: "RIFT requires Python 3.8 or later. Install Python from python.org or use your package manager (apt, brew, etc.).",
  },
  {
    question: "Permission denied",
    answer: "The installer installs to ~/.rift and ~/.local/bin. Make sure you have write permissions to these directories.",
  },
  {
    question: "Command not found after install",
    answer: "Restart your terminal or run 'source ~/.bashrc' (or ~/.zshrc for zsh) to refresh your PATH.",
  },
  {
    question: "Download failed",
    answer: "Check your internet connection. If you're behind a proxy, configure curl/wget accordingly.",
  },
];

export default function InstallationPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Get RIFT Running in 30 Seconds
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            One command. No dependencies to manage. No configuration required.
          </p>
        </div>

        {/* Main install command */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[var(--accent-blue)]" />
            Installation
          </h2>
          
          <div className="glass rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Using curl (recommended)</h3>
            <CodeBlock code={installCommand} language="bash" showLineNumbers={false} />
          </div>
          
          <div className="glass rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Using wget</h3>
            <CodeBlock code={wgetCommand} language="bash" showLineNumbers={false} />
          </div>

          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--glass-border)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">What the installer does:</h3>
            <ul className="space-y-2">
              {[
                "Detects your Python 3 installation",
                "Downloads RIFT from GitHub",
                "Installs to ~/.rift (configurable)",
                "Creates rift and riftserver commands",
                "Configures your shell PATH",
                "Installs Python dependencies",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <Check className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* System Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            System Requirements
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🐍</div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">Python 3.8+</h3>
              <p className="text-sm text-[var(--text-muted)]">Required runtime</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🐧</div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">Linux</h3>
              <p className="text-sm text-[var(--text-muted)]">All major distros</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🍎</div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">macOS</h3>
              <p className="text-sm text-[var(--text-muted)]">10.15+ (Catalina)</p>
            </div>
          </div>
        </section>

        {/* Verify Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Verify Installation
          </h2>
          
          <div className="space-y-4">
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Check version</h3>
              <CodeBlock code="rift --version" language="bash" showLineNumbers={false} />
              <p className="text-sm text-[var(--text-muted)] mt-3">
                Expected output: <code className="text-[var(--accent-blue)]">RIFT 0.1.0</code>
              </p>
            </div>
            
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Run diagnostics</h3>
              <CodeBlock code="rift doctor" language="bash" showLineNumbers={false} />
              <p className="text-sm text-[var(--text-muted)] mt-3">
                This checks your installation and reports any issues.
              </p>
            </div>
          </div>
        </section>

        {/* Your First Program */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Your First RIFT Program
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                1. Create a file called <code className="text-[var(--accent-blue)]">hello.rift</code>
              </h3>
              <CodeBlock code={helloWorld} language="rift" filename="hello.rift" />
            </div>
            
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                2. Run it
              </h3>
              <CodeBlock code="rift hello.rift" language="bash" showLineNumbers={false} />
              <p className="text-sm text-[var(--text-muted)] mt-3">
                Output: <code className="text-[var(--accent-green)]">Hello, World!</code>
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                3. Try a web server
              </h3>
              <CodeBlock code={webServer} language="rift" filename="server.rift" />
              <p className="text-sm text-[var(--text-muted)] mt-3">
                Run with <code className="text-[var(--accent-blue)]">rift server.rift</code> and open http://localhost:8080
              </p>
            </div>
          </div>
        </section>

        {/* CLI Reference */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            CLI Commands
          </h2>
          
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--bg-secondary)]">
                <tr>
                  <th className="text-left px-6 py-4 text-[var(--text-primary)] font-semibold">Command</th>
                  <th className="text-left px-6 py-4 text-[var(--text-primary)] font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {cliCommands.map((cmd, index) => (
                  <tr key={index} className="border-t border-[var(--glass-border)]">
                    <td className="px-6 py-4">
                      <code className="text-[var(--accent-blue)] font-mono text-sm">{cmd.command}</code>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{cmd.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Installation Options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Advanced Options
          </h2>
          
          <div className="glass rounded-xl p-6 space-y-4">
            <div>
              <h4 className="font-medium text-[var(--text-primary)] mb-2">Custom install directory</h4>
              <CodeBlock 
                code="RIFT_INSTALL_DIR=/custom/path curl -sSL https://rift.astroyds.com/rift/install.sh | bash" 
                language="bash" 
                showLineNumbers={false} 
              />
            </div>
            <div>
              <h4 className="font-medium text-[var(--text-primary)] mb-2">Skip dependencies</h4>
              <CodeBlock 
                code="curl -sSL https://rift.astroyds.com/rift/install.sh | bash -s -- --no-deps" 
                language="bash" 
                showLineNumbers={false} 
              />
            </div>
            <div>
              <h4 className="font-medium text-[var(--text-primary)] mb-2">Force reinstall</h4>
              <CodeBlock 
                code="curl -sSL https://rift.astroyds.com/rift/install.sh | bash -s -- --force" 
                language="bash" 
                showLineNumbers={false} 
              />
            </div>
          </div>
        </section>

        {/* Updating & Uninstalling */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Updating & Uninstalling
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Update RIFT</h3>
              <CodeBlock code="rift update" language="bash" showLineNumbers={false} />
              <p className="text-sm text-[var(--text-muted)] mt-3">
                Downloads and installs the latest version.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Uninstall RIFT</h3>
              <CodeBlock code="rift uninstall" language="bash" showLineNumbers={false} />
              <p className="text-sm text-[var(--text-muted)] mt-3">
                Removes RIFT and cleans up configuration.
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[var(--accent-orange)]" />
            Troubleshooting
          </h2>
          
          <div className="space-y-4">
            {troubleshooting.map((item, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[var(--accent-orange)]" />
                  {item.question}
                </h3>
                <p className="text-[var(--text-secondary)]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Next Steps
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/docs"
              className="glass rounded-xl p-6 glass-hover transition-all duration-300 flex items-center justify-between group"
            >
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Read the Documentation</h3>
                <p className="text-sm text-[var(--text-secondary)]">Learn RIFT syntax and features</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-blue)] transition-colors" />
            </Link>
            <Link
              href="/examples"
              className="glass rounded-xl p-6 glass-hover transition-all duration-300 flex items-center justify-between group"
            >
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">View Examples</h3>
                <p className="text-sm text-[var(--text-secondary)]">Learn by building real projects</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-blue)] transition-colors" />
            </Link>
            <Link
              href="/playground"
              className="glass rounded-xl p-6 glass-hover transition-all duration-300 flex items-center justify-between group"
            >
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Try the Playground</h3>
                <p className="text-sm text-[var(--text-secondary)]">Experiment with RIFT in your browser</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-blue)] transition-colors" />
            </Link>
            <Link
              href="/community"
              className="glass rounded-xl p-6 glass-hover transition-all duration-300 flex items-center justify-between group"
            >
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Join the Community</h3>
                <p className="text-sm text-[var(--text-secondary)]">Get help and share your projects</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-blue)] transition-colors" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
