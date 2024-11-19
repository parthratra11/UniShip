import os, requests, json
from dotenv import load_dotenv

load_dotenv()

apiKey = os.getenv('SHIPPO_TEST_API')
parcelId = '997ff9a354094f6c9959848c8989b023'

url = f'https://api.goshippo.com/parcels/{parcelId}'

headers = {
    "Authorization" : f"ShippoToken {apiKey}",
    "Content-Type" : "application/json"
}

response = requests.get(url, headers=headers)
reponseData = response.json()

print(reponseData)