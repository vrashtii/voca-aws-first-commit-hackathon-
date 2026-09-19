import json

from .agent import process_call_message, summary_agent
from .session import CallSession
from .call_summary import generate_call_summary
from .tools import set_profile


class VocaCall:
    """
    Bridge between the Voca AI core and external interfaces
    such as voice or FastAPI.

    One VocaCall object represents one complete call.
    """

    def __init__(
        self,
        user_name: str = "User",
        profile_data: dict | None = None
    ):
        self.session = CallSession()
        self.call_summary = None

        self.user_name = user_name
        self.profile_data = profile_data or {}

        # Make this user's profile available to Voca tools.
        set_profile(self.profile_data)

        self.intro = (
            "Hi, I'm Voca, an AI assistant. "
            "How can I help you today?"
        )

        self.session.add_message(
            "Voca",
            self.intro
        )

    def get_intro(self) -> str:
        """Return Voca's initial greeting."""
        return self.intro

    def process(self, caller_input: str) -> str:
        """
        Process one caller message through the existing
        Voca AI message-processing pipeline.
        """

        if not caller_input or not caller_input.strip():
            return "Could you please repeat that?"

        caller_input = caller_input.strip()

        # Store caller message
        self.session.add_message(
            "Caller",
            caller_input
        )

        # Keep backend profile available to tools
        set_profile(self.profile_data)

        profile_context = f"""
Agent owner name: {self.user_name}

Configured agent profile:
{self.profile_data}

This is an ongoing call.

The application has already given the caller Voca's
initial introduction.

Do NOT introduce Voca again.

Respond directly to the caller's current message.
"""

        # Use the same AI processing pipeline
        # with the backend profile as context.
        response_text = process_call_message(
            caller_input,
            extra_context=profile_context
        )

        # Store Voca response
        self.session.add_message(
            "Voca",
            response_text
        )

        return response_text

    def end(self) -> None:
        """
        End the call and generate a structured call summary.
        """

        if not self.session.is_active:
            return

        self.session.end()

        transcript = self.session.get_transcript()

        summary_response = summary_agent(
            f"""
Analyze this completed Voca call.

The person Voca represents is:
{self.user_name}

Complete transcript:

{transcript}
"""
        )

        try:
            summary_data = json.loads(
                str(summary_response)
            )

            self.call_summary = generate_call_summary(
                caller_name=summary_data.get(
                    "caller_name",
                    "Unknown"
                ),
                call_type=summary_data.get(
                    "call_type",
                    "unknown"
                ),
                intent=summary_data.get(
                    "intent",
                    ""
                ),
                information_collected=(
                    self.session.get_information()
                    if self.session.get_information()
                    else summary_data.get(
                        "information_collected",
                        []
                    )
                ),
                actions_taken=self.session.actions_taken,
                status=summary_data.get(
                    "status",
                    "unresolved"
                )
            )

        except (json.JSONDecodeError, TypeError):

            self.call_summary = generate_call_summary(
                caller_name="Unknown",
                call_type="unknown",
                intent="",
                information_collected=self.session.get_information(),
                actions_taken=self.session.actions_taken,
                status="unresolved"
            )

    def get_summary(self) -> dict | None:
        """Return the structured call summary."""

        if self.call_summary is None:
            return None

        return self.call_summary.to_dict()

    def get_transcript(self) -> str:
        """Return the complete call transcript."""
        return self.session.get_transcript()

    def get_information(self) -> list[str]:
        """Return information collected during the call."""
        return self.session.get_information()

    def get_actions(self) -> list[str]:
        """Return confirmed actions from the call."""
        return self.session.get_actions()

    @property
    def is_active(self) -> bool:
        return self.session.is_active