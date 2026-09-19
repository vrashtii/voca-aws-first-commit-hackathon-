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


def sanitize_actions(actions: list[str]) -> list[str]:
    """
    Keep only actions that Voca can truthfully claim
    in the current implementation.

    Voca currently has no external tools for:
    - sending messages
    - notifications
    - reminders
    - payments
    - bookings
    - forwarding calls/messages

    Therefore, those actions must never appear in the summary.
    """

    safe_actions = []

    for action in actions:

        if not isinstance(action, str):
            continue

        action_lower = action.lower().strip()

        # Voca can acknowledge information.
        if "acknowledg" in action_lower:
            safe_actions.append(
                "Acknowledged caller's message"
            )

        # Voca can note information in the current call
        # because the conversation is stored in CallSession.
        elif "noted" in action_lower:
            safe_actions.append(
                "Noted information provided by caller"
            )

    # Remove duplicates while preserving order.
    return list(dict.fromkeys(safe_actions))


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

    Actions are sanitized so that Voca does not claim
    unsupported external actions.
    """

    return CallSummary(
        caller_name=caller_name or "Unknown",
        call_type=call_type or "unknown",
        intent=intent or "",
        information_collected=(
            information_collected
            if isinstance(information_collected, list)
            else []
        ),
        actions_taken=sanitize_actions(actions_taken),
        status=status or "unresolved"
    )