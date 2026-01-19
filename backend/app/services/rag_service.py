import uuid
import chromadb
from chromadb.config import Settings
from openai import OpenAI
from app.core.config import settings
from app.utils.chunker import chunk_text

chroma_client = chromadb.Client(
    Settings(
        persist_directory="/data",
        anonymized_telemetry=False,
    )
)


openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)


def get_collection(stack_id: str | None = None):
    """
    Get or create a Chroma collection.
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
