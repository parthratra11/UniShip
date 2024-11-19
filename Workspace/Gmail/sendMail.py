import getToken, listMail
import base64
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from email.mime.text import MIMEText


def create_message(sender, to, subject, message_text):
    """Create a message for an email."""
    message = MIMEText(message_text)
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {'raw': raw}

def send_message(service, user_id, message):
    """Send an email message."""
    try:
        sent_message = service.users().messages().send(userId=user_id, body=message).execute()
        print(f"Message Id: {sent_message['id']}")
        return sent_message
    except HttpError as error:
        print(f'An error occurred: {error}')

if __name__ == "__main__":
    service = getToken.authenticateGmailAPI()

    email_message = create_message(
        sender='anotheronetobegone@gmail.com',
        to='pranay.rajvanshi@gmail.com',
        subject='Test Subject',
        message_text='This is a test email.'
    )
    # ! FIX SEND MESSAGE    
    # send_message(service, 'me', email_message)

    listMail.list_messages(service=service, messageCount=1, user_id='me', query='')