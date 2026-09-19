from dataclasses import dataclass, field


@dataclass
class CallSession:
    conversation: list[str] = field(default_factory=list)
    information_collected: list[str] = field(default_factory=list)
    actions_taken: list[str] = field(default_factory=list)
    is_active: bool = True

    def add_message(self, speaker: str, message: str) -> None:
        self.conversation.append(f"{speaker}: {message}")

    def add_information(self, information: str) -> None:
        if not information:
            return

        information = information.strip()

        if not information:
            return

        if information not in self.information_collected:
            self.information_collected.append(information)

    def add_action(self, action: str) -> None:
        if not action:
            return

        action = action.strip()

        if not action:
            return

        if action not in self.actions_taken:
            self.actions_taken.append(action)

    def end(self) -> None:
        self.is_active = False

    def get_transcript(self) -> str:
        return "\n".join(self.conversation)

    def get_information(self) -> list[str]:
        return self.information_collected.copy()

    def get_actions(self) -> list[str]:
        return self.actions_taken.copy()