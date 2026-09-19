from dataclasses import dataclass
import re


@dataclass
class MessageIntent:
    intent_type: str
    message: str


GOODBYE_PHRASES = (
    "bye",
    "goodbye",
    "good bye",
    "that's all",
    "that’s all",
    "thats all",
    "that's it",
    "that’s it",
    "thats it",
    "thanks that's all",
    "thanks, that's all",
    "thank you that's all",
    "thank you, that's all",
    "thanks that's it",
    "thanks, that's it",
    "thank you that's it",
    "thank you, that's it",
    "i'm done",
    "im done",
    "i am done",
    "no more questions",
    "nothing else",
    "that's everything",
    "that’s everything",
)


def _normalize(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"[.!?]+$", "", text)
    return text


def is_goodbye(message: str) -> bool:
    """Return True when the caller clearly indicates the call is finished."""
    if not message or not message.strip():
        return False

    text = _normalize(message)

    if text in GOODBYE_PHRASES:
        return True

    # Common combinations such as:
    # "okay bye", "okay thanks that's it", "alright, I'm done"
    prefixes = (
        "okay ",
        "ok ",
        "alright ",
        "all right ",
        "well ",
        "thanks ",
        "thank you ",
    )

    for prefix in prefixes:
        if text.startswith(prefix):
            remainder = text[len(prefix):].strip()
            if remainder in GOODBYE_PHRASES:
                return True

    return False


def classify_message(message: str) -> MessageIntent:
    text = message.strip().lower()

    if not text:
        return MessageIntent("information", message)

    if is_goodbye(message):
        return MessageIntent("goodbye", message)

    question_starters = (
        "what ", "where ", "when ", "why ", "who ", "how ",
        "can you tell", "do you know", "is there", "are there",
        "could you tell"
    )

    if text.endswith("?") or text.startswith(question_starters):
        return MessageIntent("question", message)

    action_phrases = (
        "please send", "please call", "please book",
        "please schedule", "please cancel", "please remind",
        "please tell", "please notify", "please forward",
        "send this", "call them", "book this", "schedule this",
        "cancel this", "remind me", "tell her", "tell him",
        "tell them", "notify them", "forward this"
    )

    if any(phrase in text for phrase in action_phrases):
        return MessageIntent("action_request", message)

    return MessageIntent("information", message)
