import { Server, Database, Shield, FileCode, FileJson, Zap } from 'lucide-react';

const features = [
  {
    icon: Server,
    title: 'HTTP Module',
    description: 'Built-in web server with routing, middleware, and responses. No Express or Flask needed.',
    example: 'http.get("/", fn) → http.serve(8080)',
    color: 'var(--accent-blue)',
  },
  {
    icon: Database,
    title: 'Database Module',
    description: 'SQL, PostgreSQL, MongoDB support out of the box with query builders.',
    example: 'db.table("users").where("age", ">", 18).get()',
    color: 'var(--accent-green)',
  },
  {
    icon: Shield,
    title: 'Crypto Module',
    description: 'Hashing, encryption, JWT tokens, and password hashing included.',
    example: 'crypto.hash("data"), crypto.token(payload)',
    color: 'var(--accent-purple)',
  },
  {
    icon: FileCode,
    title: 'File System',
    description: 'Complete file and directory operations without any imports.',
    example: 'fs.read("file.txt"), fs.write("out.txt", data)',
    color: 'var(--accent-teal)',
  },
  {
    icon: FileJson,
    title: 'JSON Module',
    description: 'Native JSON parsing and serialization. No external libraries.',
    example: 'json.parse(str), json.stringify(obj)',
    color: 'var(--accent-orange)',
  },
  {
    icon: Zap,
    title: 'Async/Await',
    description: 'First-class async support with pipeline operators for elegant chaining.',
    example: 'wait fetchData() ~! process ~! save',
    color: 'var(--accent-red)',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Built-in Superpowers
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Everything you need is included. No npm install, no pip install, no cargo add. Just import and use.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 glass-hover transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon
                  className="w-6 h-6"
                  style={{ color: feature.color }}
                />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-lg">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {feature.description}
              </p>
              <code className="block p-3 rounded-lg bg-[var(--bg-tertiary)] text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                {feature.example}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
