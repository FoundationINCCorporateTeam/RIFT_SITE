'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

// Color values for syntax highlighting (Tokyo Night theme)
const colors = {
  purple: '#bb9af7',
  teal: '#7dcfff',
  green: '#9ece6a',
  orange: '#ff9e64',
  blue: '#7aa2f7',
  red: '#f7768e',
  muted: '#565f89',
};

export default function CodeBlock({
  code,
  language = 'rift',
  filename,
  showLineNumbers = true,
  highlightLines = [],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  // Simple syntax highlighting for RIFT
  const highlightSyntax = (line: string): React.ReactNode => {
    // Keywords
    const keywords = /\b(let|mut|const|conduit|make|build|extend|me|parent|static|get|set|if|else|while|repeat|check|when|stop|next|give|yield|grab|share|as|try|catch|finally|fail|async|wait|and|or|not|in|yes|no|none)\b/g;
    // Types
    const types = /\b(num|text|bool|list|map)\b/g;
    // Strings
    const strings = /(['"`])(?:(?!\1)[^\\]|\\.)*?\1/g;
    // Comments
    const comments = /(#[^@].*$|\/\*[\s\S]*?\*\/)/gm;
    // Numbers
    const numbers = /\b(\d+\.?\d*)\b/g;
    // Operators
    const operators = /(-!|~!|=!|\?\.|\?\~|\?\?|::|\.\.|\.\.\.)/g;
    // RIFT delimiters
    const delimiters = /(@|#|~|!)/g;

    let result = line;
    
    // Escape HTML first
    result = result.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Apply highlighting (order matters)
    result = result.replace(comments, `<span style="color:${colors.muted};font-style:italic">$1</span>`);
    result = result.replace(strings, `<span style="color:${colors.green}">$&</span>`);
    result = result.replace(keywords, `<span style="color:${colors.purple}">$1</span>`);
    result = result.replace(types, `<span style="color:${colors.teal}">$1</span>`);
    result = result.replace(numbers, `<span style="color:${colors.orange}">$1</span>`);
    result = result.replace(operators, `<span style="color:${colors.blue}">$1</span>`);
    result = result.replace(delimiters, `<span style="color:${colors.red}">$1</span>`);

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="code-block group relative">
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2">
            {/* Window controls */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[var(--accent-red)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--accent-orange)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--accent-green)]" />
            </div>
            {filename && (
              <span className="text-sm text-[var(--text-muted)] font-mono ml-2">
                {filename}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)] uppercase font-medium">
              {language}
            </span>
          </div>
        </div>
      )}

      {/* Code content */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code>
            {lines.map((line, index) => (
              <div
                key={index}
                className={`flex ${
                  highlightLines.includes(index + 1)
                    ? 'bg-[var(--accent-blue)]/10 -mx-4 px-4'
                    : ''
                }`}
              >
                {showLineNumbers && (
                  <span className="select-none text-[var(--text-muted)] w-8 flex-shrink-0 text-right pr-4">
                    {index + 1}
                  </span>
                )}
                <span className="flex-1 text-[var(--text-primary)]">
                  {highlightSyntax(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>

        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[var(--accent-green)]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
