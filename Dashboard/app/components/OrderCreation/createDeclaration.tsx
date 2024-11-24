"use client";

// import { UserContext } from "@/app/UserContext";
// import { UNDERSCORE_NOT_FOUND_ROUTE_ENTRY } from "next/dist/shared/lib/constants";
// import { useRouter } from "next/router";
// import { decl, Declaration } from "postcss";
// import React, { useContext, useState } from "react";

import dotenv from "dotenv";
dotenv.config();

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
  dutyRate,
  rodtep,
  declaration,
  userDetails,
  router,
  setUserDetails,
  setDeclaration,
}) => {
  setUserDetails({
    iec: "IEC1234567890",
    aesitn: "AESITN12345",
    gstin: "29ABCDE1234F1Z5",
    email: "dummy.email@example.com",
    phone: "9876543210",
    pan: "ABCDE1234F",
  });
  // console.log(userDetails);

  const declarationAPI = async () => {
    // ! HIDE THIS
    // const api_token = process.env.SHIPPO_TEST_API;
    // console.log(api_token);

    // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    // const url = "http://api.goshippo.com/customs/declarations";

    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `ShippoToken ${api_token}`,
    //   // "X-Requested-With": "XMLHttpRequest",
    // };
    // const body = declaration;

    // !
    // axios
    //   .post(proxyUrl + url, body, { headers: headers })
    //   .then((response) => {
    //     // Loop through the results and find the matching invoice
    //     const responseData = response.data;
    //     const obj = [];
    //     // console.log(responseData);

    //     responseData.results.forEach((item) => {
    //       if (item.invoice === body.invoice) {
    //         // console.log(item.object_id);
    //         obj.push(item.object_id);
    //       }
    //     });
    //     console.log(obj[0]);
    //     router.push("/rate-list");
    //   })
    //   .catch((error) => {
    //     console.error("Error making the request:", error);
    //   });

    // ! FIX THIS
    const tempDeclaration = "be78d8454ae24c4ca838ca883d355dd2";

    // console.log("selected product", selectedProduct);

    const orderData = {
      DeclarationNo: tempDeclaration,
      FormData: formData,
      UserDetails: userDetails,
      Declaration: declaration,
      SelectedProduct: selectedProduct,
    };

    sessionStorage.setItem("OrderData", JSON.stringify(orderData));

    router.push("/rate-list");
    // router.push({
    //   pathname: "/rate-list",
    //   query: { DeclarationNo: tempDeclaration },
    // });
  };

  declaration["contents_explanation"] = selectedProduct["productDescription"];

  declaration["certify_signer"] = formData["shipperAddress"]["contactName"];

  if (typeof declaration["items"] == "string") declaration["items"] = [];

  declaration["items"] = [
    {
      description: selectedProduct["name"],
      quantity: formData["quantity"],
      net_weight: selectedProduct["dimensions"]["weight"].toString(),
      mass_unit: selectedProduct["dimensions"]["weightUnit"],
      value_amount: selectedProduct["mrp"].toString(),
      value_currency: selectedProduct["mrpUnit"],
      tariff_number: selectedProduct["hsnCode"],
      origin_country:
        selectedProduct["manufacturingInfo"]["manufacturingCountry"],
    },
  ];

  // ! IMPLEMENT THIS LATER
  // declaration.items.push({
  //   description: selectedProduct["name"],
  //   quantity: formData["quantity"],
  //   net_weight: selectedProduct["dimensions"]["weight"].toString(),
  //   mass_unit: selectedProduct["dimensions"]["weightUnit"],
  //   value_amount: selectedProduct["mrp"].toString(),
  //   value_currency: selectedProduct["mrpUnit"],
  //   tariff_number: selectedProduct["hsnCode"],
  //   origin_country:
  //     selectedProduct["manufacturingInfo"]["manufacturingCountry"],
  // });

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
  declaration["invoice"] = `${selectedProduct["modelNo"]}-${formattedDate}`;
  declaration["license"] = userDetails["iec"]; // IEC (10)
  declaration["certificate"] = selectedProduct["certificateNo"]; // Product Ceritifcate
  declaration["notes"] = "";
  declaration["aes_itn"] = userDetails["aesitn"]; // AEC ITN (14)
  declaration["disclaimer"] = "";
  declaration["duties_payor"] = {
    account: userDetails["email"], // email
    type: "SENDER",
  };

  const totalTaxes = dutyRate - rodtep;
  const totalShipping =
    selectedProduct["mrp"] + selectedProduct["mrp"] * totalTaxes;

  declaration["invoiced_charges"] = {
    total_shipping: totalShipping,
    total_taxes: totalTaxes, // IN %age
    total_duties: dutyRate, // IN %age
    other_fees: rodtep, // IN %age
    currency: selectedProduct["mrpUnit"],
  };
  declaration["exporter_identification"] = {
    pan: userDetails["pan"], // PAN (10)
    vat_number: userDetails["gstin"], // GSTIN (15)
    tax_id: {
      type: "EIN",
      // ! FIX THIS LATER
      number: `AB${formData["shipperAddress"]["phone"].slice(-9)}ABCD`,
    },
  };

  console.log(declaration);
  setDeclaration(declaration);
  // sessionStorage.setItem("declaration", declaration);
  // sessionStorage.setItem("formData", formData);
  // sessionStorage.setItem("userDetails", userDetails);
  declarationAPI();
};

export default createDeclaration;
