from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid
from sqlalchemy import Column, JSON

class Workflow(SQLModel, table=True):
    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        primary_key=True
    )

    stack_id: str = Field(index=True)

    nodes: dict = Field(
        sa_column=Column(JSON, nullable=False)
    )

    edges: dict = Field(
        sa_column=Column(JSON, nullable=False)
    )

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )
