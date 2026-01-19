from pydantic import BaseModel
from datetime import datetime

class DocumentResponse(BaseModel):
    id: str
    stack_id: str
    filename: str
    original_name: str
    created_at: datetime
