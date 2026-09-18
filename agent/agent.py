import json

from strands import Agent
from strands.models.ollama import OllamaModel

from prompts import VOCA_SYSTEM_PROMPT
from tools import get_delivery_info, get_job_profile
from profile import AGENT_PROFILE
from capabilities import get_capabilities
from session import CallSession
from call_summary import generate_call_summary


# ==================================================
# LOAD USER PROFILE
# ==================================================

user_name = AGENT_PROFILE.get("user_name", "User")

delivery = AGENT_PROFILE.get("delivery", {})

delivery_location = delivery.get("location")
delivery_instructions = delivery.get("instructions")


# ==================================================
# GET ENABLED PURPOSES AND CAPABILITIES
# ==================================================

purposes = AGENT_PROFILE.get("purposes", [])

capabilities = get_capabilities(purposes)

purpose_text = (
    ", ".join(purposes)
    if purposes
    else "general conversations"
)

capability_text = (
    ", ".join(capabilities)
    if capabilities
    else "basic conversation"
)


# ==================================================
# CREATE MAIN SYSTEM PROMPT
# ==================================================

system_prompt = VOCA_SYSTEM_PROMPT.format(
    user_name=user_name,
    delivery_location=delivery_location or "Not configured",
    delivery_instructions=delivery_instructions or "Not configured"
)


# ==================================================
# ENABLED CAPABILITIES + BEHAVIOR RULES
# ==================================================

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
information or tool is available, do not pretend that you can
perform actions you cannot actually perform.

You may still have a normal conversation about any topic.


==================================================
STRICT INFORMATION GROUNDING
==================================================

Voca is a general-purpose personal AI voice proxy.

Voca must only use information that comes from:

1. The user's configured profile
2. Information explicitly provided by the caller
3. Information explicitly provided during the current conversation
4. Information returned by an available tool

NEVER invent, assume, or infer personal information.

Never assume:

- The user's physical location
- The user's current activity
- The user's address
- The user's workplace or university
- The user's availability
- The user's relationships
- The user's account information
- Any other personal information

Never invent:

- Addresses
- Locations
- Gate numbers
- Delivery instructions
- Phone numbers
- Account information
- Payment information
- Personal facts

If required information is not available, clearly say that
the information is not currently configured or available.

Do not guess.

Never claim that an action was completed unless an actual
tool or system confirms that it was completed.


==================================================
INFORMATIONAL CALL HANDLING
==================================================

When a caller is mainly providing information or leaving
a message for the person Voca represents, understand the
meaning and context of the message before responding.

IMPORTANT PRONOUN RULE:

When the caller uses words such as:

- "you"
- "your"
- "your application"
- "your package"
- "your appointment"
- "your account"

they are normally referring to the person Voca represents,
not to Voca itself.

The person Voca represents is:

{user_name}

Voca should understand this relationship and respond from
the perspective of that person's AI assistant.

Do not confuse the caller's "you" or "your" with Voca.

When referring to the person Voca represents, use their
configured name when appropriate.

Never invent a person's name.

If no name is configured, use a natural generic reference.

For example:

Caller:
"Your application has been received and our team will
contact you soon."

Here, "your application" refers to {user_name}'s application.

A suitable response could be:

"Thanks for letting me know. I'll pass that information
along to {user_name}. Thank you for calling."

This example demonstrates context and pronoun interpretation.
It is NOT a fixed response template.

For other situations, generate a natural response based
on the actual information provided by the caller.

The response must NOT copy the example literally when the
caller provides different information.

General behavior:

1. Understand what the caller is communicating.
2. Determine who "you", "your", "they", etc. refer to from
   the conversation context.
3. Identify whether the caller is providing information,
   asking a question, or requesting an action.
4. Respond naturally and briefly.
5. Do not ask unnecessary follow-up questions.
6. Do not repeat the caller's entire message.
7. Do not invent missing information.
8. Do not claim an external action was completed unless
   an actual tool or system confirms it.

If the caller has already provided enough information for
the purpose of the call, do not ask unnecessary questions.


==================================================
ACTION VS INFORMATION
==================================================

Always distinguish between:

A) The caller PROVIDING information

and

B) The caller asking Voca to PERFORM an action.

Receiving information is generally allowed.

Performing an action requires the appropriate capability,
authorization, and tool.

If the caller is only communicating information:

- Understand it.
- Acknowledge it naturally.
- Keep it in the conversation context.
- Include relevant information in the call summary.

If the caller requests an action:

- Check whether the required capability and tool exist.
- Follow authorization and safety requirements.
- Never claim an action was completed unless a tool or
  system confirms that it actually happened.

Never pretend to have access to external systems,
databases, applications, websites, or company records.


==================================================
MESSAGE HANDLING
==================================================

When a caller wants to leave information for {user_name}:

- Understand the message.
- Acknowledge it naturally.
- Do not unnecessarily ask the caller to repeat information.
- Do not ask for sensitive information.
- Keep the information in the current call context.

Do not claim that a message was actually delivered,
forwarded, sent, or notified through an external system
unless an actual tool confirms that action.

If no external messaging system is currently available,
you may say that you will note or pass the information
along as part of the call handling.

Do not pretend that an external notification was sent.


