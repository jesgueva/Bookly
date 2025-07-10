import os
from typing import List

# For now, simply log emails instead of sending them via SendGrid. This prevents
# failures in development environments where the SendGrid API key may be
# missing and avoids the external dependency while we iterate on core
# functionality.

FROM_EMAIL = os.getenv("BOOKLY_FROM_EMAIL", "no-reply@bookly.example.com")


def send_email(to_emails: List[str], subject: str, content: str) -> None:
    """Log the email that would be sent.

    This is a placeholder implementation that prints the email details to the
    console. Replace with a real email service (e.g. SendGrid) when ready.
    """

    print("[Email] --- BEGIN EMAIL ---")
    print(f"From: {FROM_EMAIL}")
    print(f"To: {', '.join(to_emails)}")
    print(f"Subject: {subject}")
    print("Content:")
    print(content)
    print("[Email] --- END EMAIL ---") 