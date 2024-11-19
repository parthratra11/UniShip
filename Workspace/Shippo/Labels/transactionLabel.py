import http.client
import json
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Replace with your actual Shippo API token
apiKey = os.getenv('SHIPPO_TEST_API')

# Establish connection to the Shippo API
conn = http.client.HTTPSConnection("api.goshippo.com")

# Dummy payload for creating a shipment
payload = json.dumps({
    "address_from": {
        "name": "Shawn Adams",
        "street1": "215 Clayton St.",
        "city": "San Francisco",
        "state": "CA",
        "zip": "94117",
        "country": "US",
        "phone": "+1 555 341 9393",
        "email": "shawn.adams@example.com"
    },
    "address_to": {
        "name": "John Doe",
        "street1": "525 Market St.",
        "city": "San Francisco",
        "state": "CA",
        "zip": "94105",
        "country": "US",
        "phone": "+1 555 341 9394",
        "email": "john.doe@example.com"
    },
    "parcels": [
        {
            "length": "10",
            "width": "5",
            "height": "5",
            "distance_unit": "in",
            "weight": "2",
            "mass_unit": "lb"
        }
    ],
    "async": False
})

# Set headers with Shippo API token and content type
headers = {
    'Content-Type': 'application/json',
    'Authorization': f'ShippoToken {apiKey}'
}

# Send POST request to create a shipment
conn.request("POST", "/shipments/", payload, headers)

# Get the response and print it
res = conn.getresponse()
data = res.read()
response = json.loads(data.decode("utf-8"))

print(response['rates'][0])

# Select the first rate for the transaction (you can add logic for user selection)
selected_rate_id = response['rates'][0]['object_id']

# Prepare the payload for the transaction to create a shipping label
transaction_payload = json.dumps({
  "shipment": response['rates'][0]['shipment'],
  "rate": response['rates'][0]['object_id'],
  "label_file_type": "PDF",
  "async": False
})

# Send POST request to create a transaction
conn.request("POST", "/transactions/", transaction_payload, headers)

# Get the response for the transaction
transaction_res = conn.getresponse()
transaction_data = transaction_res.read()
transaction_response = json.loads(transaction_data.decode("utf-8"))

# Output shipment and transaction details
addressFrom = f'''Sender Details:
{response['address_from']['name']} [{response['address_from']['phone']}, {response['address_from']['email']}]
{response['address_from']['street1']}, {response['address_from']['zip']}
{response['address_from']['city']}, {response['address_from']['state']}, {response['address_from']['country']}'''

addressTo = f'''Receiver Details:
{response['address_to']['name']} [{response['address_to']['phone']}, {response['address_to']['email']}]
{response['address_to']['street1']}, {response['address_to']['zip']}
{response['address_to']['city']}, {response['address_to']['state']}, {response['address_to']['country']}'''

shipmentDetails = f'''Shipment Details:\n'''
for item in response['rates']:
    shipmentDetails += f'''{item['servicelevel']['display_name']}
Cost: {item['amount']} {item['currency']}
Dimensions: {float(response['parcels'][0]['length']):.2f} x {float(response['parcels'][0]['width']):.2f} x {float(response['parcels'][0]['height']):.2f} {response['parcels'][0]['distance_unit']}
Weight: {float(response['parcels'][0]['weight']):.2f} {response['parcels'][0]['mass_unit']}
Estimated Time: {item['estimated_days']} days
Arrives By: {item['arrives_by']}
- {item['duration_terms']}\n
'''

transactionDetails = f'''Transaction Details:
Label URL: {transaction_response['label_url']}
Tracking Number: {transaction_response['tracking_number']}
Status: {transaction_response['status']}
'''

requiredResponse = f'{addressFrom}\n\n{addressTo}\n\n{shipmentDetails}\n{transactionDetails}'

print(requiredResponse)

# Close the connection
conn.close()
