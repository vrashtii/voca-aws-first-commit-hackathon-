from agent.voice_interface import VocaCall


def process_with_voca(
    user_name: str,
    profile_data: dict,
    caller_message: str
) -> dict:
    voca_call = VocaCall(
        user_name=user_name,
        profile_data=profile_data
    )

    response = voca_call.process(caller_message)

    # Generate the call summary after processing the call
    voca_call.end()

    return {
        "response": response,
        "transcript": voca_call.get_transcript(),
        "information": voca_call.get_information(),
        "actions": voca_call.get_actions(),
        "summary": voca_call.get_summary(),
    }