(UNDER CONSTRUCTION)

# 🕵️ STICKY-FINGERS

An AI-powered repository intelligence platform that understands GitHub repositories.

Paste a GitHub repository URL and STICKY-FINGERS will clone, analyze, index and explain the codebase using Large Language Models and Retrieval-Augmented Generation (RAG).

---

## Features

### Repository Analysis

* Clone public GitHub repositories on demand
* Parse and visualize repository structure
* Detect technologies and frameworks automatically
* Generate repository statistics and metadata

### AI-Powered Understanding

* Generate high-level repository summaries
* Explain individual source files in natural language
* Answer questions about the codebase using repository context
* Generate project documentation automatically

### Documentation Generation

Generate:

* README documentation
* Setup instructions
* Architecture documentation
* API documentation

### Interactive Repository Explorer

* Browse repository files
* View source code directly in the browser
* Ask AI to explain selected files
* Navigate large repositories easily

---

## Demo

### Live Demo

Coming Soon

### Example Questions

* Where is authentication implemented?
* How does the API layer work?
* Which files handle database access?
* Explain the repository architecture.
* How is state managed in this application?

---

## Architecture

```text
GitHub Repository
        ↓
Repository Clone
        ↓
Repository Indexing
        ↓
Technology Detection
        ↓
AI Context Generation
        ↓
┌─────────────────────────┐
│ Repository Summary      │
│ Documentation Generator │
│ File Explanations       │
│ Repository Chat         │
└─────────────────────────┘
```

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Axios
* React Markdown

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM

### Database

* PostgreSQL
* Neon Database

### AI

* Google Gemini 2.5 Flash
* Retrieval-Augmented Generation (RAG)

### Infrastructure

* GitHub API
* Render
* Vercel

---

## Project Structure

```text
STICKY-FINGERS
├── frontend
│   ├── src
│   ├── components
│   ├── services
│   └── types
│
└── backend
    ├── src
    │   ├── controllers
    │   ├── routes
    │   ├── services
    │   ├── utils
    │   └── types
    │
    └── storage
        └── repositories
```

---

## Local Development

### Clone the repository

```bash
git clone <repository-url>
cd STICKY-FINGERS
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
```

Run the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

---

## API Endpoints

### Repository Analysis

```http
POST /api/repositories/analyze
```

### File Content

```http
POST /api/repositories/file
```

### File Explanation

```http
POST /api/ai/explain
```

### Documentation Generation

```http
POST /api/documentation
```

### Repository Chat

```http
POST /api/chat
```

---

## Current Capabilities

* Repository cloning and indexing
* Technology stack detection
* AI repository summaries
* AI-generated documentation
* File explanations
* Repository chat
* Interactive repository explorer

---

## Future Improvements

* Semantic vector search
* Embedding-based retrieval
* Multi-repository analysis
* Architecture diagram generation
* Repository comparison
* Persistent repository storage

---

## Why "STICKY-FINGERS"?

Because the application digs through repositories, grabs the important parts, and hands them back in a form humans can understand.

---

## License

MIT License.
