from dataclasses import dataclass, field


@dataclass
class CallSession:
    """
    Stores information about one Voca call.
    """

    conversation: list[str] = field(default_factory=list)
    is_active: bool = True

    def add_message(self, speaker: str, message: str) -> None:
        self.conversation.append(f"{speaker}: {message}")

    def end(self) -> None:
        self.is_active = False

    def get_transcript(self) -> str:
        """
        Return the complete conversation as a single transcript.
        """
        return "\n".join(self.conversation)