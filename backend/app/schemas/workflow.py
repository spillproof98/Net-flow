from pydantic import BaseModel
from typing import Any, List



class WorkflowSaveRequest(BaseModel):
    nodes: List[Any]
    edges: List[Any]


class WorkflowRunRequest(BaseModel):
    nodes: List[Any]
    edges: List[Any]
    user_query: str
    stack_id: str


class WorkflowRunResponse(BaseModel):
    output: str
