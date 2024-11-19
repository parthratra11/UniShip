import http.client, requests
from datetime import datetime
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_token = os.getenv('SHIPPO_TEST_API')

# Shippo API endpoint for creating shipments
url = '/shipments'

# ! INTERNATIONAL SHIPPING NOT WORKING YET
body = json.dumps({
    "object_purpose": "PURCHASE",
    "address_from": {
        "name": "Shrey Khanna",
        "street1": "123 Connaught Place",
        "city": "New Delhi",
        "state": "DL",
        "zip": "110001",
        "country": "IN",
        "phone": "9876543210",
        "email": "shrey.khanna@example.com"
    },
    "address_to": {
        "name": "John Doe",
        "street1": "525 Market St.",
        "city": "San Francisco",
        "state": "CA",
        "zip": "94105",
        "country": "US",
        "phone": "5553419394",
        "email": "john.doe@example.com"
  },

    "parcels": [
        {
            "length": "10",
            "width": "5",
            "height": "5",
            "distance_unit": "in",
            "weight": "5",
            "mass_unit": "lb"
        }
    ],
    "custom_declaration": "ff196e9b174647f18ded3e586c438cc7",
    "async": False
})

# Set up the connection
conn = http.client.HTTPSConnection("api.goshippo.com")

# Define headers, including authorization
headers = {
    'Content-Type': 'application/json',
    'Authorization': f'ShippoToken {api_token}'
}

# Send the POST request
conn.request("POST", url, body, headers)

# Get the response
rawResponse = conn.getresponse()
response = json.loads(rawResponse.read().decode('utf-8'))

# print(response)

# Decode the response
# print(rawResponse.status, response)

addressFrom = f'''Sender Details:
{response['address_from']['name']} [{response['address_from']['phone']}, {response['address_from']['email']}, {response['address_from']['company']}]
{response['address_from']['street1']} {response['address_from']['street2']} {response['address_from']['street3']} {response['address_from']['street_no']}, {response['address_from']['zip']}
{response['address_from']['city']}, {response['address_from']['state']}, {response['address_from']['country']}'''

addressTo = f'''Receiver Details:
{response['address_to']['name']} [{response['address_to']['phone']}, {response['address_to']['email']}, {response['address_to']['company']}]
{response['address_to']['street1']} {response['address_to']['street2']} {response['address_to']['street3']} {response['address_to']['street_no']}, {response['address_to']['zip']}
{response['address_to']['city']}, {response['address_to']['state']}, {response['address_to']['country']}'''

print(f'\n{addressFrom}\n\n{addressTo}\n')

# print(response['rates'])
flag = False
if response['rates'] == []:
    addressFrom, addressTo = addressTo, addressFrom
    body = dict(json.loads(body))
    body["address_from"], body["address_to"] = body["address_to"], body["address_from"]
    body = json.dumps(body)

    conn.request("POST", url, body, headers)
    rawResponse = conn.getresponse()
    response = json.loads(rawResponse.read().decode('utf-8'))

    flag = True

    # print(response['rates'])

# rates = response['rates']
# if not rates:
#     print('No Rates available!')
#     exit()

# bestRate, bestRateScore = 0, 0

# weightCost = 0.7
# weightTime = 1 - weightCost

# maxCost = max(float(rate['amount']) for rate in rates) or 1
# maxTime = max(int(rate['estimated_days']) if rate['estimated_days'] else 0 for rate in rates) or 1

# for rateCount in range(len(rates)):
#     rate = response['rates'][rateCount]

#     cost = float(rate['amount'] if flag == False else rate['amount_local'])
#     time = int(rate['estimated_days']) if rate['estimated_days'] else 0

#     normalizedCost = 1 - (cost / maxCost) if maxCost > 0 else 0
#     normalizedTime = 1 - (time / maxTime) if maxCost > 0 else 0

#     score = normalizedCost * weightCost + normalizedTime * weightTime

#     if score > bestRateScore:
#         bestRateScore = score
#         bestRate = rateCount

rates = response['rates']
def select_best_shipping_option(rates, weight_cost=0.7, weight_time=0.3):
    if not rates:
        return None

    max_cost = max(float(rate['amount']) for rate in rates)
    max_days = max(int(rate.get('estimated_days', float('inf'))) for rate in rates)

    best_option = None
    best_score = -1  

    for rateCount in range(len(rates)):
        rate = rates[rateCount]
        cost = float(rate['amount'])
        estimated_days = int(rate.get('estimated_days', float('inf')))
        
        normalized_cost = 1 - (cost / max_cost)
        normalized_time = 1 - (estimated_days / max_days)
        
        score = (weight_cost * normalized_cost) + (weight_time * normalized_time)
        
        if score > best_score:
            best_score = score
            best_option = rateCount

    # print(best_option)

    return best_option

#? PRINTS ALL THE AVAILABLE SERVICE/RATE OPTIONS
for rateCount in range(len(rates)):
   rate = rates[rateCount]

   print(f'''Shipment Option: {rateCount + 1}
Service Level: {rate['servicelevel']['display_name']}
Cost: {rate['amount'] if flag == False else rate['amount_local']} {rate['currency'] if flag == False else rate['currency_local']}
Estimated Delivery Days: {rate['estimated_days']}
{f"Arrival Time: {rate['arrives_by']} {'AM' if int(rate['arrives_by'][:2]) > 12 else 'PM'}" if rate['arrives_by'] else 'Arrival Time: Unspecified'}
{rate['duration_terms']}''')
   print('---' * 30)

bestRate = select_best_shipping_option(rates)

rate = rates[bestRate]
print(f'''Shipment Option: {bestRate + 1} (BEST)
Service Level: {rate['servicelevel']['display_name']}
Cost: {rate['amount'] if flag == False else rate['amount_local']} {rate['currency'] if flag == False else rate['currency_local']}
Estimated Delivery Days: {rate['estimated_days']}
{f"Arrival Time: {rate['arrives_by']} {'AM' if int(rate['arrives_by'][:2]) > 12 else 'PM'}" if rate['arrives_by'] else 'Arrival Time: Unspecified'}
{rate['duration_terms']}''')

# ! IMPLEMENT SHIPMENT TRACKING FEATURE
  
# requiredResponse = f'{addressFrom}\n\n{addressTo}\n\n{shipmentDetails}'

# Close the connection
conn.close()