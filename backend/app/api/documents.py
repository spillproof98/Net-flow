from fastapi import APIRouter, UploadFile, File
from app.services.rag_service import add_document

router = APIRouter()

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    content = await file.read()

    # store raw text for now
    add_document(content.decode(errors="ignore"))

    return {
        "filename": file.filename,
        "size": len(content)
    }
