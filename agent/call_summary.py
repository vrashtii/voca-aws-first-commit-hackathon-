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


def generate_call_summary(
    caller_name: str,
    call_type: str,
    intent: str,
    information_collected: list[str],
    actions_taken: list[str],
    status: str
) -> CallSummary:
    """
    Create a structured summary of a completed Voca call.
    """

    return CallSummary(
        caller_name=caller_name,
        call_type=call_type,
        intent=intent,
        information_collected=information_collected,
        actions_taken=actions_taken,
        status=status
    )