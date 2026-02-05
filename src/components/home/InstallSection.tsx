'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

const installSteps = [
  { text: '$ curl -sSL https://rift.astroyds.com/rift/install.sh | bash', delay: 0 },
  { text: '✓ Python detected', delay: 500, success: true },
  { text: '✓ Dependencies installed', delay: 1000, success: true },
  { text: '✓ RIFT installed to ~/.rift', delay: 1500, success: true },
  { text: '✓ Commands available: rift, riftserver', delay: 2000, success: true },
  { text: '', delay: 2500 },
  { text: 'Welcome to RIFT! Run "rift --help" to get started.', delay: 2700, highlight: true },
];

export default function InstallSection() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText('curl -sSL https://rift.astroyds.com/rift/install.sh | bash');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Download and Go
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            One command. That&apos;s it. No package managers, no virtual environments, no config files.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Terminal window */}
          <div className="code-block overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[var(--accent-red)]" />
                  <div className="w-3 h-3 rounded-full bg-[var(--accent-orange)]" />
                  <div className="w-3 h-3 rounded-full bg-[var(--accent-green)]" />
                </div>
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm font-mono">terminal</span>
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[var(--accent-green)]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal content */}
            <div className="p-4 font-mono text-sm space-y-1">
              {installSteps.map((step, index) => (
                <div
                  key={index}
                  className={`${step.success ? 'text-[var(--accent-green)]' : step.highlight ? 'text-[var(--accent-blue)]' : 'text-[var(--text-primary)]'}`}
                >
                  {step.text}
                </div>
              ))}
            </div>
          </div>

          {/* Comparison stats */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[var(--accent-red)] mb-2">47</div>
              <div className="text-sm text-[var(--text-secondary)]">Steps for other languages</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">
                Install runtime, package manager, dependencies...
              </div>
            </div>
            <div className="glass rounded-xl p-6 text-center border-2 border-[var(--accent-green)]">
              <div className="text-4xl font-bold text-[var(--accent-green)] mb-2">1</div>
              <div className="text-sm text-[var(--text-secondary)]">Command for RIFT</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">
                Everything included. Just start coding.
              </div>
            </div>
          </div>

          {/* Platform support */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span>🐧</span>
              <span>Linux</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🍎</span>
              <span>macOS</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🐍</span>
              <span>Python 3.8+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
