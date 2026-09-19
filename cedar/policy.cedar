// Universal safety rules - apply to ANY conversation type
// (delivery, job interview, recruiter call, or anything else).
// These few actions are always forbidden; everything else the
// AI wants to say is allowed by default.

forbid (
    principal,
    action in [
        Action::"share_otp",
        Action::"share_payment_info",
        Action::"share_private_info",
        Action::"share_financial_info",
        Action::"share_password"
    ],
    resource
);
