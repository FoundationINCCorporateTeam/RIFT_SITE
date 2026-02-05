import Link from "next/link";
import { 
  Search, 
  Server, 
  Database, 
  Shield, 
  FileCode, 
  FileJson, 
  Calculator,
  Type,
  List,
  Calendar,
  Regex,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "API Reference - RIFT Programming Language",
  description: "Complete API reference for RIFT standard library modules.",
};

const modules = [
  { id: 'http', name: 'HTTP', icon: Server, description: 'HTTP server and client' },
  { id: 'db', name: 'Database', icon: Database, description: 'SQL and NoSQL databases' },
  { id: 'crypto', name: 'Crypto', icon: Shield, description: 'Cryptography and hashing' },
  { id: 'fs', name: 'File System', icon: FileCode, description: 'File operations' },
  { id: 'json', name: 'JSON', icon: FileJson, description: 'JSON parsing' },
  { id: 'math', name: 'Math', icon: Calculator, description: 'Mathematical functions' },
  { id: 'string', name: 'String', icon: Type, description: 'String manipulation' },
  { id: 'array', name: 'Array', icon: List, description: 'Array utilities' },
  { id: 'date', name: 'Date', icon: Calendar, description: 'Date and time' },
  { id: 'regex', name: 'Regex', icon: Regex, description: 'Regular expressions' },
];

const httpApi = [
  {
    name: 'http.get(path, handler)',
    description: 'Register a GET route handler',
    params: [
      { name: 'path', type: 'text', description: 'URL path pattern (supports :param for params)' },
      { name: 'handler', type: 'conduit', description: 'Function that receives request and returns response' },
    ],
    example: `http.get("/api/users/:id", conduit(req) @
    give http.json(200, @id: req.params.id#)
#)`,
  },
  {
    name: 'http.post(path, handler)',
    description: 'Register a POST route handler',
    params: [
      { name: 'path', type: 'text', description: 'URL path pattern' },
      { name: 'handler', type: 'conduit', description: 'Function that receives request and returns response' },
    ],
    example: `http.post("/api/users", conduit(req) @
    let data = req.body
    give http.json(201, @created: yes#)
#)`,
  },
  {
    name: 'http.json(status, data)',
    description: 'Create a JSON response',
    params: [
      { name: 'status', type: 'num', description: 'HTTP status code' },
      { name: 'data', type: 'map', description: 'Data to serialize as JSON' },
    ],
    example: `give http.json(200, @message: "Success"#)`,
  },
  {
    name: 'http.html(status, content)',
    description: 'Create an HTML response',
    params: [
      { name: 'status', type: 'num', description: 'HTTP status code' },
      { name: 'content', type: 'text', description: 'HTML content' },
    ],
    example: `give http.html(200, "~h1!Hello!~/h1!")`,
  },
  {
    name: 'http.serve(port)',
    description: 'Start the HTTP server',
    params: [
      { name: 'port', type: 'num', description: 'Port number to listen on' },
    ],
    example: `http.serve(8080)`,
  },
];

const dbApi = [
  {
    name: 'db.sql(connectionString)',
    description: 'Connect to a SQL database',
    params: [
      { name: 'connectionString', type: 'text', description: 'Database connection string' },
    ],
    example: `let conn = db.sql("sqlite:///app.db")`,
  },
  {
    name: 'conn.table(name)',
    description: 'Start a query on a table',
    params: [
      { name: 'name', type: 'text', description: 'Table name' },
    ],
    example: `let users = conn.table("users").get()`,
  },
  {
    name: '-> where(column, operator, value)',
    description: 'Add a WHERE clause',
    params: [
      { name: 'column', type: 'text', description: 'Column name' },
      { name: 'operator', type: 'text', description: 'Comparison operator (=, !=, >, <, etc.)' },
      { name: 'value', type: 'any', description: 'Value to compare' },
    ],
    example: `conn.table("users") -> where("age", "!", 18) -> get()`,
  },
  {
    name: '-> order(column, direction)',
    description: 'Add ORDER BY clause',
    params: [
      { name: 'column', type: 'text', description: 'Column name' },
      { name: 'direction', type: 'text', description: 'ASC or DESC' },
    ],
    example: `conn.table("users") -> order("name", "ASC") -> get()`,
  },
  {
    name: '-> get()',
    description: 'Execute query and return all results',
    params: [],
    example: `let users = conn.table("users").get()`,
  },
  {
    name: '-> first()',
    description: 'Execute query and return first result',
    params: [],
    example: `let user = conn.table("users") -> where("id", 1) -> first()`,
  },
  {
    name: '.insert(data)',
    description: 'Insert a new record',
    params: [
      { name: 'data', type: 'map', description: 'Record data' },
    ],
    example: `conn.table("users").insert(@name: "Alice", age: 30#)`,
  },
];

