import uuid
import chromadb
from chromadb.config import Settings
from openai import OpenAI
from app.core.config import settings
from app.utils.chunker import chunk_text

# ---------------------------
# Chroma client (persistent)
# ---------------------------
chroma_client = chromadb.Client(
    Settings(
        persist_directory="/data",
        anonymized_telemetry=False,
    )
)

# ---------------------------
# OpenAI client
# ---------------------------
openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)


def get_collection(stack_id: str | None = None):
    """
    Get or create Chroma collection.
    Single collection, stack_id stored in metadata.
    """
    return chroma_client.get_or_create_collection(
        name=settings.CHROMA_COLLECTION
    )


def embed_texts(texts: list[str]) -> list[list[float]]:
    response = openai_client.embeddings.create(
        model=settings.OPENAI_EMBEDDING_MODEL,
        input=texts,
    )
    return [e.embedding for e in response.data]


# ---------------------------
# ADD DOCUMENT
# ---------------------------
def add_document(
    text: str,
    stack_id: str | None = None,
):
    """
    Chunk → embed → store in Chroma
    """
    if not text.strip():
        return

    chunks = chunk_text(text)
    embeddings = embed_texts(chunks)

    ids = [str(uuid.uuid4()) for _ in chunks]
    metadatas = [{"stack_id": stack_id} for _ in chunks]

    collection = get_collection(stack_id)

    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=ids,
        metadatas=metadatas,
    )


# ---------------------------
# RETRIEVE CONTEXT (RAG)
# ---------------------------
def retrieve_context(
    query: str,
    limit: int = 4,
    stack_id: str | None = None,
    max_distance: float = 0.75,
) -> str:
    """
    Retrieve relevant chunks for RAG.
    Lower distance = higher relevance.
    """

    if not query:
        return ""

    query_embedding = embed_texts([query])[0]
    collection = get_collection(stack_id)

    where_clause = {"stack_id": stack_id} if stack_id else None

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=limit,
        where=where_clause,
        include=["documents", "distances"],
    )

    documents = results.get("documents", [[]])[0]
    distances = results.get("distances", [[]])[0]

    filtered_docs = [
        doc
        for doc, dist in zip(documents, distances)
        if dist is not None and dist <= max_distance
    ]

    if not filtered_docs:
        return ""

    return "\n\n".join(filtered_docs)
