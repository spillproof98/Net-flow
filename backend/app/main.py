from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, stacks, workflow, documents, chat

app = FastAPI(title="Net-Flow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # frontend localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["Auth"])
app.include_router(stacks.router, prefix="/stacks", tags=["Stacks"])
app.include_router(workflow.router, prefix="/workflow", tags=["Workflow"])
app.include_router(documents.router, prefix="/documents", tags=["Documents"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
