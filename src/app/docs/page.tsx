import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import { 
  Book, 
  Code, 
  Layers, 
  Zap, 
  GitBranch, 
  Package, 
  Terminal,
  ArrowRight,
  Search
} from "lucide-react";

export const metadata = {
  title: "Documentation - RIFT Programming Language",
  description: "Complete documentation for the RIFT programming language. Learn syntax, modules, and best practices.",
};

const sections = [
  {
    title: "Getting Started",
    icon: Terminal,
    items: [
      { title: "Installation", href: "/installation" },
      { title: "Your First Program", href: "/docs/first-program" },
      { title: "REPL Usage", href: "/docs/repl" },
    ],
  },
  {
    title: "Language Basics",
    icon: Code,
    items: [
      { title: "Variables & Constants", href: "/docs/variables" },
      { title: "Data Types", href: "/docs/types" },
      { title: "Operators", href: "/docs/operators" },
      { title: "Comments", href: "/docs/comments" },
    ],
  },
  {
    title: "Control Flow",
    icon: GitBranch,
    items: [
      { title: "If-Else Statements", href: "/docs/if-else" },
      { title: "Loops (while, repeat)", href: "/docs/loops" },
      { title: "Pattern Matching", href: "/docs/pattern-matching" },
    ],
  },
  {
    title: "Functions",
    icon: Zap,
    items: [
      { title: "Function Declaration", href: "/docs/functions" },
      { title: "Lambda Expressions", href: "/docs/lambdas" },
      { title: "Closures", href: "/docs/closures" },
    ],
  },
  {
    title: "Classes & Objects",
    icon: Layers,
    items: [
      { title: "Class Declaration", href: "/docs/classes" },
      { title: "Inheritance", href: "/docs/inheritance" },
      { title: "Static Members", href: "/docs/static" },
      { title: "Getters & Setters", href: "/docs/getters-setters" },
    ],
  },
  {
    title: "Standard Library",
    icon: Package,
    items: [
      { title: "HTTP Module", href: "/docs/http" },
      { title: "Database Module", href: "/docs/database" },
      { title: "Crypto Module", href: "/docs/crypto" },
      { title: "File System Module", href: "/docs/filesystem" },
      { title: "JSON Module", href: "/docs/json" },
    ],
  },
];

const quickRef = {
  keywords: [
    { keyword: "let", description: "Declare immutable variable" },
    { keyword: "mut", description: "Declare mutable variable" },
    { keyword: "const", description: "Declare constant" },
    { keyword: "conduit", description: "Declare function" },
    { keyword: "make", description: "Declare class" },
    { keyword: "build", description: "Constructor method" },
    { keyword: "grab", description: "Import module" },
    { keyword: "share", description: "Export item" },
    { keyword: "if/else", description: "Conditional" },
    { keyword: "while", description: "While loop" },
    { keyword: "repeat", description: "For-each loop" },
    { keyword: "check/when", description: "Pattern matching" },
    { keyword: "give", description: "Return value" },
    { keyword: "fail", description: "Throw error" },
    { keyword: "async/wait", description: "Async operations" },
    { keyword: "yes/no", description: "Boolean literals" },
    { keyword: "none", description: "Null value" },
  ],
  syntax: [
    { syntax: "@ #", description: "Block delimiters (replaces { })" },
    { syntax: "~ !", description: "Array delimiters (replaces [ ])" },
    { syntax: "=!", description: "Lambda arrow" },
    { syntax: "-!", description: "Pipeline operator" },
    { syntax: "~!", description: "Async pipeline" },
    { syntax: "?.", description: "Safe navigation" },
    { syntax: "?~", description: "Safe indexing" },
    { syntax: "??", description: "Null coalescing" },
    { syntax: "::", description: "Static member access" },
    { syntax: "..", description: "Range operator" },
    { syntax: "...", description: "Spread operator" },
  ],
};

