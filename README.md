# Net-Flow

Net-Flow is a no-code / low-code workflow builder that allows users to visually
create AI-powered workflows using drag-and-drop components.

## Features
- Drag & drop workflow builder (React Flow)
- Knowledge base with PDF upload (RAG)
- LLM integration (OpenAI / Gemini)
- Chat with workflow
- JWT authentication
- PostgreSQL + ChromaDB
- Fully Dockerized

## Tech Stack
Frontend:
- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Flow
- Zustand

Backend:
- FastAPI
- SQLModel
- PostgreSQL
- ChromaDB

## Setup

```bash
cp .env.example .env
docker compose up --build
URLs
Frontend: http://localhost:5173

Backend: http://localhost:8000/docs

yaml
Copy code

---

# 🐳 `docker-compose.yml`

```yaml
version: "3.9"

services:
  frontend:
    image: node:20
    container_name: netflow-frontend
    working_dir: /app
    volumes:
      - ./frontend:/app
    command: sh -c "npm install && npm run dev"
    ports:
      - "5173:5173"
    depends_on:
      - backend

  backend:
    image: python:3.12
    container_name: netflow-backend
    working_dir: /app
    volumes:
      - ./backend:/app
    env_file:
      - .env
    command: sh -c "pip install -r requirements.txt && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
    ports:
      - "8000:8000"
    depends_on:
      - db
      - chroma

  db:
    image: postgres:15
    container_name: netflow-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: netflow
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  chroma:
    image: chromadb/chroma
    container_name: netflow-chroma
    ports:
      - "8001:8000"
    volumes:
      - chroma_data:/chroma/chroma

volumes:
  postgres_data:
  chroma_data:
🔐 .env.example
env
Copy code
APP_NAME=Net-Flow
APP_ENV=development
APP_URL=http://localhost:5173

JWT_SECRET=CHANGE_ME_64_CHAR_SECRET
JWT_EXPIRE_MINUTES=1440

DATABASE_URL=postgresql://postgres:postgres@db:5432/netflow

LLM_PROVIDER=openai
OPENAI_API_KEY=CHANGE_ME
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-large

VECTOR_DB=chroma
CHROMA_HOST=chroma
CHROMA_PORT=8000
CHROMA_COLLECTION=netflow_docs

WEB_SEARCH_PROVIDER=serpapi
SERPAPI_API_KEY=CHANGE_ME
