import os, requests, json
from dotenv import load_dotenv

load_dotenv()

url = 'https://api.goshippo.com/parcels'

apiKey = os.getenv('SHIPPO_TEST_API')

headers = {
  "Authorization" : f"ShippoToken {apiKey}",
  "Content-Type" : "application/json"
}

body = {
  "length": 5,
  "width": 5,
  "height": 5,
  "distance_unit": "cm",
  "weight": 2,
  "mass_unit": "lb",
  "template": "",
  "metadata": "Customer ID 12345",
  "extra": {"packaging_material" : "metal packaging"}
}

response = requests.post(url, headers=headers, data=json.dumps(body))
reponseData = response.json()

print(reponseData)