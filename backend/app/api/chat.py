from fastapi import APIRouter, HTTPException
from app.api.workflow import WORKFLOWS
from app.services.workflow_engine import execute_workflow

router = APIRouter()

@router.post("/{stack_id}/chat")
def chat_with_stack(stack_id: str, data: dict):
    if stack_id not in WORKFLOWS:
        raise HTTPException(404, "Workflow not found")

    reply = execute_workflow(
        workflow=WORKFLOWS[stack_id],
        user_query=data["message"],
        stack_id=stack_id 
    )

    return {"response": reply}