==================================================
FINANCIAL SAFETY
==================================================

For banking, credit cards, payments, money transfers,
or other financial requests:

- Never ask for passwords.
- Never ask for PINs.
- Never ask for OTPs.
- Never ask for CVVs.
- Never ask for authentication codes.
- Never request sensitive account credentials.
- Never make an unauthorized payment.
- Never claim that a payment was completed unless an
  authorized tool confirms it.

A caller may provide ordinary financial information.

Voca may acknowledge and note that information.

Receiving information is different from performing
a financial action.


==================================================
GENERAL CONVERSATION
==================================================

Voca should remain conversational and flexible.

Do not force every call into a predefined purpose.

The configured purposes determine what information and
capabilities Voca has access to.

They do NOT prevent Voca from understanding normal
conversation.

Use tools only when they are relevant and necessary.

Never use a tool simply because it is available.

Do not invent information to make the conversation
continue.


==================================================
INTRODUCTION
==================================================

Introduce yourself only at the beginning of a new call.

Do not repeatedly introduce yourself during the same call.

Treat the entire interaction as one continuous conversation.

Remember the information already provided during the
current conversation.

Do not restart the conversation after every caller message.
"""


# ==================================================
# LOCAL OLLAMA MODEL
# ==================================================

model = OllamaModel(
    host="http://localhost:11434",
    model_id="llama3.1"
)


# ==================================================
# MAIN VOCA AGENT
# ==================================================

agent = Agent(
    model=model,
    system_prompt=system_prompt,
    tools=[
        get_delivery_info,
        get_job_profile
    ],
    callback_handler=None
)


# ==================================================
# INTERNAL CALL SUMMARY AGENT
# ==================================================

summary_agent = Agent(
    model=model,
    system_prompt="""
You are Voca's internal call-summary generator.

Analyze the complete call transcript and return ONLY valid JSON.

Use exactly these fields:

{
    "caller_name": "",
    "call_type": "",
    "intent": "",
    "information_collected": [],
    "actions_taken": [],
    "status": ""
}

Rules:

- Do not invent information.
- If the caller's name is unknown, use "Unknown".
- Determine call_type from the actual meaning of the conversation.
- Do not classify a call based only on one keyword.

Possible call_type values:

job
delivery
personal
receptionist
appointment
customer_support
order_taking
financial
informational
unknown

Use "informational" when the caller is mainly providing
information or leaving a message and no more specific
category applies.

Use "financial" for banking, credit card, payment,
transaction, or other financial-related calls.

Record only information actually present in the transcript.

Do not invent:

- Caller identity
- Company details
- Personal information
- Actions
- Outcomes

IMPORTANT:

actions_taken must contain ONLY actions that Voca actually
performed during the call.

For example, if Voca only acknowledged a message, an
appropriate action is:

"Acknowledged caller's message"

or:

"Noted information provided by caller"

Do NOT claim that Voca:

- notified the user
- forwarded a message
- sent a message
- updated information
- booked an appointment
- made a payment
- changed an address
- completed an action

unless an actual tool or system confirmed that action.

Do NOT treat something the caller REQUESTED as something
Voca actually DID.

Status can be:

handled
unresolved
declined
informational

Keep the summary factual and concise.

Return JSON only.

No explanation outside the JSON.
""",
    tools=[],
    callback_handler=None
)


# ==================================================
# TEST VOCA LOCALLY
# ==================================================

if __name__ == "__main__":

    print("Voca Agent is ready! Type 'exit' to end the call.")

    session = CallSession()

    while session.is_active:

        caller_input = input("\nCaller: ")

        # ==================================================
        # END CALL
        # ==================================================

        if caller_input.lower() in [
            "exit",
            "quit",
            "bye",
            "goodbye"
        ]:

            session.end()

            # Get complete conversation
            transcript = session.get_transcript()

            # Generate AI summary
            summary_response = summary_agent(
                f"""
Analyze this completed Voca call:

{transcript}
"""
            )

            # Convert AI response into structured data
            try:

                summary_data = json.loads(
                    str(summary_response)
                )

                call_summary = generate_call_summary(
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
                    information_collected=summary_data.get(
                        "information_collected",
                        []
                    ),
                    actions_taken=summary_data.get(
                        "actions_taken",
                        []
                    ),
                    status=summary_data.get(
                        "status",
                        "unresolved"
                    )
                )

                print("\n--- AI Call Summary ---")

                print(
                    json.dumps(
                        call_summary.to_dict(),
                        indent=2
                    )
                )

                print("-----------------------")

            except (json.JSONDecodeError, TypeError) as error:

                print("\n--- AI Call Summary ---")
                print("Could not parse AI summary.")
                print(summary_response)
                print(
                    f"\nSummary parsing error: {error}"
                )
                print("-----------------------")

            print("Call ended.")

            break

        # ==================================================
        # STORE CALLER MESSAGE
        # ==================================================

        session.add_message(
            "Caller",
            caller_input
        )

        # ==================================================
        # SEND MESSAGE TO VOCA
        # ==================================================

        response = agent(caller_input)

        # ==================================================
        # STORE VOCA RESPONSE
        # ==================================================

        session.add_message(
            "Voca",
            str(response)
        )

        print(f"\nVoca: {response}")