from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
import uuid

router = APIRouter()

STACKS = []


class StackCreate(BaseModel):
    name: str


class StackResponse(BaseModel):
    id: str
    name: str
    created_at: datetime


@router.get("/", response_model=list[StackResponse])
def list_stacks():
    return STACKS


@router.post("/", response_model=StackResponse)
def create_stack(data: StackCreate):
    stack = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "created_at": datetime.utcnow(),
    }
    STACKS.append(stack)
    return stack
