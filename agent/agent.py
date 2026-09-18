from strands import Agent
from strands.models.ollama import OllamaModel

from prompts import VOCA_SYSTEM_PROMPT
from tools import get_delivery_info,get_job_profile
from profile import AGENT_PROFILE
from capabilities import get_capabilities 


# Load user information from the agent profile
user_name = AGENT_PROFILE["user_name"]

delivery = AGENT_PROFILE.get("delivery", {})

delivery_location = delivery.get("location", "")
delivery_instructions = delivery.get("instructions", "")


# Get the purposes enabled for this Voca agent
purposes = AGENT_PROFILE.get("purposes", [])

capabilities = get_capabilities(purposes)

purpose_text = ", ".join(purposes) if purposes else "general conversations"

capability_text = (
    ", ".join(capabilities)
    if capabilities
    else "basic conversation"
)


# Create Voca's system prompt using the configured profile
system_prompt = VOCA_SYSTEM_PROMPT.format(
    user_name=user_name,
    delivery_location=delivery_location,
    delivery_instructions=delivery_instructions
)

# Tell the agent which capabilities are currently enabled
system_prompt += f"""

==================================================
ENABLED CAPABILITIES
==================================================

This Voca agent is currently configured to handle:

{purpose_text}
The capabilities currently available to this agent are:

{capability_text}

These are the user's selected purposes.

Do not assume that every possible capability is enabled.

For requests related to an enabled purpose, try to handle them
independently when safe and authorized.

For a purpose that is NOT enabled or for which no relevant
information/tool is available, do not pretend that you can perform
actions you cannot actually perform.

You may still have a normal conversation about any topic.
"""

# Local Ollama model
model = OllamaModel(
    host="http://localhost:11434",
    model_id="llama3.1"
)


# Create Voca agent
agent = Agent(
    model=model,
    system_prompt=system_prompt,
    tools=[get_delivery_info,get_job_profile],
    callback_handler=None
)


# Test Voca locally
if __name__ == "__main__":

    print("Voca Agent is ready! Type 'exit' to end the call.")

    while True:

        caller_input = input("\nCaller: ")

        if caller_input.lower() in ["exit", "quit"]:
            print("Call ended.")
            break

        response = agent(caller_input)

        print(f"\nVoca: {response}")