def retrieve_context(
    query: str,
    limit: int = 4,
    stack_id: str | None = None,
    min_score: float = 0.2,
) -> str:
    """
    Retrieve relevant chunks for RAG with filtering
    """
    query_embedding = embed_texts([query])[0]

    where_clause = {"stack_id": stack_id} if stack_id else None

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=limit,
        where=where_clause,
        include=["documents", "distances", "metadatas"]
    )

    documents = results.get("documents", [[]])[0]
    distances = results.get("distances", [[]])[0]

    filtered = []
    for doc, dist in zip(documents, distances):
        # Chroma distance: lower = more similar
        if dist is not None and dist <= min_score:
            filtered.append(doc)

    if not filtered:
        return ""

    return "\n\n".join(
        f"[KB]\n{doc}" for doc in filtered
    )