const cryptoApi = [
  {
    name: 'crypto.hash(data)',
    description: 'Create SHA-256 hash of data',
    params: [
      { name: 'data', type: 'text', description: 'Data to hash' },
    ],
    example: `let hash = crypto.hash("secret data")`,
  },
  {
    name: 'crypto.hashpass(password)',
    description: 'Hash a password using bcrypt',
    params: [
      { name: 'password', type: 'text', description: 'Password to hash' },
    ],
    example: `let hashed = crypto.hashpass("password123")`,
  },
  {
    name: 'crypto.checkpass(password, hash)',
    description: 'Verify a password against hash',
    params: [
      { name: 'password', type: 'text', description: 'Password to verify' },
      { name: 'hash', type: 'text', description: 'Hash to compare against' },
    ],
    example: `let valid = crypto.checkpass("password123", hashed)`,
  },
  {
    name: 'crypto.token(payload, secret)',
    description: 'Create a JWT token',
    params: [
      { name: 'payload', type: 'map', description: 'Token payload data' },
      { name: 'secret', type: 'text', description: 'Secret key' },
    ],
    example: `let token = crypto.token(@userId: 123#, "secret")`,
  },
  {
    name: 'crypto.verify(token, secret)',
    description: 'Verify and decode a JWT token',
    params: [
      { name: 'token', type: 'text', description: 'Token to verify' },
      { name: 'secret', type: 'text', description: 'Secret key' },
    ],
    example: `let payload = crypto.verify(token, "secret")`,
  },
  {
    name: 'crypto.uuid()',
    description: 'Generate a random UUID',
    params: [],
    example: `let id = crypto.uuid()`,
  },
];

