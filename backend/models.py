from dataclasses import dataclass
from typing import Optional


@dataclass
class AgentModel:
    agent_id: int
    agent_name: str
    user_name: str
    purposes: list[str]
    profile_data: dict
    status: str
    created_at: str


@dataclass
class CallModel:
    call_id: int
    agent_id: int
    caller_name: Optional[str]
    call_type: Optional[str]
    summary: Optional[str]
    transcript: Optional[str]
    status: Optional[str]
    action_required: bool
    created_at: str