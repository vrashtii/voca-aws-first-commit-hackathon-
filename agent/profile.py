# Temporary user-configured Voca agent profile
#
# This is only for local development.
# Later, this information will come from the FastAPI + SQLite backend.

AGENT_PROFILE = {
    "user_name": "Vrashti",

    "purposes": [
        "delivery",
        "job",
        "personal",
        "receptionist",
        "order_taking",
        "appointment",
        "customer_support"
    ],

    "delivery": {
        "location": None,
        "instructions": None
    },

    "job": {
        "resume": None,
        "details": {}
    },

    "receptionist": {
        "business_name": None,
        "business_hours": None,
        "services": []
    },

    "order_taking": {
        "business_name": None,
        "menu": []
    }
}