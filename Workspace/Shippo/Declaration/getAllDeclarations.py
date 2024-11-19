import http.client, requests
from datetime import datetime
import json
import os
from dotenv import load_dotenv

load_dotenv()
api_token = os.getenv('SHIPPO_TEST_API')

# customDeclarationID = '29b4d311f4784b3fa6a72ed0238ba2ab'

url = f'http://api.goshippo.com/customs/declarations/'

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'ShippoToken {api_token}'
}

response = requests.get(url, headers=headers)
for i in response.json()['results']:
    print(i['invoice'], '\n')