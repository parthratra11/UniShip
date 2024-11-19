import os, requests, json
from dotenv import load_dotenv

load_dotenv()

url = 'https://api.goshippo.com/parcels'

apiKey = os.getenv('SHIPPO_TEST_API')

headers = {
    "Authorization" : f"ShippoToken {apiKey}",
    "Content-Type" : "application/json"
}

response = requests.get(url, headers=headers)
reponseData = response.json()

print(reponseData)
