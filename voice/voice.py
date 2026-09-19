import os
import sys

import sounddevice as sd
import speech_recognition as sr
import pyttsx3

from agent import call_ai

sys.path.append(os.path.join(os.path.dirname(__file__), "..", "policies"))
from policy_check import check_permission


def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()


def listen(duration=6, fs=16000):
    """Record from the mic with sounddevice and
    run it through Google's speech recognizer.
    Returns None if nothing understandable was heard.
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


EXIT_WORDS = [
    "bye",
    "goodbye",
    "stop",
    "exit",
    "end call"
]


def run_conversation():

    speak(
        "Hi, I am Voca, your AI voice assistant. How can I help you?"
    )

    conversation_history = []

    while True:

        user_text = listen()

        if user_text is None:

            speak(
                "Sorry, I didn't catch that. Could you say it again?"
            )

            continue

        if any(
            word in user_text.lower()
            for word in EXIT_WORDS
        ):

            speak(
                "Goodbye! Have a great day."
            )

            break

        # AI understands and responds
        ai_response, sensitive_action = call_ai(
            conversation_history,
            user_text
        )

        # Cedar-style policy check
        if not check_permission(sensitive_action):

            print(
                f"Policy check -> action={sensitive_action}, "
                "allowed=False (BLOCKED)"
            )

            ai_response = (
                "I'm sorry, I can't share that information. "
                "Is there anything else I can help you with?"
            )

        else:

            print(
                f"Policy check -> action={sensitive_action}, "
                "allowed=True"
            )

        # Keep conversation context
        conversation_history.append(
            {
                "role": "user",
                "content": user_text
            }
        )

        conversation_history.append(
            {
                "role": "assistant",
                "content": ai_response
            }
        )

        # Speak AI response
        print("AI response:", ai_response)

        speak(ai_response)


if __name__ == "__main__":
    run_conversation()