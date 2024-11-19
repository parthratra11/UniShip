import os
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

def authenticateGmailAPI():
    SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send']

    creds = None

    # Load token.json if it exists to avoid re-authenticating
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    # If credentials are not available or invalid, prompt user to authenticate
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for future runs
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    
    # Return the Gmail API service instance
    service = build('gmail', 'v1', credentials=creds)
    return service

if __name__ == "__main__":
    service = authenticateGmailAPI()
    print(service)