const fsApi = [
  {
    name: 'fs.read(path)',
    description: 'Read file contents',
    params: [
      { name: 'path', type: 'text', description: 'File path' },
    ],
    example: `let content = fs.read("data.txt")`,
  },
  {
    name: 'fs.write(path, content)',
    description: 'Write content to file',
    params: [
      { name: 'path', type: 'text', description: 'File path' },
      { name: 'content', type: 'text', description: 'Content to write' },
    ],
    example: `fs.write("output.txt", "Hello, World!")`,
  },
  {
    name: 'fs.exists(path)',
    description: 'Check if file/directory exists',
    params: [
      { name: 'path', type: 'text', description: 'Path to check' },
    ],
    example: `if fs.exists("config.json") @ ... #`,
  },
  {
    name: 'fs.mkdir(path)',
    description: 'Create a directory',
    params: [
      { name: 'path', type: 'text', description: 'Directory path' },
    ],
    example: `fs.mkdir("uploads")`,
  },
  {
    name: 'fs.list(path)',
    description: 'List directory contents',
    params: [
      { name: 'path', type: 'text', description: 'Directory path' },
    ],
    example: `let files = fs.list(".")`,
  },
];

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            API Reference
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Complete reference for RIFT standard library modules.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search API..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
              />
            </div>
          </div>
        </div>

        {/* Module navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {modules.map((module) => (
            <a
              key={module.id}
              href={`#${module.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <module.icon className="w-4 h-4" />
              {module.name}
            </a>
          ))}
        </div>

        {/* HTTP Module */}
        <section id="http" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-blue)]/20 flex items-center justify-center">
              <Server className="w-5 h-5 text-[var(--accent-blue)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">HTTP Module</h2>
              <p className="text-[var(--text-muted)]">grab http</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {httpApi.map((item, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[var(--glass-border)]">
                  <h3 className="font-mono text-lg text-[var(--accent-blue)] mb-2">{item.name}</h3>
                  <p className="text-[var(--text-secondary)]">{item.description}</p>
                  
                  {item.params.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Parameters</h4>
                      <div className="space-y-2">
                        {item.params.map((param, pIndex) => (
                          <div key={pIndex} className="flex items-start gap-3 text-sm">
                            <code className="text-[var(--accent-purple)]">{param.name}</code>
                            <span className="text-[var(--accent-teal)]">({param.type})</span>
                            <span className="text-[var(--text-muted)]">{param.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-[var(--bg-tertiary)]">
                  <pre className="text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                    <code>{item.example}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Database Module */}
        <section id="db" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-green)]/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-[var(--accent-green)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Database Module</h2>
              <p className="text-[var(--text-muted)]">grab db</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {dbApi.map((item, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[var(--glass-border)]">
                  <h3 className="font-mono text-lg text-[var(--accent-green)] mb-2">{item.name}</h3>
                  <p className="text-[var(--text-secondary)]">{item.description}</p>
                  
                  {item.params.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Parameters</h4>
                      <div className="space-y-2">
                        {item.params.map((param, pIndex) => (
                          <div key={pIndex} className="flex items-start gap-3 text-sm">
                            <code className="text-[var(--accent-purple)]">{param.name}</code>
                            <span className="text-[var(--accent-teal)]">({param.type})</span>
                            <span className="text-[var(--text-muted)]">{param.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-[var(--bg-tertiary)]">
                  <pre className="text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                    <code>{item.example}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Crypto Module */}
        <section id="crypto" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-purple)]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[var(--accent-purple)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Crypto Module</h2>
              <p className="text-[var(--text-muted)]">grab crypto</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {cryptoApi.map((item, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[var(--glass-border)]">
                  <h3 className="font-mono text-lg text-[var(--accent-purple)] mb-2">{item.name}</h3>
                  <p className="text-[var(--text-secondary)]">{item.description}</p>
                  
                  {item.params.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Parameters</h4>
                      <div className="space-y-2">
                        {item.params.map((param, pIndex) => (
                          <div key={pIndex} className="flex items-start gap-3 text-sm">
                            <code className="text-[var(--accent-purple)]">{param.name}</code>
                            <span className="text-[var(--accent-teal)]">({param.type})</span>
                            <span className="text-[var(--text-muted)]">{param.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-[var(--bg-tertiary)]">
                  <pre className="text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                    <code>{item.example}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* File System Module */}
        <section id="fs" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-teal)]/20 flex items-center justify-center">
              <FileCode className="w-5 h-5 text-[var(--accent-teal)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">File System Module</h2>
              <p className="text-[var(--text-muted)]">grab fs</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {fsApi.map((item, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[var(--glass-border)]">
                  <h3 className="font-mono text-lg text-[var(--accent-teal)] mb-2">{item.name}</h3>
                  <p className="text-[var(--text-secondary)]">{item.description}</p>
                  
                  {item.params.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Parameters</h4>
                      <div className="space-y-2">
                        {item.params.map((param, pIndex) => (
                          <div key={pIndex} className="flex items-start gap-3 text-sm">
                            <code className="text-[var(--accent-purple)]">{param.name}</code>
                            <span className="text-[var(--accent-teal)]">({param.type})</span>
                            <span className="text-[var(--text-muted)]">{param.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-[var(--bg-tertiary)]">
                  <pre className="text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                    <code>{item.example}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Need More Details?
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            Check out the full documentation for comprehensive guides and examples.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-3 rounded-lg bg-[var(--accent-blue)] text-white font-medium hover:bg-[var(--accent-blue)]/90 transition-colors flex items-center gap-2"
            >
              View Documentation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/examples"
              className="px-6 py-3 rounded-lg border border-[var(--glass-border)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)] transition-colors"
            >
              See Examples
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
