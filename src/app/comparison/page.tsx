'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { Check, X, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const languages = ['python', 'javascript', 'php', 'go', 'rust', 'ruby'] as const;
type Language = typeof languages[number];

const languageInfo = {
  python: { name: 'Python', emoji: '🐍', color: '#3776ab' },
  javascript: { name: 'JavaScript', emoji: '📦', color: '#f7df1e' },
  php: { name: 'PHP', emoji: '🐘', color: '#777bb4' },
  go: { name: 'Go', emoji: '🦫', color: '#00add8' },
  rust: { name: 'Rust', emoji: '🦀', color: '#ce422b' },
  ruby: { name: 'Ruby', emoji: '💎', color: '#cc342d' },
};

const comparisons = {
  http_server: {
    title: 'HTTP Server',
    rift: `grab http

http.get("/", conduit(req) @
    give http.html(200, "~h1!Hello!~/h1!")
#)

http.serve(8080)`,
    python: `from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return '<h1>Hello!</h1>'

if __name__ == '__main__':
    app.run(port=8080)`,
    javascript: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>');
});

app.listen(8080);`,
    php: `<?php
require 'vendor/autoload.php';

$app = new Slim\\App();

$app->get('/', function ($req, $res) {
    return $res->write('<h1>Hello!</h1>');
});

$app->run();`,
    go: `package main

import (
    "net/http"
    "fmt"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "<h1>Hello!</h1>")
    })
    http.ListenAndServe(":8080", nil)
}`,
    rust: `use actix_web::{web, App, HttpServer, Responder};

async fn hello() -> impl Responder {
    "<h1>Hello!</h1>"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().route("/", web::get().to(hello))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}`,
    ruby: `require 'sinatra'

set :port, 8080

get '/' do
  '<h1>Hello!</h1>'
end`,
  },
  database: {
    title: 'Database Query',
    rift: `grab db

let conn = db.sql("sqlite:///app.db")
let users = conn.table("users")
    -> where("age", "!", 18)
    -> get()

conn.close()`,
    python: `import sqlite3

conn = sqlite3.connect('app.db')
cursor = conn.cursor()
cursor.execute('SELECT * FROM users WHERE age > 18')
users = cursor.fetchall()
conn.close()`,
    javascript: `const sqlite3 = require('sqlite3');
const { promisify } = require('util');

const db = new sqlite3.Database('./app.db');
const dbAll = promisify(db.all.bind(db));

const users = await dbAll('SELECT * FROM users WHERE age > 18');
db.close();`,
    php: `<?php
$pdo = new PDO('sqlite:app.db');
$stmt = $pdo->prepare('SELECT * FROM users WHERE age > ?');
$stmt->execute([18]);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);`,
    go: `package main

import (
    "database/sql"
    _ "github.com/mattn/go-sqlite3"
)

func main() {
    db, err := sql.Open("sqlite3", "./app.db")
    if err != nil { panic(err) }
    defer db.Close()
    
    rows, _ := db.Query("SELECT * FROM users WHERE age > ?", 18)
    // ... process rows
}`,
    rust: `use rusqlite::Connection;

fn main() -> rusqlite::Result<()> {
    let conn = Connection::open("app.db")?;
    
    let mut stmt = conn.prepare("SELECT * FROM users WHERE age > ?1")?;
    let users = stmt.query_map([18], |row| {
        // ... map row to struct
    })?;
    
    Ok(())
}`,
    ruby: `require 'sqlite3'

db = SQLite3::Database.new 'app.db'
users = db.execute('SELECT * FROM users WHERE age > ?', 18)
db.close`,
  },
  jwt_auth: {
    title: 'JWT Authentication',
    rift: `grab crypto

