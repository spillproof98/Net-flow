from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid


class User(SQLModel, table=True):
    __tablename__ = "users"  # 👈 IMPORTANT

    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        primary_key=True,
    )
    email: str = Field(index=True, unique=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
