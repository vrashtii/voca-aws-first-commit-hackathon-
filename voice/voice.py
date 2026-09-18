import speech_recognition as sr
import pyttsx3
def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

recognizer = sr.Recognizer()

with sr.Microphone() as source:
    print("Speak something...")
    audio = recognizer.listen(source)

print("Audio captured!")

text = recognizer.recognize_google(audio)

print("You said:", text)

speak("Hi, I am Voca, your AI voice assistant.")
response = "I understood your request."
speak(response)