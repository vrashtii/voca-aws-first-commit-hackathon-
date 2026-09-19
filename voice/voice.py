import os
import sys
import json
import urllib.request

import sounddevice as sd
import speech_recognition as sr
import pyttsx3


# ---------------------------------------------------------
# Project paths
# ---------------------------------------------------------

PROJECT_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)

if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)


# ---------------------------------------------------------
# Voca AI core
# ---------------------------------------------------------

from agent.voice_interface import VocaCall


# ---------------------------------------------------------
# Get agent profile from FastAPI backend
# ---------------------------------------------------------

def get_agent_profile(agent_id: int = 1) -> dict:
    """
    Fetch the selected Voca agent profile from the backend.
    """

    url = f"http://127.0.0.1:8000/api/agents/{agent_id}/profile"

    with urllib.request.urlopen(url) as response:
        return json.loads(
            response.read().decode("utf-8")
        )


# ---------------------------------------------------------
# Policy checker
# ---------------------------------------------------------

POLICY_PATH = os.path.join(
    PROJECT_ROOT,
    "policies"
)

if POLICY_PATH not in sys.path:
    sys.path.insert(0, POLICY_PATH)

from policy_check import check_permission


# ---------------------------------------------------------
# Text to Speech
# ---------------------------------------------------------

def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()


# ---------------------------------------------------------
# Speech to Text
# ---------------------------------------------------------

def listen(duration=6, fs=16000):
    """
    Record audio from the microphone and convert it
    to text using Google's speech recognizer.

    Returns None if speech could not be understood.
    """

    print(f"Speak now... (recording {duration}s)")

    recording = sd.rec(
        int(duration * fs),
        samplerate=fs,
        channels=1,
        dtype="int16"
    )

    sd.wait()

    print("Audio captured!")

    recognizer = sr.Recognizer()

    audio = sr.AudioData(
        recording.tobytes(),
        fs,
        2
    )

    try:
        text = recognizer.recognize_google(audio)

        print("You said:", text)

        return text

    except sr.UnknownValueError:
        print("Could not understand audio.")
        return None

    except sr.RequestError as e:
        print("Speech service error:", e)
        return None


# ---------------------------------------------------------
# Call ending phrases
# ---------------------------------------------------------

EXIT_WORDS = [
    "bye",
    "goodbye",
    "stop",
    "exit",
    "end call"
]


# ---------------------------------------------------------
# Basic sensitive-action detection
# ---------------------------------------------------------

def detect_sensitive_action(user_text):
    """
    Detect actions that must be blocked by the safety policy.

    Normal conversation returns None.
    """

    text = user_text.lower()

    if "otp" in text or "one time password" in text:
        return "share_otp"

    if "password" in text:
        return "share_password"

    if (
        "bank account" in text
        or "bank details" in text
        or "payment information" in text
        or "payment info" in text
    ):
        return "share_payment_info"

    if (
        "financial information" in text
        or "financial details" in text
        or "credit card" in text
        or "debit card" in text
    ):
        return "share_financial_info"

    if (
        "private information" in text
        or "private info" in text
        or "personal sensitive information" in text
    ):
        return "share_private_info"

    return None


# ---------------------------------------------------------
# Main voice conversation
# ---------------------------------------------------------

def run_conversation():

    # -----------------------------------------------------
    # Get the user's selected Voca agent from backend
    # -----------------------------------------------------

    agent_data = get_agent_profile(1)

    print(
        "Loaded agent:",
        agent_data["agent_name"]
    )

    print(
        "User:",
        agent_data["user_name"]
    )

    # -----------------------------------------------------
    # One VocaCall object = one complete call
    # -----------------------------------------------------

    voca_call = VocaCall(
        user_name=agent_data["user_name"],
        profile_data=agent_data["profile_data"]
    )

    # -----------------------------------------------------
    # Application-level introduction
    # -----------------------------------------------------

    intro = voca_call.get_intro()

    print("Voca:", intro)

    speak(intro)

    # -----------------------------------------------------
    # Conversation loop
    # -----------------------------------------------------

    while voca_call.is_active:

        # ---------------------------------------------
        # Listen to caller
        # ---------------------------------------------

        user_text = listen()

        if user_text is None:

            speak(
                "Sorry, I didn't catch that. "
                "Could you say it again?"
            )

            continue

        # ---------------------------------------------
        # Check for call ending
        # ---------------------------------------------

        if any(
            word in user_text.lower()
            for word in EXIT_WORDS
        ):

            goodbye_message = (
                "Goodbye! Have a great day."
            )

            print(
                "Voca:",
                goodbye_message
            )

            speak(goodbye_message)

            # -----------------------------------------
            # End call and generate summary
            # -----------------------------------------

            voca_call.end()

            # -----------------------------------------
            # Show call summary
            # -----------------------------------------

            summary = voca_call.get_summary()

            if summary:

                print("\n--- Call Summary ---")

                for key, value in summary.items():
                    print(f"{key}: {value}")

                print("--------------------")

            break

        # ---------------------------------------------
        # Safety / Cedar policy check
        # ---------------------------------------------

        sensitive_action = detect_sensitive_action(
            user_text
        )

        allowed = check_permission(
            sensitive_action
        )

        print(
            f"Policy check -> "
            f"action={sensitive_action}, "
            f"allowed={allowed}"
        )

        # ---------------------------------------------
        # Block unsafe request
        # ---------------------------------------------

        if not allowed:

            ai_response = (
                "I'm sorry, I can't share that information. "
                "Is there anything else I can help you with?"
            )

            print(
                "Voca:",
                ai_response
            )

            speak(ai_response)

            continue

        # ---------------------------------------------
        # Send caller message to YOUR Voca AI
        # ---------------------------------------------

        ai_response = voca_call.process(
            user_text
        )

        # ---------------------------------------------
        # Speak AI response
        # ---------------------------------------------

        print(
            "Voca:",
            ai_response
        )

        speak(ai_response)


# ---------------------------------------------------------
# Start voice application
# ---------------------------------------------------------

if __name__ == "__main__":
    run_conversation()