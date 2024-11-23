import pdfplumber
import json

# Define a function to extract HS codes and RoDTEP rates
def extract_hscode_rodtep(pdf_path):
    data = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            # Extract tables from the page
            tables = page.extract_tables()
            for table in tables:
                for row in table:
                    # Adjust indices as per table structure in the PDF
                    if len(row) >= 3:  # Ensure the row has at least the required columns
                        hs_code = row[0].strip()  # Tariff Item as per CTH
                        rodtep_rate = row[1].strip()  # RoDTEP Rate as %age of FOB value
                        rodtep_cap = row[2].strip()  # RoDTEP Cap (Rs. per UQC)
                        # Append extracted data
                        data.append({
                            "HS Code": hs_code,
                            "RoDTEP Rate (% of FOB Value)": rodtep_rate,
                            "RoDTEP Cap (Rs. per UQC)": rodtep_cap
                        })
    return data

# Path to the PDF file
pdf_path = "rodtepPdf.pdf"

# Extract the data
extracted_data = extract_hscode_rodtep(pdf_path)

# Save extracted data to a JSON file
output_json_path = "hs_code_rodtep.json"
with open(output_json_path, "w") as json_file:
    json.dump(extracted_data, json_file, indent=4)

print(f"Data successfully extracted and saved to {output_json_path}")