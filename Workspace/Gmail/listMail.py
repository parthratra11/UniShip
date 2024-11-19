import getToken
from googleapiclient.errors import HttpError

def list_messages(service, messageCount = 10, user_id='me', query=''):
    """List messages in the user's account matching a query."""
    try:
        results = service.users().messages().list(userId=user_id, q=query).execute()
        messages = results.get('messages', [])

        if not messages:
            print('No messages found.')
            return

        print('Messages:')
        for message in messages[:messageCount]:  # Show only the first 10 messages
            msg = service.users().messages().get(userId=user_id, id=message['id']).execute()
            # print(msg)
            # print(f"Message snippet: {msg['snippet']}")
            headers = msg.get('payload', {}).get('headers', [])
            
            # Extract 'From', 'To', and 'Subject' from headers
            subject = next((header['value'] for header in headers if header['name'] == 'Subject'), 'No Subject')
            from_address = next((header['value'] for header in headers if header['name'] == 'From'), 'No Sender')
            to_address = next((header['value'] for header in headers if header['name'] == 'To'), 'No Recipient')

            print(f"From: {from_address} | To: {to_address} | Subject: {subject}")
            print(f"Message snippet: {msg['snippet']}\n")

    except HttpError as error:
        print(f'An error occurred: {error}')

if __name__ == "__main__":
    service = getToken.authenticateGmailAPI()

    list_messages(service, 2, 'me', 'mosh')