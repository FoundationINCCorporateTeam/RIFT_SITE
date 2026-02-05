import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import { 
  ArrowRight, 
  Server, 
  Database, 
  Shield, 
  MessageSquare, 
  FileUp, 
  Zap,
  Clock,
  Tag,
  Play
} from "lucide-react";

export const metadata = {
  title: "Examples - RIFT Programming Language",
  description: "Learn RIFT by example. Explore real-world code samples and tutorials.",
};

const categories = [
  { id: 'web', name: 'Web Development', icon: Server },
  { id: 'database', name: 'Database', icon: Database },
  { id: 'auth', name: 'Authentication', icon: Shield },
  { id: 'realtime', name: 'Real-time', icon: MessageSquare },
  { id: 'files', name: 'File Handling', icon: FileUp },
  { id: 'async', name: 'Async', icon: Zap },
];

const examples = [
  {
    id: 'rest-api',
    title: 'REST API',
    description: 'Build a complete REST API with CRUD operations',
    category: 'web',
    difficulty: 'Beginner',
    time: '10 min',
    tags: ['http', 'api', 'crud'],
    code: `grab http
grab db

let conn = db.sql("sqlite:///todos.db")

# Create table
conn.raw("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title TEXT, completed INTEGER)")

# Get all todos
http.get("/api/todos", conduit(req) @
    let todos = conn.table("todos").get()
    give http.json(200, todos)
#)

# Get single todo
http.get("/api/todos/:id", conduit(req) @
    let todo = conn.table("todos")
        -> where("id", req.params.id)
        -> first()
    
    if todo == none @
        give http.json(404, @error: "Todo not found"#)
    #
    
    give http.json(200, todo)
#)

# Create todo
http.post("/api/todos", conduit(req) @
    let id = conn.table("todos").insert(@
        title: req.body.title,
        completed: 0
    #)
    give http.json(201, @id: id, title: req.body.title, completed: no#)
#)

# Update todo
http.put("/api/todos/:id", conduit(req) @
    conn.table("todos")
        -> where("id", req.params.id)
        -> update(@
            title: req.body.title,
            completed: req.body.completed
        #)
    give http.json(200, @success: yes#)
#)

# Delete todo
http.delete("/api/todos/:id", conduit(req) @
    conn.table("todos")
        -> where("id", req.params.id)
        -> delete()
    give http.json(204, none)
#)

print("Todo API running on http://localhost:8080")
http.serve(8080)`,
  },
  {
    id: 'jwt-auth',
    title: 'JWT Authentication',
    description: 'Implement JWT-based authentication with login and protected routes',
    category: 'auth',
    difficulty: 'Intermediate',
    time: '20 min',
    tags: ['auth', 'jwt', 'security'],
    code: `grab http
grab crypto
grab db

let SECRET = "your-secret-key"
let conn = db.sql("sqlite:///users.db")

conn.raw("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)")

# Register new user
http.post("/auth/register", conduit(req) @
    let hashedPassword = crypto.hashpass(req.body.password)
    
    try @
        let id = conn.table("users").insert(@
            email: req.body.email,
            password: hashedPassword
        #)
        give http.json(201, @id: id, email: req.body.email#)
    # catch error @
        give http.json(400, @error: "Email already exists"#)
    #
#)

# Login
http.post("/auth/login", conduit(req) @
    let user = conn.table("users")
        -> where("email", req.body.email)
        -> first()
    
    if user == none @
        give http.json(401, @error: "Invalid credentials"#)
    #
    
    if not crypto.checkpass(req.body.password, user.password) @
        give http.json(401, @error: "Invalid credentials"#)
    #
    
    let token = crypto.token(@userId: user.id, email: user.email#, SECRET)
    give http.json(200, @token: token#)
#)

# Auth middleware
conduit authMiddleware(req) @
    let authHeader = req.headers.authorization
    
    if authHeader == none or not authHeader.startsWith("Bearer ") @
        give none
    #
    
    let token = authHeader.substring(7)
    
    try @
        give crypto.verify(token, SECRET)
    # catch error @
        give none
    #
#

# Protected route
http.get("/api/profile", conduit(req) @
    let user = authMiddleware(req)
    
    if user == none @
        give http.json(401, @error: "Unauthorized"#)
    #
    
    give http.json(200, @userId: user.userId, email: user.email#)
#)

print("Auth server running on http://localhost:8080")
http.serve(8080)`,
  },
  {
    id: 'file-upload',
    title: 'File Upload Handler',
    description: 'Handle file uploads with validation and storage',
    category: 'files',
    difficulty: 'Intermediate',
    time: '15 min',
    tags: ['files', 'upload', 'storage'],
    code: `grab http
grab fs
grab crypto

let UPLOAD_DIR = "./uploads"
let MAX_SIZE = 10 * 1024 * 1024  # 10MB
let ALLOWED_TYPES = ~"image/jpeg", "image/png", "image/gif", "application/pdf"!

# Ensure upload directory exists
if not fs.exists(UPLOAD_DIR) @
    fs.mkdir(UPLOAD_DIR)
#

http.post("/api/upload", conduit(req) @
    let file = req.files.file
    
    if file == none @
        give http.json(400, @error: "No file provided"#)
    #
    
    # Check file size
    if file.size ! MAX_SIZE @
        give http.json(400, @error: "File too large (max 10MB)"#)
    #
    
    # Check file type
    if not ALLOWED_TYPES.includes(file.mimetype) @
        give http.json(400, @error: "Invalid file type"#)
    #
    
    # Generate unique filename
    let ext = fs.extname(file.originalname)
    let filename = \`$@crypto.uuid()#$@ext#\`
    let filepath = fs.join(UPLOAD_DIR, filename)
    
    # Save file
    fs.write(filepath, file.buffer)
    
    give http.json(201, @
        filename: filename,
        size: file.size,
        mimetype: file.mimetype,
        url: \`/uploads/$@filename#\`
    #)
#)

# Serve uploaded files
http.get("/uploads/:filename", conduit(req) @
    let filepath = fs.join(UPLOAD_DIR, req.params.filename)
    
    if not fs.exists(filepath) @
        give http.json(404, @error: "File not found"#)
    #
    
    give http.file(filepath)
#)

print("File server running on http://localhost:8080")
http.serve(8080)`,
  },
  {
    id: 'websocket-chat',
    title: 'WebSocket Chat',
    description: 'Real-time chat application using WebSockets',
    category: 'realtime',
    difficulty: 'Advanced',
    time: '30 min',
    tags: ['websocket', 'realtime', 'chat'],
    code: `grab http
grab crypto

let clients = @#  # Map of client connections
let rooms = @#    # Map of room -> clients

http.ws("/chat", conduit(ws, req) @
    let clientId = crypto.uuid()
    let currentRoom = "general"
    
    clients~clientId! = ws
    
    # Join default room
    if rooms~currentRoom! == none @
        rooms~currentRoom! = ~!
    #
    rooms~currentRoom!.push(clientId)
    
    # Broadcast to room
    conduit broadcast(room, message, excludeId = none) @
        let roomClients = rooms~room! ?? ~!
        repeat id in roomClients @
            if id != excludeId and clients~id! != none @
                clients~id!.send(json.stringify(message))
            #
        #
    #
    
    # Handle incoming messages
    ws.on("message", conduit(data) @
        let msg = json.parse(data)
        
        check msg.type @
            "chat" =! @
                broadcast(currentRoom, @
                    type: "chat",
                    clientId: clientId,
                    message: msg.message,
                    timestamp: Date.now()
                #, clientId)
            #
            
            "join" =! @
                # Leave current room
                rooms~currentRoom! = rooms~currentRoom!.filter((id) =! id != clientId)
                
                # Join new room
                currentRoom = msg.room
                if rooms~currentRoom! == none @
                    rooms~currentRoom! = ~!
                #
                rooms~currentRoom!.push(clientId)
                
                broadcast(currentRoom, @
                    type: "system",
                    message: \`User joined $@currentRoom#\`
                #)
            #
        #
    #)
    
    # Handle disconnect
    ws.on("close", conduit() @
        rooms~currentRoom! = rooms~currentRoom!.filter((id) =! id != clientId)
        clients~clientId! = none
        
        broadcast(currentRoom, @
            type: "system",
            message: "User left the chat"
        #)
    #)
#)

# Serve static HTML client
http.get("/", conduit(req) @
    give http.html(200, "~html!...~/html!")
#)

print("Chat server running on http://localhost:8080")
http.serve(8080)`,
  },
  {
    id: 'async-processing',
    title: 'Async Data Processing',
    description: 'Process data asynchronously with error handling',
    category: 'async',
    difficulty: 'Intermediate',
    time: '15 min',
    tags: ['async', 'pipeline', 'processing'],
    code: `grab http

# Simulate API calls
async conduit fetchData(url) @
    # In real code, this would be an actual HTTP request
    let response = wait http.get(url)
    give response.json()
#

async conduit processItem(item) @
    # Simulate processing
    give @
        id: item.id,
        processed: yes,
        result: item.value * 2
    #
#

async conduit saveResult(result) @
    # Simulate saving to database
    print(\`Saved: $@result.id# = $@result.result#\`)
    give result
#

# Pipeline processing
async conduit processAll(items) @
    let results = ~!
    
    repeat item in items @
        try @
            let result = wait fetchData(\`/api/items/$@item.id#\`)
                ~! processItem
                ~! saveResult
            
            results.push(result)
        # catch error @
            print(\`Error processing item $@item.id#: $@error#\`)
        #
    #
    
    give results
#

# Parallel processing
async conduit processParallel(items) @
    let promises = items -! map((item) =! @
        wait processItem(item)
    #)
    
    give wait Promise.all(promises)
#

async conduit main() @
    let items = ~
        @id: 1, value: 10#,
        @id: 2, value: 20#,
        @id: 3, value: 30#
    !
    
    print("Processing sequentially...")
    let sequential = wait processAll(items)
    print(\`Sequential results: $@sequential.length# items\`)
    
    print("\\nProcessing in parallel...")
    let parallel = wait processParallel(items)
    print(\`Parallel results: $@parallel.length# items\`)
#

wait main()`,
  },
  {
    id: 'crud-database',
    title: 'Database CRUD',
    description: 'Complete CRUD operations with multiple database types',
    category: 'database',
    difficulty: 'Beginner',
    time: '15 min',
    tags: ['database', 'crud', 'sql'],
    code: `grab db

# Connect to SQLite
let conn = db.sql("sqlite:///app.db")

# Create table
conn.raw("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, stock INTEGER)")

# CREATE - Insert new products
print("Creating products...")
let id1 = conn.table("products").insert(@name: "Laptop", price: 999.99, stock: 50#)
let id2 = conn.table("products").insert(@name: "Mouse", price: 29.99, stock: 200#)
let id3 = conn.table("products").insert(@name: "Keyboard", price: 79.99, stock: 100#)
print(\`Created products with IDs: $@id1#, $@id2#, $@id3#\`)

# READ - Query products
print("\\nReading all products:")
let products = conn.table("products").get()
repeat product in products @
    print(\`  - $@product.name#: $$@product.price# ($@product.stock# in stock)\`)
#

# READ - Single product
print("\\nFinding expensive products (price > $50):")
let expensive = conn.table("products")
    -> where("price", "!", 50)
    -> order("price", "DESC")
    -> get()
repeat product in expensive @
    print(\`  - $@product.name#: $$@product.price#\`)
#

# UPDATE - Modify product
print("\\nUpdating Laptop price...")
conn.table("products")
    -> where("name", "Laptop")
    -> update(@price: 899.99#)

let laptop = conn.table("products")
    -> where("name", "Laptop")
    -> first()
print(\`New Laptop price: $$@laptop.price#\`)

# DELETE - Remove product
print("\\nDeleting Mouse...")
conn.table("products")
    -> where("name", "Mouse")
    -> delete()

let count = conn.table("products").count()
print(\`Remaining products: $@count#\`)

conn.close()
print("\\nDone!")`,
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Learn by Building
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Explore real-world examples and tutorials to master RIFT.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-4 py-2 rounded-lg bg-[var(--accent-blue)] text-white text-sm font-medium">
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Examples grid */}
        <div className="space-y-8">
          {examples.map((example) => (
            <div key={example.id} className="glass rounded-xl overflow-hidden">
              {/* Example header */}
              <div className="p-6 border-b border-[var(--glass-border)]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                      {example.title}
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-4">
                      {example.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        example.difficulty === 'Beginner' 
                          ? 'bg-[var(--accent-green)]/20 text-[var(--accent-green)]'
                          : example.difficulty === 'Intermediate'
                          ? 'bg-[var(--accent-orange)]/20 text-[var(--accent-orange)]'
                          : 'bg-[var(--accent-red)]/20 text-[var(--accent-red)]'
                      }`}>
                        {example.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                        <Clock className="w-4 h-4" />
                        {example.time}
                      </span>
                      <div className="flex items-center gap-2">
                        {example.tags.map((tag) => (
                          <span key={tag} className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/playground?example=${example.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-blue)] text-white font-medium hover:bg-[var(--accent-blue)]/90 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Try it
                  </Link>
                </div>
              </div>
              
              {/* Code */}
              <div className="max-h-96 overflow-y-auto">
                <CodeBlock code={example.code} language="rift" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 glass rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Want More Examples?
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            Check out the GitHub repository for more examples and community contributions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/FoundationINCCorporateTeam/RIFT/tree/main/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[var(--accent-blue)] text-white font-medium hover:bg-[var(--accent-blue)]/90 transition-colors flex items-center gap-2"
            >
              View on GitHub
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/community#contributing"
              className="px-6 py-3 rounded-lg border border-[var(--glass-border)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)] transition-colors"
            >
              Contribute Examples
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
