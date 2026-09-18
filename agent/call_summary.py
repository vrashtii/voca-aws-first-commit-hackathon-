from dataclasses import dataclass, field


@dataclass
class CallSummary:
    caller_name: str = "Unknown"
    call_type: str = "unknown"
    intent: str = ""
    information_collected: list[str] = field(default_factory=list)
    actions_taken: list[str] = field(default_factory=list)
    status: str = "unresolved"
    def to_dict(self) -> dict:
        return {
            "caller_name": self.caller_name,
            "call_type": self.call_type,
            "intent": self.intent,
            "information_collected": self.information_collected,
            "actions_taken": self.actions_taken,
            "status": self.status
        }