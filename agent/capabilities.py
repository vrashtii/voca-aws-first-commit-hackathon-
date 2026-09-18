# Maps each Voca purpose to the capabilities it can use.

PURPOSE_CAPABILITIES = {
    "delivery": [
        "delivery_information"
    ],

    "job": [
        "professional_profile"
    ],

    "personal": [
        "message_taking"
    ],

    "receptionist": [
        "business_information"
    ],

    "order_taking": [
        "menu_information",
        "order_collection"
    ],

    "appointment": [
        "appointment_information"
    ],

    "customer_support": [
        "service_information"
    ]
}


def get_capabilities(purposes: list[str]) -> list[str]:
    """
    Return all capabilities enabled by the selected purposes.
    """

    capabilities = []

    for purpose in purposes:
        capabilities.extend(
            PURPOSE_CAPABILITIES.get(purpose, [])
        )

    return list(dict.fromkeys(capabilities))