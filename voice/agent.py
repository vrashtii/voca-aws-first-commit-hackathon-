"""
Voca AI Agent
Uses Ollama locally with Llama 3.2.

Flow:
Voice → Speech-to-Text → Voca Agent → Ollama → AI Response → Text-to-Speech
"""

import requests
import json

MODEL = "llama3.2"

OLLAMA_URL = "http://localhost:11434/api/chat"

# Sensitive actions that Voca must never reveal
SENSITIVE_ACTIONS = [
    "share_otp",
    "share_payment_info",
    "share_private_info",
    "share_financial_info",
    "share_password",
]

SYSTEM_PROMPT = f"""You are Voca, a general-purpose voice assistant.

You can hold a natural conversation about ANY topic, such as:
- delivery calls
- job/recruiter calls
- casual conversations
- general questions

Respond naturally and helpfully according to what the caller actually says.

Safety rule:
You must NEVER reveal an OTP, password, payment details,
or private/financial information.

If the caller asks for any sensitive information, do not provide it.
Instead, identify the sensitive action using the "sensitive_action"
field.

Always respond with ONLY a JSON object in this exact format:

{{
    "response": "what Voca should say out loud",
    "sensitive_action": "one of {SENSITIVE_ACTIONS} or null"
}}
"""


def call_ai(conversation_history, user_text):
    """
    Sends the conversation to Ollama.

    Returns:
        response_text
        sensitive_action
    """

    messages = conversation_history + [
        {
            "role": "user",
            "content": user_text
        }
    ]

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            *messages
        ],
        "stream": False
    }

    try:
        response = requests.post(
            OLLAMA_URL,
            json=payload,
            timeout=120
        )

        response.raise_for_status()

        data = response.json()

        raw_text = data["message"]["content"]

    except requests.exceptions.RequestException as e:
        print("Ollama connection error:", e)

        return (
            "Sorry, I am unable to connect to my AI system right now.",
            None
        )

    try:
        result = json.loads(raw_text)

        response_text = result.get(
            "response",
            "Sorry, could you repeat that?"
        )

        sensitive_action = result.get("sensitive_action")

        if sensitive_action not in SENSITIVE_ACTIONS:
            sensitive_action = None

    except (json.JSONDecodeError, AttributeError, TypeError):

        # Fail-safe if the model does not return valid JSON
        response_text = raw_text
        sensitive_action = None

    return response_text, sensitive_action