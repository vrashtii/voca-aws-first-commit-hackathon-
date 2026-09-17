from strands import Agent
from strands.models.ollama import OllamaModel

from prompts import VOCA_SYSTEM_PROMPT


# Temporary user profile
# Later this will come from the FastAPI backend/database.
USER_PROFILE = {
    "name": "Vrashti",
    "delivery_location": "Amity University Madhya Pradesh",
    "delivery_instructions": "Use the main gate and ask for the security desk."
}


model = OllamaModel(
    host="http://localhost:11434",
    model_id="llama3.2:3b"
)


system_prompt = VOCA_SYSTEM_PROMPT.format(
    user_name=USER_PROFILE["name"],
    delivery_location=USER_PROFILE["delivery_location"],
    delivery_instructions=USER_PROFILE["delivery_instructions"]
)


agent = Agent(
    model=model,
    system_prompt=system_prompt
)


if __name__ == "__main__":
    print("Voca Agent is ready! Type 'exit' to end the call.")

    while True:
        caller_input = input("\nCaller: ")

        if caller_input.lower() in ["exit", "quit"]:
            print("Call ended.")
            break

        response = agent(caller_input)

        print(f"\nVoca: {response}")