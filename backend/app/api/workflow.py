from fastapi import APIRouter, HTTPException
from app.services.workflow_engine import execute_workflow

router = APIRouter()

WORKFLOWS = {}  # stack_id -> workflow graph


@router.post("/{stack_id}/save")
def save_workflow(stack_id: str, data: dict):
    WORKFLOWS[stack_id] = data
    return {"status": "saved"}


@router.post("/{stack_id}/run")
def run_workflow(stack_id: str, data: dict):
    """
    Build Stack button → same runtime as chat
    """
    if stack_id not in WORKFLOWS:
        raise HTTPException(404, "Workflow not found")

    # normalize payload
    user_input = data.get("query") or data.get("message")
    if not user_input:
        raise HTTPException(400, "Missing query/message")

    result = execute_workflow(
        workflow=WORKFLOWS[stack_id],
        user_query=user_input,
        stack_id=stack_id
    )

    return {"response": result}
