import speech_recognition as sr
import pyttsx3

recognizer = sr.Recognizer()

with sr.Microphone() as source:
    print("Speak something...")
    audio = recognizer.listen(source)

print("Audio captured!")

text = recognizer.recognize_google(audio)

print("You said:", text)

engine = pyttsx3.init()
engine.say("Hi, I am Voca, your AI voice assistant.")

engine.runAndWait()