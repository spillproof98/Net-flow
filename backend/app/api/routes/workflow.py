from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.workflow_executor import execute_workflow

router = APIRouter(prefix="/workflow", tags=["workflow"])


class RunWorkflowRequest(BaseModel):
    nodes: list
    edges: list
    user_query: str
    stack_id: str


class RunWorkflowResponse(BaseModel):
    output: str


@router.post("/run", response_model=RunWorkflowResponse)
async def run_workflow(payload: RunWorkflowRequest):
    try:
        result = await execute_workflow(
            workflow={
                "nodes": payload.nodes,
                "edges": payload.edges,
            },
            user_query=payload.user_query,
            stack_id=payload.stack_id,
        )

        return {"output": result}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
