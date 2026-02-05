'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';

const comparisons = {
  python: {
    name: 'Python',
    rift: `grab http
grab db

let conn = db.sql("sqlite:///app.db")

http.get("/api/users", conduit(req) @
    let users = conn.table("users").get()
    give http.json(200, users)
#)

http.serve(8080)`,
    other: `from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

def get_db():
    conn = sqlite3.connect('app.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/users')
def get_users():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users')
    users = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(users)

if __name__ == '__main__':
    app.run(port=8080)`,
    riftLines: 10,
    otherLines: 19,
    deps: 'Flask, sqlite3',
    setup: 'pip install flask, virtual env',
  },
  javascript: {
    name: 'JavaScript',
    rift: `grab http
grab db

let conn = db.sql("sqlite:///app.db")

http.get("/api/users", conduit(req) @
    let users = conn.table("users").get()
    give http.json(200, users)
#)

http.serve(8080)`,
    other: `const express = require('express');
const sqlite3 = require('sqlite3');
const { promisify } = require('util');

const app = express();
const db = new sqlite3.Database('./app.db');
const dbAll = promisify(db.all.bind(db));

app.get('/api/users', async (req, res) => {
  try {
    const users = await dbAll('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});`,
    riftLines: 10,
    otherLines: 18,
    deps: 'express, sqlite3',
    setup: 'npm init, npm install',
  },
  php: {
    name: 'PHP',
    rift: `grab http
grab db

let conn = db.sql("sqlite:///app.db")

http.get("/api/users", conduit(req) @
    let users = conn.table("users").get()
    give http.json(200, users)
#)

http.serve(8080)`,
    other: `<?php
require 'vendor/autoload.php';

use Slim\\Factory\\AppFactory;

$app = AppFactory::create();

$app->get('/api/users', function ($request, $response) {
    $db = new PDO('sqlite:app.db');
    $stmt = $db->query('SELECT * FROM users');
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $response->getBody()->write(json_encode($users));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
?>`,
    riftLines: 10,
    otherLines: 17,
    deps: 'Slim, PDO',
    setup: 'composer init, apache/nginx config',
  },
  go: {
    name: 'Go',
    rift: `grab http
grab db

let conn = db.sql("sqlite:///app.db")

http.get("/api/users", conduit(req) @
    let users = conn.table("users").get()
    give http.json(200, users)
#)

http.serve(8080)`,
    other: `package main

import (
    "database/sql"
    "encoding/json"
    "net/http"
    _ "github.com/mattn/go-sqlite3"
)

func main() {
    db, err := sql.Open("sqlite3", "./app.db")
    if err != nil {
        panic(err)
    }
    defer db.Close()

    http.HandleFunc("/api/users", func(w http.ResponseWriter, r *http.Request) {
        rows, err := db.Query("SELECT * FROM users")
        if err != nil {
            http.Error(w, err.Error(), 500)
            return
        }
        defer rows.Close()
        
        var users []map[string]interface{}
        // ... row scanning logic ...
        
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(users)
    })

    http.ListenAndServe(":8080", nil)
}`,
    riftLines: 10,
    otherLines: 31,
    deps: 'go-sqlite3',
    setup: 'go mod init, go get',
  },
};

type Language = keyof typeof comparisons;

export default function ComparisonSection() {
  const [activeTab, setActiveTab] = useState<Language>('python');

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            More With Less
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            See how RIFT compares to other languages for common tasks.
          </p>
        </div>

        {/* Language tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(comparisons).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as Language)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === key
                  ? 'bg-[var(--accent-blue)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              vs {value.name}
            </button>
          ))}
        </div>

        {/* Comparison display */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* RIFT code */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[var(--accent-green)]">RIFT</h3>
              <span className="text-sm text-[var(--text-muted)]">
                {comparisons[activeTab].riftLines} lines
              </span>
            </div>
            <CodeBlock
              code={comparisons[activeTab].rift}
              language="rift"
              filename="server.rift"
            />
            <div className="mt-3 flex items-center gap-4 text-sm text-[var(--text-muted)]">
              <span>📦 0 dependencies</span>
              <span>⚙️ 0 setup steps</span>
            </div>
          </div>

          {/* Other language code */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[var(--text-primary)]">{comparisons[activeTab].name}</h3>
              <span className="text-sm text-[var(--text-muted)]">
                {comparisons[activeTab].otherLines} lines
              </span>
            </div>
            <CodeBlock
              code={comparisons[activeTab].other}
              language={activeTab}
              filename={`server.${activeTab === 'javascript' ? 'js' : activeTab === 'python' ? 'py' : activeTab}`}
            />
            <div className="mt-3 flex items-center gap-4 text-sm text-[var(--text-muted)]">
              <span>📦 {comparisons[activeTab].deps}</span>
              <span>⚙️ {comparisons[activeTab].setup}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 glass rounded-xl p-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--accent-blue)] mb-2">
                {Math.round((1 - comparisons[activeTab].riftLines / comparisons[activeTab].otherLines) * 100)}%
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Less Code</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--accent-green)] mb-2">0</div>
              <div className="text-sm text-[var(--text-secondary)]">Dependencies Needed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--accent-purple)] mb-2">1</div>
              <div className="text-sm text-[var(--text-secondary)]">Command to Install</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
