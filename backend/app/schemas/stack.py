from pydantic import BaseModel
from datetime import datetime

class StackCreate(BaseModel):
    name: str

class StackResponse(BaseModel):
    id: str
    name: str
    created_at: datetime
