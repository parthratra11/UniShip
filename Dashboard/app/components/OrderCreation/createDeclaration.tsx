import React from "react";

const createDeclaration = ({
  formData,
  selectedProduct,
  declaration,
  setDeclaration,
}) => {
  console.log(formData);
  console.log(selectedProduct);
  console.log(declaration);
  declaration["contents_type"] = "NIL";
  //   declaration = { ...declaration, contents_type: "NIL" };
  setDeclaration(declaration);
  console.log(declaration);
};

export default createDeclaration;
