"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Dummy data - would come from backend
const products = [
  {
    id: 1,
    name: "Cotton T-Shirt",
    hsnCode: "61091000",
    mrp: 1000,
    mrpUnit: "INR",
    dimensions: {
      length: 28,
      width: 20,
      height: 2,
      weight: 0.2,
      unit: "cm",
      weightUnit: "kg",
    },
    variants: {
      colors: ["Red", "Blue", "Black"],
      sizes: ["S", "M", "L", "XL"],
    },
    customsInfo: {
      description: "100% Cotton T-Shirt",
      materialComposition: "Cotton",
      category: [
        "Apparel",
        "Clothing",
        "Textile",
        "Garment",
        "Cotton",
        "T-Shirt",
        "Men",
        "Women",
        "Kids",
        "Unisex",
      ],
      // customDuties: {
      //   dutyRate: "12%",
      //   requiredFields: ["materialComposition", "brandName", "retailPrice"]
      // }
    },
    manufacturingInfo: {
      date: "2024-01-01",
      manufacturingCountry: "India",
      manufacturingState: "Delhi",
    },
  },
  // Add more products...
];

const warehouseAddresses = [
  {
    id: 1,
    name: "Main Warehouse",
    street: "123 Industrial Area",
    locality: "Phase 1",
    landmark: "Near Metro Station",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    zipCode: "110001",
    contactName: "John Doe",
    phone: "+91-9876543210",
    email: "warehouse1@example.com",
  },
  // Add more addresses...
];

const CreateOrderForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
    color: "",
    size: "",
    addressType: "warehouse",
    selectedWarehouseId: "",
    shipperAddress: {
      street: "",
      locality: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      contactName: "",
      phone: "",
      email: "",
    },
    receiverAddress: {
      street: "",
      locality: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      contactName: "",
      phone: "",
      email: "",
    },
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
    },
    customsInfo: {
      description: "",
      materialComposition: "",
      category: "",
      additionalParams: "",
      brandName: "",
      retailPrice: "",
    },
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (productId) => {
    const product = products.find((p) => p.id === parseInt(productId));
    if (product) {
      setSelectedProduct(product);
      setFormData((prev) => ({
        ...prev,
        productId,
        dimensions: product.dimensions,
        // customsInfo: {
        //   ...product.customsInfo,
        //   additionalParams: ""
        // }
      }));
    }
  };

  const handleWarehouseSelect = (warehouseId) => {
    const warehouse = warehouseAddresses.find(
      (w) => w.id === parseInt(warehouseId)
    );
    if (warehouse) {
      setFormData((prev) => ({
        ...prev,
        shipperAddress: {
          street: warehouse.street,
          locality: warehouse.locality,
          landmark: warehouse.landmark,
          city: warehouse.city,
          state: warehouse.state,
          country: warehouse.country,
          zipCode: warehouse.zipCode,
          contactName: warehouse.contactName,
          phone: warehouse.phone,
          email: warehouse.email,
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Create order details object with all form data
    const orderDetails = {
      ...formData,
      product: selectedProduct,
      totalPrice: selectedProduct ? selectedProduct.mrp * formData.quantity : 0,
      currency: selectedProduct?.mrpUnit || "INR",
      orderDate: new Date().toISOString(),
    };

    // Generate a Invoice No or something to pass as query params
    // router.push(`/?orderDetails=${encodeURIComponent(JSON.stringify(orderDetails))}`);
    router.push(`/create-order?orderID=123`); // TO BE FIXED
  };

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-[#0F1111]">Create Order</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#D5D9D9]">
            <h2 className="text-xl font-medium mb-4 text-[#0F1111]">
              Product Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0F1111]">
                    Product
                  </label>
                  <select
                    onChange={(e) => handleProductSelect(e.target.value)}
                    className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                    required
                  >
                    <option value="">Choose a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (HSN: {product.hsnCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0F1111]">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        quantity: parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {selectedProduct && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#0F1111]">
                      Color
                    </label>
                    <select
                      value={formData.color}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          color: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                      required
                    >
                      <option value="">Select Color</option>
                      {selectedProduct.variants.colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#0F1111]">
                      Size
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          size: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                      required
                    >
                      <option value="">Select Size</option>
                      {selectedProduct.variants.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* {selectedProduct && ( */}
              {false && (
                <div className="bg-[#F7F7F7] p-4 rounded border border-[#D5D9D9]">
                  <h3 className="text-lg font-medium mb-3 text-[#0F1111]">
                    Customs Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#0F1111]">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        value={formData.customsInfo.brandName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customsInfo: {
                              ...prev.customsInfo,
                              brandName: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#0F1111]">
                        Retail Price
                      </label>
                      <input
                        type="number"
                        value={formData.customsInfo.retailPrice}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customsInfo: {
                              ...prev.customsInfo,
                              retailPrice: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-[#565959]">
                        Duty Rate:{" "}
                        {selectedProduct.customsInfo.customDuties.dutyRate}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#D5D9D9]">
            <h2 className="text-xl font-medium mb-4 text-[#0F1111]">
              Shipping Details
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-[#0F1111]">
                  Shipper Address
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="warehouse"
                        checked={formData.addressType === "warehouse"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            addressType: e.target.value,
                          }))
                        }
                        className="text-[#FF9900] focus:ring-[#FF9900]"
                      />
                      <span className="ml-2 text-[#0F1111]">Warehouse</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="custom"
                        checked={formData.addressType === "custom"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            addressType: e.target.value,
                          }))
                        }
                        className="text-[#FF9900] focus:ring-[#FF9900]"
                      />
                      <span className="ml-2 text-[#0F1111]">
                        Custom Address
                      </span>
                    </label>
                  </div>

                  {formData.addressType === "warehouse" ? (
                    <select
                      onChange={(e) => handleWarehouseSelect(e.target.value)}
                      className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                      required
                    >
                      <option value="">Select Warehouse</option>
                      {warehouseAddresses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name} - {warehouse.city}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <AddressForm
                      type="shipper"
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-[#0F1111]">
                  Receiver Address
                </h3>
                <AddressForm
                  type="receiver"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          </div>

          {/* ADDRESS CONFIRMATION TO BE ADDED ON SUBMIT */}
          <button
            type="submit"
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-1 px-4 rounded-md border border-[#FCD200] focus:outline-none focus:ring-2 focus:ring-[#F7CA00] shadow-sm"
          >
            Create Order
          </button>
        </form>
      </div>
    </div>
  );
};

const AddressForm = ({ type, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [`${type}Address`]: {
        ...prev[`${type}Address`],
        [name]: value,
      },
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Street Address
        </label>
        <input
          type="text"
          name="street"
          value={formData[`${type}Address`].street}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Locality/Area
        </label>
        <input
          type="text"
          name="locality"
          value={formData[`${type}Address`].locality}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Landmark
        </label>
        <input
          type="text"
          name="landmark"
          value={formData[`${type}Address`].landmark}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          City
        </label>
        <input
          type="text"
          name="city"
          value={formData[`${type}Address`].city}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          State
        </label>
        <input
          type="text"
          name="state"
          value={formData[`${type}Address`].state}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Country
        </label>
        <input
          type="text"
          name="country"
          value={formData[`${type}Address`].country}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          ZIP Code
        </label>
        <input
          type="text"
          name="zipCode"
          value={formData[`${type}Address`].zipCode}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Contact Name
        </label>
        <input
          type="text"
          name="contactName"
          value={formData[`${type}Address`].contactName}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData[`${type}Address`].phone}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData[`${type}Address`].email}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>
    </div>
  );
};

export default CreateOrderForm;
