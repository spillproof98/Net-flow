from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid

class Stack(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    user_id: str = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
