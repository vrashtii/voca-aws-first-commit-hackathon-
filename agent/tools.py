from strands import tool

from profile import AGENT_PROFILE


@tool
def get_delivery_info() -> str:
    """
    Get the user's configured delivery location and delivery instructions.

    Use this tool when a caller needs delivery or location information.
    """

    delivery = AGENT_PROFILE.get("delivery", {})

    location = delivery.get("location")
    instructions = delivery.get("instructions")

    if not location and not instructions:
        return "No delivery information is currently configured."

    return (
        f"Delivery location: {location}\n"
        f"Delivery instructions: {instructions}"
    )
@tool
def get_job_profile() -> str:
    """
    Get the user's configured professional and job-seeking information.

    Use this tool when a recruiter or professional caller asks about
    the user's skills, preferred roles, experience, or resume.
    """

    job = AGENT_PROFILE.get("job", {})

    resume = job.get("resume")
    details = job.get("details", {})

    if not resume and not details:
        return "No professional profile information is currently configured."

    result = []

    if resume:
        result.append(f"Resume: {resume}")

    if details:
        result.append(f"Professional details: {details}")

    return "\n".join(result)