let token = crypto.token(@userId: 123#, "secret")
let payload = crypto.verify(token, "secret")
let hashed = crypto.hashpass("password")
let valid = crypto.checkpass("password", hashed)`,
    python: `import jwt
import bcrypt

token = jwt.encode({'userId': 123}, 'secret', algorithm='HS256')
payload = jwt.decode(token, 'secret', algorithms=['HS256'])
hashed = bcrypt.hashpw(b'password', bcrypt.gensalt())
valid = bcrypt.checkpw(b'password', hashed)`,
    javascript: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const token = jwt.sign({ userId: 123 }, 'secret');
const payload = jwt.verify(token, 'secret');
const hashed = await bcrypt.hash('password', 10);
const valid = await bcrypt.compare('password', hashed);`,
    php: `<?php
use Firebase\\JWT\\JWT;

$token = JWT::encode(['userId' => 123], 'secret', 'HS256');
$payload = JWT::decode($token, new Key('secret', 'HS256'));
$hashed = password_hash('password', PASSWORD_BCRYPT);
$valid = password_verify('password', $hashed);`,
    go: `package main

import (
    "github.com/golang-jwt/jwt/v5"
    "golang.org/x/crypto/bcrypt"
)

func main() {
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "userId": 123,
    })
    tokenString, _ := token.SignedString([]byte("secret"))
    
    hashed, _ := bcrypt.GenerateFromPassword([]byte("password"), 10)
    err := bcrypt.CompareHashAndPassword(hashed, []byte("password"))
}`,
    rust: `use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use bcrypt::{hash, verify};

let token = encode(&Header::default(), 
    &Claims { user_id: 123 }, 
    &EncodingKey::from_secret(b"secret"))?;
    
let payload = decode::<Claims>(&token, 
    &DecodingKey::from_secret(b"secret"),
    &Validation::default())?;
    
let hashed = hash("password", 10)?;
let valid = verify("password", &hashed)?;`,
    ruby: `require 'jwt'
require 'bcrypt'

token = JWT.encode({ userId: 123 }, 'secret', 'HS256')
payload = JWT.decode(token, 'secret', true, algorithm: 'HS256')
hashed = BCrypt::Password.create('password')
valid = BCrypt::Password.new(hashed) == 'password'`,
  },
};

type ComparisonKey = keyof typeof comparisons;

const featureMatrix = [
  { feature: 'Built-in HTTP Server', rift: true, python: false, javascript: false, php: false, go: true, rust: false, ruby: false },
  { feature: 'Built-in Database', rift: true, python: false, javascript: false, php: false, go: false, rust: false, ruby: false },
  { feature: 'Built-in Crypto/JWT', rift: true, python: false, javascript: false, php: false, go: false, rust: false, ruby: false },
  { feature: 'Built-in File System', rift: true, python: true, javascript: true, php: true, go: true, rust: true, ruby: true },
  { feature: 'No Package Manager Needed', rift: true, python: false, javascript: false, php: false, go: false, rust: false, ruby: false },
  { feature: 'One-Command Install', rift: true, python: false, javascript: false, php: false, go: true, rust: true, ruby: false },
  { feature: 'No Virtual Env Needed', rift: true, python: false, javascript: true, php: true, go: true, rust: true, ruby: false },
  { feature: 'Pattern Matching', rift: true, python: true, javascript: false, php: true, go: false, rust: true, ruby: true },
  { feature: 'Pipeline Operators', rift: true, python: false, javascript: false, php: false, go: false, rust: false, ruby: false },
  { feature: 'Async/Await', rift: true, python: true, javascript: true, php: false, go: true, rust: true, ruby: false },
];

const setupComparison = {
  rift: {
    steps: ['curl install.sh | bash', 'rift script.rift'],
    total: 2,
  },
  python: {
    steps: ['Install Python', 'Create virtual env', 'Activate venv', 'Create requirements.txt', 'pip install', 'python script.py'],
    total: 6,
  },
  javascript: {
    steps: ['Install Node.js', 'npm init', 'npm install deps', 'Create package.json scripts', 'node script.js'],
    total: 5,
  },
  php: {
    steps: ['Install PHP', 'Install Composer', 'composer init', 'Install web server', 'Configure server', 'php script.php'],
    total: 6,
  },
  go: {
    steps: ['Install Go', 'go mod init', 'go get deps', 'go run script.go'],
    total: 4,
  },
  rust: {
    steps: ['Install rustup', 'cargo new project', 'Add deps to Cargo.toml', 'cargo build', 'cargo run'],
    total: 5,
  },
  ruby: {
    steps: ['Install Ruby', 'Install Bundler', 'bundle init', 'bundle install', 'ruby script.rb'],
    total: 5,
  },
};

