"""
Day 3 - Universal safety policy checker.
Mirrors the rules written in cedar/policy.cedar.

This is deliberately conversation-type-agnostic: no matter whether
the call is a delivery, a job interview, a recruiter call, or
anything else, these actions are ALWAYS denied. Everything else the
AI wants to say is allowed by default - the AI itself decides what
to talk about, this file only blocks a fixed, small set of unsafe
actions.
"""

# Actions that must NEVER be allowed, regardless of conversation type.
ALWAYS_DENY = {
    "share_otp",
    "share_payment_info",
    "share_private_info",
    "share_financial_info",
    "share_password",
}


def check_permission(action):
    """
    action: what the agent wants to do, e.g. 'share_otp'.
    Returns True -> ALLOW, False -> DENY.

    Anything not in ALWAYS_DENY is allowed - the AI is free to talk
    about any topic; this is just a safety net for a short, fixed
    list of sensitive actions.
    """
    if action is None:
        return True
    return action not in ALWAYS_DENY


if __name__ == "__main__":
    print("share_otp ->", check_permission("share_otp"))                 # False
    print("share_payment_info ->", check_permission("share_payment_info"))  # False
    print("None (normal talk) ->", check_permission(None))               # True
    print("anything_else ->", check_permission("anything_else"))         # True
