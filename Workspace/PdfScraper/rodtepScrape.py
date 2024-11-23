import pdfplumber
import json

def clean_text(text):
    """Clean text by removing unwanted spaces and newlines."""
    return " ".join(text.split()) if text else ""

def extract_data_from_pdf(pdf_path, output_json_path):
    extracted_data = []

    # Open the PDF file
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()

            for table in tables:
                for row in table:
                    if len(row) >= 5:  # Adjust based on actual columns
                        tariff_code = clean_text(row[0])
                        description = clean_text(row[1])
                        uqc = clean_text(row[2])
                        rodtep_rate = clean_text(row[3])
                        cap = clean_text(row[4])

                        extracted_data.append({
                            "Tariff Code": tariff_code,
                            "Description": description,
                            "UQC": uqc,
                            "RoDTEP Rate (%)": rodtep_rate,
                            "Cap (Rs. Per UQC)": cap
                        })

    # Save extracted data to JSON
    with open(output_json_path, 'w', encoding='utf-8') as json_file:
        json.dump(extracted_data, json_file, ensure_ascii=False, indent=4)

    print(f"Data extracted successfully to {output_json_path}")

# Example usage
pdf_path = "Appendix 4RE RoDTEP.pdf"  # Path to the uploaded PDF
output_json_path = "rodtep_data.json"
extract_data_from_pdf(pdf_path, output_json_path)
