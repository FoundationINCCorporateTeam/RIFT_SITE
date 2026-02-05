'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Play, RotateCcw, Download, Share2, Settings, Terminal, X } from 'lucide-react';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const examples = {
  hello: {
    name: 'Hello World',
    code: `# Hello World in RIFT
let name = "World"
print(\`Hello, $@name#!\`)`,
  },
  server: {
    name: 'Web Server',
    code: `# Simple HTTP Server
grab http

http.get("/", conduit(req) @
    give http.html(200, "~h1!Welcome to RIFT!~/h1!")
#)

http.get("/api/hello", conduit(req) @
    give http.json(200, @message: "Hello from RIFT!"#)
#)

print("Server running on http://localhost:8080")
http.serve(8080)`,
  },
  database: {
    name: 'Database Query',
    code: `# Database Operations
grab db

let conn = db.sql("sqlite:///app.db")

# Create table
conn.raw("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)")

# Insert data
conn.table("users").insert(@name: "Alice", age: 30#)
conn.table("users").insert(@name: "Bob", age: 25#)

# Query data
let users = conn.table("users")
    -> where("age", "!=", 18)
    -> order("name", "ASC")
    -> get()

print("Users over 18:")
repeat user in users @
    print(\`  - $@user.name# ($@user.age# years old)\`)
#

conn.close()`,
  },
  classes: {
    name: 'Classes & Objects',
    code: `# Object-Oriented Programming in RIFT
make Animal @
    build(name) @
        me.name = name
    #
    
    conduit speak() @
        give \`$@me.name# makes a sound\`
    #
#

make Dog extend Animal @
    build(name, breed) @
        me.name = name
        me.breed = breed
    #
    
    conduit speak() @
        give \`$@me.name# barks! Woof!\`
    #
    
    conduit wagTail() @
        give \`$@me.name# wags tail happily\`
    #
#

let dog = Dog("Buddy", "Golden Retriever")
print(dog.speak())
print(dog.wagTail())
print(\`Breed: $@dog.breed#\`)`,
  },
  patterns: {
    name: 'Pattern Matching',
    code: `# Pattern Matching in RIFT
conduit describeNumber(n) @
    give check n @
        0 =! "zero"
        1..10 =! "small"
        11..100 =! "medium"
        _ when n ~ 0 =! "negative"
        _ =! "large"
    #
#

print(describeNumber(0))
print(describeNumber(5))
print(describeNumber(50))
print(describeNumber(500))
print(describeNumber(-10))

# Type-based matching
conduit describe(value) @
    give check value @
        num  =! "It's a number"
        text =! "It's a string"
        bool =! "It's a boolean"
        list =! "It's an array"
        _    =! "Unknown type"
    #
#

print(describe(42))
print(describe("hello"))
print(describe(yes))`,
  },
  async: {
    name: 'Async Operations',
    code: `# Async Programming in RIFT
grab http

async conduit fetchUser(id) @
    let response = wait http.get(\`https://api.example.com/users/$@id#\`)
    give response.json()
#

async conduit processUsers(userIds) @
    let results = ~!
    
    repeat id in userIds @
        try @
            let user = wait fetchUser(id)
            results.push(user)
            print(\`Fetched user: $@user.name#\`)
        # catch error @
            print(\`Failed to fetch user $@id#: $@error#\`)
        #
    #
    
    give results
#

async conduit main() @
    let userIds = ~1, 2, 3!
    let users = wait processUsers(userIds)
    print(\`Total users fetched: $@users.length#\`)
#

wait main()`,
  },
};

type ExampleKey = keyof typeof examples;

export default function PlaygroundPage() {
  const [code, setCode] = useState(examples.hello.code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running...\n');
    
    // Simulate code execution
    setTimeout(() => {
      // Simple simulation of output based on code content
      let simulatedOutput = '';
      
      if (code.includes('print(')) {
        // Extract print statements and simulate output
        const printMatches = code.match(/print\([^)]+\)/g);
        if (printMatches) {
          printMatches.forEach((match) => {
            // Simple extraction - in real implementation, this would be the interpreter
            const content = match.replace(/print\(/, '').replace(/\)$/, '');
            if (content.startsWith('`') && content.endsWith('`')) {
              // Template string - just show placeholder
              simulatedOutput += '[Template output]\n';
            } else if (content.startsWith('"') || content.startsWith("'")) {
              simulatedOutput += content.slice(1, -1) + '\n';
            } else {
              simulatedOutput += `[${content}]\n`;
            }
          });
        }
      }
      
      if (code.includes('http.serve')) {
        simulatedOutput += '\n✓ Server started on http://localhost:8080\n';
        simulatedOutput += '  Press Ctrl+C to stop\n';
      }
      
      if (simulatedOutput === '') {
        simulatedOutput = '✓ Code executed successfully (no output)\n';
      }
      
      setOutput(simulatedOutput);
      setIsRunning(false);
    }, 1000);
  };

  const loadExample = (key: ExampleKey) => {
    setCode(examples[key].code);
    setOutput('');
  };

  const clearEditor = () => {
    setCode('');
    setOutput('');
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.rift';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Toolbar */}
      <div className="fixed top-16 left-0 right-0 z-40 glass border-b border-[var(--glass-border)]">
        <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-[var(--text-primary)]">RIFT Playground</h1>
            
            {/* Example selector */}
            <select
              onChange={(e) => loadExample(e.target.value as ExampleKey)}
              className="px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
            >
              <option value="">Load Example...</option>
              {Object.entries(examples).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-green)] text-white font-medium hover:bg-[var(--accent-green)]/90 transition-colors disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run'}
            </button>
            <button
              onClick={clearEditor}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              title="Clear"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={downloadCode}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="fixed top-32 right-4 z-50 glass rounded-xl p-4 w-64 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--text-primary)]">Settings</h3>
            <button onClick={() => setShowSettings(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">Font Size</label>
              <input
                type="range"
                min="12"
                max="20"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-[var(--text-muted)]">{fontSize}px</span>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="pt-16 h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
        {/* Editor */}
        <div className="flex-1 min-h-[50vh] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-[var(--glass-border)]">
          <div className="h-full bg-[var(--bg-tertiary)]">
            <MonacoEditor
              height="100%"
              language="javascript" // Use JavaScript as base, would need custom language for RIFT
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                wordWrap: 'on',
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
                fontLigatures: true,
              }}
            />
          </div>
        </div>

        {/* Output */}
        <div className="flex-1 min-h-[50vh] lg:min-h-0 flex flex-col bg-[var(--bg-primary)]">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]">
            <Terminal className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">Output</span>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <pre className="font-mono text-sm text-[var(--text-primary)] whitespace-pre-wrap">
              {output || 'Click "Run" to execute your code...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
