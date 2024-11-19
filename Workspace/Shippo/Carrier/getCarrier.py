import http.client, requests
from datetime import datetime
import json
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('SHIPPO_TEST_API')

carrierID = 'f4f734092cd246339617d0149c0487d6'

url = f'https://api.goshippo.com/carrier_accounts/{carrierID}'

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'ShippoToken {API_KEY}'
}

response = requests.get(url, headers=headers).json()
# for i in response:
#     print(i, ':', response[i])
print(response['account_id'], response['object_owner'])