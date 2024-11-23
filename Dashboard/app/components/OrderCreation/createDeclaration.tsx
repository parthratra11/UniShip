import { decl } from "postcss";
import React from "react";

// ! IMPORT FROM THE JSON FILE INSTEAD OF THIS
const countryCodes = {
  IN: "India",
  US: "United States",
  CA: "Canada",
  GB: "United Kingdom",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  JP: "Japan",
  CN: "China",
  BR: "Brazil",
  ZA: "South Africa",
  RU: "Russia",
  KR: "South Korea",
  MX: "Mexico",
  ES: "Spain",
  NL: "Netherlands",
  SE: "Sweden",
  CH: "Switzerland",
  AE: "United Arab Emirates",
};

const createDeclaration = ({
  formData,
  selectedProduct,
  declaration,
  setDeclaration,
}) => {
  //   console.log(formData);
  //   console.log(selectedProduct);
  //   console.log(declaration);
  //   declaration["contents_type"] = "NIL";
  //   //   declaration = { ...declaration, contents_type: "NIL" };
  //   setDeclaration(declaration);
  //   console.log(declaration);

  //   console.log(formData);
  console.log(formData);

  declaration["contents_explanation"] = selectedProduct["productDescription"];

  declaration["certify_signer"] = formData["shipperAddress"]["contactName"];

  if (typeof declaration["items"] == "string") declaration["items"] = [];
  declaration.items.push({
    description: selectedProduct["name"],
    quantity: formData["quantity"],
    net_weight: selectedProduct["dimensions"]["weight"].toString(),
    mass_unit: selectedProduct["dimensions"]["weightUnit"],
    value_amount: selectedProduct["mrp"].toString(),
    value_currency: selectedProduct["mrpUnit"],
    tariff_number: selectedProduct["hsnCode"],
    origin_country:
      selectedProduct["manufacturingInfo"]["manufacturingCountry"],
  });

  //   declaration["exporter_reference"] = "EXP-221124-IN";
  //   declaration["importer_reference"] = "IMP-221124-US";

  // ! CHANGE IT TO CHECK WHETHER THE COUNTRY MENTIONED IS IN THE VALUE OF THE KEYS
  const exporterCountryCode =
    Object.keys(countryCodes).find(
      (key) => countryCodes[key] === formData["shipperAddress"]["country"]
    ) || "NA"; // Fallback to "NA" if not found
  const importerCountryCode =
    Object.keys(countryCodes).find(
      (key) => countryCodes[key] === formData["receiverAddress"]["country"]
    ) || "NA"; // Fallback to "NA" if not found

  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${today.getFullYear().toString().slice(-2)}`;

  declaration[
    "exporter_reference"
  ] = `EXP-${formattedDate}-${exporterCountryCode}`;
  declaration[
    "importer_reference"
  ] = `IMP-${formattedDate}-${importerCountryCode}`;

  declaration["address_importer"] = {
    name: formData["receiverAddress"]["contactName"],
    street1: formData["receiverAddress"]["street"],
    city: formData["receiverAddress"]["city"],
    state: formData["receiverAddress"]["state"],
    zip: formData["receiverAddress"]["zipCode"],
    country: formData["receiverAddress"]["country"],
    phone: formData["receiverAddress"]["phone"],
    email: formData["receiverAddress"]["email"],
  };

  //   !
  declaration["invoice"] = "";
  declaration["license"] = "";
  declaration["certificate"] = "";
  declaration["notes"] = "";
  declaration["aes_itn"] = "";
  declaration["disclaimer"] = "";
  declaration["duties_payor"] = {
    account: "",
    type: "SENDER",
  };
  declaration["invoiced_charges"] = {
    total_shipping: 0,
    total_taxes: 0,
    total_duties: 0,
    other_fees: 0,
    currency: "",
  };
  declaration["exporter_identification"] = {
    pan: "",
    vat_number: "",
    tax_id: {
      type: "EIN",
      number: formData["shipperAddress"]["phone"],
    },
  };

  console.log(declaration);
};

export default createDeclaration;
