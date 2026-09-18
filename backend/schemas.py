from pydantic import BaseModel
from typing import Any, Optional, Literal


class AgentCreate(BaseModel):
    agent_name: str
    user_name: str
    purposes: list[str]
    profile_data: dict[str, Any] = {}


class AgentUpdate(BaseModel):
    agent_name: Optional[str] = None
    user_name: Optional[str] = None
    purposes: Optional[list[str]] = None
    profile_data: Optional[dict[str, Any]] = None
    status: Optional[Literal["enabled", "disabled"]] = None


class CallCreate(BaseModel):
    agent_id: int
    caller_name: Optional[str] = None
    call_type: Optional[str] = None
    summary: Optional[str] = None
    transcript: Optional[str] = None
    status: Optional[Literal["pending", "completed", "failed"]] = None
    action_required: bool = False


class AgentResponse(BaseModel):
    agent_id: int
    agent_name: str
    user_name: str
    purposes: list[str]
    profile_data: dict[str, Any]
    status: str
    created_at: str


class CallResponse(BaseModel):
    call_id: int
    agent_id: int
    caller_name: Optional[str] = None
    call_type: Optional[str] = None
    summary: Optional[str] = None
    transcript: Optional[str] = None
    status: Optional[str] = None
    action_required: bool
    created_at: str


class CallProcess(BaseModel):
    agent_id: int
    caller_name: Optional[str] = None
    call_type: Optional[str] = None
    summary: Optional[str] = None
    transcript: Optional[str] = None
    status: Optional[Literal["pending", "completed", "failed"]] = "completed"
    action_required: bool = False
class CallUpdate(BaseModel):
    caller_name: Optional[str] = None
    call_type: Optional[str] = None
    summary: Optional[str] = None
    transcript: Optional[str] = None
    status: Optional[Literal["pending", "completed", "failed"]] = None
    action_required: Optional[bool] = None