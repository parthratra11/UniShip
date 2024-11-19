import json, os, requests
from dotenv import load_dotenv
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

load_dotenv()

apiKey = os.getenv('SHIPPO_TEST_API')

url = "https://api.goshippo.com/shipments"

headers = {
  'Content-Type': 'application/json',
  'Authorization': f'ShippoToken {apiKey}'
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

response = requests.get(url, headers=headers, data=json.dumps(body))

if response.status_code != 200:
    print("Error:", response.text)
    exit()

responseData = response.json()['results'][0]
# print(responseData)

sender = responseData['address_from']
recipient = responseData['address_to']
serviceType = responseData['rates'][0]['servicelevel']['display_name']

trackingNumber = 'XXXXXXXXXXXX'

pdfFileName = f"shipping_label_{trackingNumber}.pdf"
pdf = canvas.Canvas(pdfFileName, pagesize=letter)
pdf.setTitle("Shipping Label")


pdf.setFont("Helvetica-Bold", 30)
pdf.drawString(100, 750, "SHIPPING LABEL")

pdf.setFont("Helvetica-Bold", 12)
pdf.drawString(100, 720, "Sender's Details:")

pdf.setFont("Helvetica", 12)
pdf.drawString(100, 700, f"{sender['name']}")
pdf.drawString(100, 680, f"{sender['street1']}")
pdf.drawString(100, 660, f"{sender['city']}, {sender['state']}, {sender['country']}, {sender['zip']}")
pdf.drawString(100, 640, f"{sender['phone']}")

pdf.setFont("Helvetica-Bold", 12)
pdf.drawString(100, 600, "Recipient's Details:")

pdf.setFont("Helvetica", 12)
pdf.drawString(100, 580, f"{recipient['name']}")
pdf.drawString(100, 560, f"{recipient['street1']}")
pdf.drawString(100, 540, f"{recipient['city']}, {recipient['state']}, {recipient['country']}, {recipient['zip']}")
pdf.drawString(100, 520, f"{recipient['phone']}")

pdf.setFont("Helvetica-Bold", 12)
pdf.drawString(100, 480, f"Tracking Number: {trackingNumber}")
pdf.drawString(100, 460, f"Service Type: {serviceType}")

pdf.save()
print(f"PDF saved as {pdfFileName}")