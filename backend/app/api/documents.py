from fastapi import APIRouter, UploadFile, File, Form
from app.services.rag_service import add_document

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    stack_id: str = Form(...),
):
    content = await file.read()
    text = content.decode(errors="ignore")

    add_document(
        text=text,
        stack_id=stack_id,
    )

    return {
        "filename": file.filename,
        "size": len(content),
        "stack_id": stack_id,
    }
