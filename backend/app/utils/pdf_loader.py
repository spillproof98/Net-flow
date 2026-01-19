import fitz  # PyMuPDF

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file using PyMuPDF.
    Returns empty string if no text is found.
    """
    text_chunks = []

    try:
        with fitz.open(file_path) as doc:
            for page_num, page in enumerate(doc, start=1):
                page_text = page.get_text("text")

                if page_text and page_text.strip():
                    text_chunks.append(
                        f"\n\n--- Page {page_num} ---\n{page_text.strip()}"
                    )

    except Exception as e:
        # Never crash the pipeline
        raise RuntimeError(
            f"Failed to extract text from PDF: {str(e)}"
        )

    return "\n".join(text_chunks)
