import http.client, requests
from datetime import datetime
import json
import os
from dotenv import load_dotenv

load_dotenv()
api_token = os.getenv('SHIPPO_TEST_API')

url = 'http://api.goshippo.com/customs/declarations'
# url = '/customs/declarations'

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'ShippoToken {api_token}'
}

# ! contents_explanation WOULD LIST ALL THE REQUIRED INFORMATION FOR INTERNATIONAL EXPORT IN A STRUCTURED MANNER
body = json.dumps({
  "contents_type": "MERCHANDISE",
  "contents_explanation": "Indian Handicrafts", # !
  "non_delivery_option": "RETURN",
  "certify": True,
  "certify_signer": "Shrey Khanna",
  "incoterm": "DDP",
  "items": [
    {
      "description": "Handcrafted Wooden Sculptures",
      "quantity": 10,
      "net_weight": "8",
      "mass_unit": "kg",
      "value_amount": "500",
      "value_currency": "INR",
      "tariff_number": "4420.90.00",
      "origin_country": "IN"
    }
  ],
  "exporter_reference": "EXP-123456-IN",
  "importer_reference": "IMP-654321-US",
  "address_importer": {
    "name": "John Doe",
    "street1": "525 Market St.",
    "city": "San Francisco",
    "state": "CA",
    "zip": "94105",
    "country": "US",
    "phone": "5553419394",
    "email": "john.doe@example.com"
  },
  "invoice": "INV-781456",
  "commercial_invoice": True,
  "license": "LIC-987654",
  "certificate": "CERT-456789",
  "notes": "Handle with care; fragile item",
  "eel_pfc": "",
  "aes_itn": "X20241103456",
  "disclaimer": "Customs fees may apply upon import",
  "duties_payor": {
    "account": "DUTY-ACCOUNT-1234",
    "type": "SENDER"
  },
  "invoiced_charges": {
    "total_shipping": 50,
    "total_taxes": 5,
    "total_duties": 15,
    "other_fees": 2,
    "currency": "USD"
  },
  "exporter_identification": {
    "pan": "PAN-ABCD1234E", 
    "vat_number": "GST-123456789",
    "tax_id": {
        "type": "EIN",
        "number": "987654321"
    }
  },
  "is_vat_collected": False
})

# rawResponse = requests.post(url, headers=headers, data=json.loads(body))
rawResponse = requests.post(url, headers=headers, json=body)
response = rawResponse.json()

# ! POST NOT WORKING, DECLARATIONS ARE MADE THROUGH POSTMAN

for i in response['results']:
    if i['invoice'] == json.loads(body)['invoice']:
        print(i['object_id'])