export default function ComparisonPage() {
  const [selectedLang, setSelectedLang] = useState<Language>('python');
  const [activeComparison, setActiveComparison] = useState<ComparisonKey>('http_server');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            See How RIFT Compares
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Compare RIFT to other popular backend languages. Less boilerplate, more building.
          </p>
        </div>

        {/* Language selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedLang === lang
                  ? 'bg-[var(--accent-blue)] text-white'
                  : 'glass glass-hover text-[var(--text-secondary)]'
              }`}
            >
              <span className="text-lg">{languageInfo[lang].emoji}</span>
              {languageInfo[lang].name}
            </button>
          ))}
        </div>

        {/* Code Comparisons */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Side-by-Side Code Comparison
          </h2>

          {/* Comparison tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(comparisons).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveComparison(key as ComparisonKey)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeComparison === key
                    ? 'bg-[var(--accent-purple)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {value.title}
              </button>
            ))}
          </div>

          {/* Code blocks */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[var(--accent-green)]">RIFT</h3>
                <span className="text-sm text-[var(--text-muted)]">
                  {comparisons[activeComparison].rift.split('\n').length} lines
                </span>
              </div>
              <CodeBlock code={comparisons[activeComparison].rift} language="rift" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {languageInfo[selectedLang].emoji} {languageInfo[selectedLang].name}
                </h3>
                <span className="text-sm text-[var(--text-muted)]">
                  {comparisons[activeComparison][selectedLang].split('\n').length} lines
                </span>
              </div>
              <CodeBlock code={comparisons[activeComparison][selectedLang]} language={selectedLang} />
            </div>
          </div>
        </section>

        {/* Feature Matrix */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Feature Comparison
          </h2>
          
          <div className="glass rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-[var(--bg-secondary)]">
                <tr>
                  <th className="text-left px-6 py-4 text-[var(--text-primary)] font-semibold">Feature</th>
                  <th className="text-center px-4 py-4 text-[var(--accent-green)] font-semibold">RIFT</th>
                  {languages.map((lang) => (
                    <th key={lang} className="text-center px-4 py-4 text-[var(--text-primary)] font-semibold">
                      <span className="text-lg mr-1">{languageInfo[lang].emoji}</span>
                      <span className="hidden sm:inline">{languageInfo[lang].name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureMatrix.map((row, index) => (
                  <tr key={index} className="border-t border-[var(--glass-border)]">
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{row.feature}</td>
                    <td className="text-center px-4 py-4">
                      {row.rift ? (
                        <Check className="w-5 h-5 text-[var(--accent-green)] mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-[var(--accent-red)] mx-auto" />
                      )}
                    </td>
                    {languages.map((lang) => (
                      <td key={lang} className="text-center px-4 py-4">
                        {row[lang] ? (
                          <Check className="w-5 h-5 text-[var(--accent-green)] mx-auto" />
                        ) : (
                          <span title="Requires package">
                            <Settings className="w-5 h-5 text-[var(--text-muted)] mx-auto" />
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[var(--accent-green)]" />
              <span>Built-in</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-[var(--text-muted)]" />
              <span>Requires package</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-[var(--accent-red)]" />
              <span>Not available</span>
            </div>
          </div>
        </section>

        {/* Setup Comparison */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Setup Steps Comparison
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-6 border-2 border-[var(--accent-green)]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚡</span>
                <h3 className="font-semibold text-[var(--text-primary)]">RIFT</h3>
              </div>
              <div className="text-4xl font-bold text-[var(--accent-green)] mb-2">
                {setupComparison.rift.total}
              </div>
              <div className="text-sm text-[var(--text-muted)]">steps to start</div>
              <ul className="mt-4 space-y-1">
                {setupComparison.rift.steps.map((step, i) => (
                  <li key={i} className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[10px] text-[var(--accent-green)]">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            
            {(['python', 'javascript', 'go'] as const).map((lang) => (
              <div key={lang} className="glass rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{languageInfo[lang].emoji}</span>
                  <h3 className="font-semibold text-[var(--text-primary)]">{languageInfo[lang].name}</h3>
                </div>
                <div className="text-4xl font-bold text-[var(--text-primary)] mb-2">
                  {setupComparison[lang].total}
                </div>
                <div className="text-sm text-[var(--text-muted)]">steps to start</div>
                <ul className="mt-4 space-y-1">
                  {setupComparison[lang].steps.map((step, i) => (
                    <li key={i} className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[10px] text-[var(--text-muted)]">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Try RIFT?
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            Get started with RIFT in seconds. No setup, no configuration, just code.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/installation"
              className="px-6 py-3 rounded-lg bg-[var(--accent-blue)] text-white font-medium hover:bg-[var(--accent-blue)]/90 transition-colors flex items-center gap-2"
            >
              Install RIFT
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
