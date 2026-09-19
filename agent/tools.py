from strands import tool


# Current profile used by the active Voca call.
# This will be set by the backend before processing a call.
CURRENT_PROFILE = {}


def set_profile(profile: dict) -> None:
    """Set the profile for the current Voca call."""
    global CURRENT_PROFILE
    CURRENT_PROFILE = profile or {}


@tool
def get_delivery_info() -> str:
    """
    Get the user's configured delivery information.

    Use this tool only when the caller asks for delivery,
    location, address, gate, or delivery instructions.
    """

    delivery = CURRENT_PROFILE.get("delivery", {})

    location = delivery.get("location")
    instructions = delivery.get("instructions")

    if not location and not instructions:
        return (
            "No delivery location or delivery instructions "
            "are currently configured for this user."
        )

    result = []

    if location:
        result.append(f"Delivery location: {location}")

    if instructions:
        result.append(f"Delivery instructions: {instructions}")

    return "\n".join(result)


@tool
def get_job_profile() -> str:
    """
    Get the user's configured professional information.

    Use this tool only when a recruiter or professional caller
    asks about the user's skills, roles, experience, or resume.
    """

    job = CURRENT_PROFILE.get("job", {})

    resume = job.get("resume")
    details = job.get("details", {})

    if not resume and not details:
        return (
            "No professional profile information "
            "is currently configured for this user."
        )

    result = []

    if resume:
        result.append(f"Resume: {resume}")

    if details:
        result.append(f"Professional details: {details}")

    return "\n".join(result)