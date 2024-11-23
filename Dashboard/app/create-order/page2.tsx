"use client";

import { useState } from "react";

// Dummy data - would come from backend
const products = [
  {
    id: 1,
    name: "Cotton T-Shirt",
    hsnCode: "61091000",
    dimensions: {
      length: 28,
      width: 20,
      height: 2,
      weight: 0.2
    },
    variants: {
      colors: ["Red", "Blue", "Black"],
      sizes: ["S", "M", "L", "XL"]
    },
    customsInfo: {
      description: "100% Cotton T-Shirt",
      materialComposition: "Cotton",
      category: "Apparel",
      customDuties: {
        dutyRate: "12%",
        requiredFields: ["materialComposition", "brandName", "retailPrice"]
      }
    }
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
    email: "warehouse1@example.com"
  },
  // Add more addresses...
];

const CreateOrderForm = () => {
  const [formData, setFormData] = useState({
    // Product Details
    productId: "",
    quantity: 1,
    color: "",
    size: "",
    
    // Shipping Addresses
    addressType: "warehouse", // warehouse or custom
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
      email: ""
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
      email: ""
    },

    // Dimensions (auto-calculated based on product & quantity)
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      weight: 0
    },

    // Customs Information
    customsInfo: {
      description: "",
      materialComposition: "",
      category: "",
      additionalParams: "",
      brandName: "",
      retailPrice: ""
    }
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      setSelectedProduct(product);
      setFormData(prev => ({
        ...prev,
        productId,
        dimensions: product.dimensions,
        customsInfo: {
          ...product.customsInfo,
          additionalParams: ""
        }
      }));
    }
  };

  const handleWarehouseSelect = (warehouseId) => {
    const warehouse = warehouseAddresses.find(w => w.id === parseInt(warehouseId));
    if (warehouse) {
      setFormData(prev => ({
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
          email: warehouse.email
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 ml-2">Create Order</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Selection Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Product
                  <span className="text-red-500">*</span>
                </label>
                <select
                  onChange={(e) => handleProductSelect(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Choose a product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} (HSN: {product.hsnCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({...prev, quantity: parseInt(e.target.value)}))}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              {selectedProduct && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Color
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({...prev, color: e.target.value}))}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select Color</option>
                      {selectedProduct.variants.colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Size
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData(prev => ({...prev, size: e.target.value}))}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select Size</option>
                      {selectedProduct.variants.sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div> </>)}
                  {false && ( <>

                  {/* Customs Information */}
                  <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Customs Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Brand Name
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.customsInfo.brandName}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            customsInfo: {...prev.customsInfo, brandName: e.target.value}
                          }))}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Retail Price
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.customsInfo.retailPrice}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            customsInfo: {...prev.customsInfo, retailPrice: e.target.value}
                          }))}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600">
                          Duty Rate: {selectedProduct.customsInfo.customDuties.dutyRate}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Shipping Addresses Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Shipper Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address Type
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="warehouse"
                      checked={formData.addressType === "warehouse"}
                      onChange={(e) => setFormData(prev => ({...prev, addressType: e.target.value}))}
                      className="form-radio"
                    />
                    <span className="ml-2">Select Warehouse</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="custom"
                      checked={formData.addressType === "custom"}
                      onChange={(e) => setFormData(prev => ({...prev, addressType: e.target.value}))}
                      className="form-radio"
                    />
                    <span className="ml-2">Custom Address</span>
                  </label>
                </div>
              </div>

              {formData.addressType === "warehouse" ? (
                <select
                  onChange={(e) => handleWarehouseSelect(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Warehouse</option>
                  {warehouseAddresses.map(warehouse => (
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

          {/* Receiver Address Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Receiver Details</h2>
            <AddressForm
              type="receiver"
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow p-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddressForm = ({ type, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [`${type}Address`]: {
        ...prev[`${type}Address`],
        [name]: value
      }
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Street Address
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="street"
          value={formData[`${type}Address`].street}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Locality/Area
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="locality"
          value={formData[`${type}Address`].locality}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Landmark
        </label>
        <input
          type="text"
          name="landmark"
          value={formData[`${type}Address`].landmark}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          City
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="city"
          value={formData[`${type}Address`].city}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          State
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="state"
          value={formData[`${type}Address`].state}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Country
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="country"
          value={formData[`${type}Address`].country}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          ZIP Code
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="zipCode"
          value={formData[`${type}Address`].zipCode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contact Name
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="contactName"
          value={formData[`${type}Address`].contactName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
          <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData[`${type}Address`].phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
          <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData[`${type}Address`].email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
    </div>
  );
};

export default CreateOrderForm;