const exampleCode = `# Variables and types
let name: text = "Alice"
mut count: num = 0
const PI = 3.14159

# Arrays and maps
let items = ~1, 2, 3!
let user = @name: "Alice", age: 30#

# Functions
conduit greet(name: text): text @
    give \`Hello, $@name#!\`
#

# Classes
make Person @
    build(name, age) @
        me.name = name
        me.age = age
    #
    
    conduit introduce() @
        give \`I'm $@me.name#, $@me.age# years old\`
    #
#

# Pattern matching
let result = check value @
    1..10 =! "small"
    11..100 =! "medium"
    _ =! "large"
#

# HTTP server
grab http

http.get("/api/users", conduit(req) @
    give http.json(200, ~@id: 1, name: "Alice"#!)
#)

http.serve(8080)`;

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Documentation
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Everything you need to know about RIFT. From basics to advanced patterns.
          </p>
          
          {/* Search bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
              />
            </div>
          </div>
        </div>

        {/* Documentation grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Sidebar - sections */}
          <div className="lg:col-span-1 space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="glass rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-blue)]/20 flex items-center justify-center">
                    <section.icon className="w-4 h-4 text-[var(--accent-blue)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        href={item.href}
                        className="block px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Start */}
            <section className="glass rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Book className="w-6 h-6 text-[var(--accent-blue)]" />
                Quick Start
              </h2>
              <p className="text-[var(--text-secondary)] mb-6">
                Get a quick overview of RIFT syntax and features. This example shows variables, 
                functions, classes, pattern matching, and a simple HTTP server.
              </p>
              <CodeBlock code={exampleCode} language="rift" filename="overview.rift" />
            </section>

            {/* Quick Reference - Keywords */}
            <section className="glass rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                Keywords Reference
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {quickRef.keywords.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)]">
                    <code className="text-[var(--accent-purple)] font-mono font-bold">{item.keyword}</code>
                    <span className="text-sm text-[var(--text-secondary)]">{item.description}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Reference - Syntax */}
            <section className="glass rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                Special Syntax
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {quickRef.syntax.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)]">
                    <code className="text-[var(--accent-blue)] font-mono font-bold text-lg">{item.syntax}</code>
                    <span className="text-sm text-[var(--text-secondary)]">{item.description}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Type System */}
            <section className="glass rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                Type System
              </h2>
              <p className="text-[var(--text-secondary)] mb-4">
                RIFT supports optional type annotations for runtime type checking:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--glass-border)]">
                      <th className="text-left py-3 px-4 text-[var(--text-primary)]">Type</th>
                      <th className="text-left py-3 px-4 text-[var(--text-primary)]">Description</th>
                      <th className="text-left py-3 px-4 text-[var(--text-primary)]">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--glass-border)]">
                      <td className="py-3 px-4"><code className="text-[var(--accent-teal)]">num</code></td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">Numbers (int/float)</td>
                      <td className="py-3 px-4"><code className="text-[var(--text-muted)]">42, 3.14</code></td>
                    </tr>
                    <tr className="border-b border-[var(--glass-border)]">
                      <td className="py-3 px-4"><code className="text-[var(--accent-teal)]">text</code></td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">Strings</td>
                      <td className="py-3 px-4"><code className="text-[var(--text-muted)]">&quot;hello&quot;</code></td>
                    </tr>
                    <tr className="border-b border-[var(--glass-border)]">
                      <td className="py-3 px-4"><code className="text-[var(--accent-teal)]">bool</code></td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">Booleans</td>
                      <td className="py-3 px-4"><code className="text-[var(--text-muted)]">yes, no</code></td>
                    </tr>
                    <tr className="border-b border-[var(--glass-border)]">
                      <td className="py-3 px-4"><code className="text-[var(--accent-teal)]">list</code></td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">Arrays</td>
                      <td className="py-3 px-4"><code className="text-[var(--text-muted)]">~1, 2, 3!</code></td>
                    </tr>
                    <tr className="border-b border-[var(--glass-border)]">
                      <td className="py-3 px-4"><code className="text-[var(--accent-teal)]">map</code></td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">Objects/Dictionaries</td>
                      <td className="py-3 px-4"><code className="text-[var(--text-muted)]">@key: &quot;value&quot;#</code></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-[var(--accent-teal)]">none</code></td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">Null/undefined</td>
                      <td className="py-3 px-4"><code className="text-[var(--text-muted)]">none</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Build Something?
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            Check out our examples to see RIFT in action, or try the interactive playground.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/examples"
              className="px-6 py-3 rounded-lg bg-[var(--accent-blue)] text-white font-medium hover:bg-[var(--accent-blue)]/90 transition-colors flex items-center gap-2"
            >
              View Examples
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/playground"
              className="px-6 py-3 rounded-lg border border-[var(--glass-border)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)] transition-colors"
            >
              Try Playground
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
