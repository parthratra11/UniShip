import http.client, json, os, requests
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

# Replace with your actual Shippo API token
api_token = os.getenv('SHIPPO_TEST_API')

url = 'https://api.goshippo.com/shipments'

headers = {
  'Content-Type': 'application/json',
  'Authorization': f'ShippoToken {api_token}'
}

body = json.dumps({
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

# ! INTERNATIONAL SHIPPING NOT WORKING YET
# body = json.dumps({
#   "address_from": {
#     "name": "Shreya Khanna",
#     "street1": "B-1, Nehru Place",
#     "city": "New Delhi",
#     "state": "DL",
#     "zip": "110019",
#     "country": "IN",
#     "phone": "+91 98765 43210",
#     "email": "shreya.khanna@example.com"
#   },
#   "address_to": {
#     "name": "Soy Crayon",
#     "street1": "525 Market St.",
#     "city": "San Francisco",
#     "state": "CA",
#     "zip": "94105",
#     "country": "US",
#     "phone": "+1 555 341 9394",
#     "email": "soy.crayon@example.com"
#   },
#   "parcels": [
#     {
#       "length": "10",
#       "width": "5",
#       "height": "5",
#       "distance_unit": "in",
#       "weight": "5",
#       "mass_unit": "lb"
#     }
#   ],
#   "async": False
# })

# Set headers with Shippo API token and content type
# ! CREATE A CUSTOM SHIPMENT USING POST, THEN GET THE DETAILS
# ! CREATING A SUGGESTION-MODEL SHIPMENT SERVICE CHOOSING OPTION 
# ! CREATING THE REQUIRED LABELS BASED ON THE CHOSEN SHIPMENT

# requests.post(url, headers=headers, data=json.dumps(body))

rawResponse = requests.get(url, headers=headers)

if rawResponse.status_code != 200:
    print("Error:", rawResponse.text)
    exit()

tempResponse = rawResponse.json()['results']

senderAddressDict = dict(json.loads(body)['address_from'])
recipientAddressDict = dict(json.loads(body)['address_to'])

senderAddress = (senderAddressDict['name'].lower(), senderAddressDict['email'])
recipientAddress = (recipientAddressDict['name'].lower(), recipientAddressDict['email'])

requiredRates = 0
for rateCount in range(len(tempResponse)):
   tempSenderAddressDict = tempResponse[rateCount]['address_from']
   tempRecipientAddressDict = tempResponse[rateCount]['address_to']

   tempSenderAddress = (tempSenderAddressDict['name'].lower(), tempSenderAddressDict['email'])
   tempRecipientAddress = (tempRecipientAddressDict['name'].lower(), tempRecipientAddressDict['email'])

   if senderAddress == tempSenderAddress and recipientAddress == tempRecipientAddress:
      requiredRates = rateCount

response = tempResponse[requiredRates]
addressFrom = f'''Sender Details:
{response['address_from']['name']} [{response['address_from']['phone']}, {response['address_from']['email']}, {response['address_from']['company']}]
{response['address_from']['street1']} {response['address_from']['street2']} {response['address_from']['street3']} {response['address_from']['street_no']}, {response['address_from']['zip']}
{response['address_from']['city']}, {response['address_from']['state']}, {response['address_from']['country']}'''

addressTo = f'''Receiver Details:
{response['address_to']['name']} [{response['address_to']['phone']}, {response['address_to']['email']}, {response['address_to']['company']}]
{response['address_to']['street1']} {response['address_to']['street2']} {response['address_to']['street3']} {response['address_to']['street_no']}, {response['address_to']['zip']}
{response['address_to']['city']}, {response['address_to']['state']}, {response['address_to']['country']}'''

shipmentDetails = f'''Shipment Details:\n'''
for itemCount in range(len(response['rates'])):
  item = response['rates'][itemCount]
  shipmentDetails += f'''Option: {itemCount}
{item['servicelevel']['display_name']}
Cost: {item['amount']} {item['currency']}
Dimensions : {float(response['parcels'][0]['length']):.2f} x {float(response['parcels'][0]['width']):.2f} x {float(response['parcels'][0]['height']):.2f} {response['parcels'][0]['distance_unit']}
Weight: {float(response['parcels'][0]['length']):.2f} {response['parcels'][0]['mass_unit']}
Ordered On: {datetime.strptime(response['shipment_date'], "%Y-%m-%dT%H:%M:%S.%fZ").date().strftime('%d-%m-%Y')}
Estimated Time: {item['estimated_days']} days
Arrives By: {item['arrives_by']}
- {item['duration_terms']}\n
'''

# shipmentStatus = f'Shipment Status: {response['status']}'
# requiredResponse = f'{addressFrom}\n\n{addressTo}\n\n{shipmentDetails}\n{shipmentStatus}'

# requiredResponse = f'{addressFrom}\n\n{addressTo}\n\n{shipmentDetails}'
requiredResponse = f'{addressFrom}\n\n{addressTo}'

#* print(requiredResponse)

# print(response['rates'])

for rateCount in range(len(response['rates'])):
   rate = response['rates'][rateCount]

   print(f'''Shipment Option: {rateCount + 1}
Service Level: {rate['servicelevel']['display_name']}
Cost: {rate['amount']} {rate['currency']}
Estimated Delivery Days: {rate['estimated_days']}
{f"Arrival Time: {rate['arrives_by']} {'AM' if int(rate['arrives_by'][:2]) > 12 else 'PM'}" if rate['arrives_by'] else 'Arrival Time: Unspecified'}
{rate['duration_terms']}''')
   print('---' * 30)
