from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid

class Document(SQLModel, table=True):
    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        primary_key=True
    )

    stack_id: str = Field(index=True)
    filename: str
    original_name: str

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )
