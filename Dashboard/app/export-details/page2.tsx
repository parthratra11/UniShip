"use client";

import { useState } from "react";
import Link from "next/link";

const ExportIdDetails = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    gstin: "",
    iec: "",
    pan: "",
    tin: "",
    registeredAddress: "",
    warehouseAddress: "",
    contactName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Business Identificaton Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Name
                <span className="text-red-500 font-extrabold"> *</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GSTIN
                  <span className="text-red-500 font-extrabold"> *</span>
                  <Link
                    href="https://www.gst.gov.in/registration"
                    target="_blank"
                    className="text-indigo-600 ml-2 text-xs"
                  >
                    (Goods and Services Tax Identificaton No.)
                  </Link>
                </label>
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  IEC
                  <span className="text-red-500 font-extrabold"> *</span>
                  <Link
                    href="https://dgft.gov.in/CP/"
                    target="_blank"
                    className="text-indigo-600 ml-2 text-xs"
                  >
                    (Importer Exporter Code)
                  </Link>
                </label>
                <input
                  type="text"
                  name="iec"
                  value={formData.iec}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PAN
                  <span className="text-red-500 font-extrabold"> *</span>
                  <Link
                    href="https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html"
                    target="_blank"
                    className="text-indigo-600 ml-2 text-xs"
                  >
                    (Permanent Account No.)
                  </Link>
                </label>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  TIN
                  <span className="text-red-500 font-extrabold"> *</span>
                  <Link
                    href="https://www.tin-nsdl.com/"
                    target="_blank"
                    className="text-indigo-600 ml-2 text-xs"
                  >
                    (Taxpayer Identification No.)
                  </Link>
                </label>
                <input
                  type="text"
                  name="tin"
                  value={formData.tin}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Contact & Location Details
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registered Business Address
                <span className="text-red-500 font-extrabold"> *</span>
              </label>
              <textarea
                name="registeredAddress"
                value={formData.registeredAddress}
                onChange={handleChange}
                rows={2}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Warehouse/Logistics Hub Address
              </label>
              <textarea
                name="warehouseAddress"
                value={formData.warehouseAddress}
                onChange={handleChange}
                rows={2}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="If different from registered address"
              />
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Name
                  <span className="text-red-500 font-extrabold"> *</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                  <span className="text-red-500 font-extrabold"> *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                  <span className="text-red-500 font-extrabold"> *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div> */}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExportIdDetails;
