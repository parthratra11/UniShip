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
    <div className="min-h-screen bg-[#EAEDED] py-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded shadow-sm mb-4">
          <h1 className="text-3xl font-medium text-[#0F1111] mb-4">
            Business Identification Details
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#0F1111] mb-1">
                  Business Name
                  <span className="text-[#B12704]">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#0F1111] mb-1">
                    GSTIN
                    <span className="text-[#B12704]">*</span>
                    <Link
                      href="https://www.gst.gov.in/registration"
                      target="_blank"
                      className="text-[#007185] hover:text-[#C7511F] hover:underline ml-1 text-xs"
                    >
                      (Goods and Services Tax Identification No.)
                    </Link>
                  </label>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#0F1111] mb-1">
                    IEC
                    <span className="text-[#B12704]">*</span>
                    <Link
                      href="https://dgft.gov.in/CP/"
                      target="_blank"
                      className="text-[#007185] hover:text-[#C7511F] hover:underline ml-1 text-xs"
                    >
                      (Importer Exporter Code)
                    </Link>
                  </label>
                  <input
                    type="text"
                    name="iec"
                    value={formData.iec}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#0F1111] mb-1">
                    PAN
                    <span className="text-[#B12704]">*</span>
                    <Link
                      href="https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html"
                      target="_blank"
                      className="text-[#007185] hover:text-[#C7511F] hover:underline ml-1 text-xs"
                    >
                      (Permanent Account No.)
                    </Link>
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#0F1111] mb-1">
                    AES ITN
                    <span className="text-[#B12704]">*</span>
                    <Link
                      href="https://www.tin-nsdl.com/"
                      target="_blank"
                      className="text-[#007185] hover:text-[#C7511F] hover:underline ml-1 text-xs"
                    >
                      (Internal Transaction No.)
                    </Link>
                  </label>
                  <input
                    type="text"
                    name="tin"
                    value={formData.tin}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#DDD] pt-4 space-y-2">
              <h2 className="text-lg font-medium text-[#0F1111]">
                Contact & Location Details
              </h2>

              <div>
                <label className="block text-sm text-[#0F1111] mb-1">
                  Registered Business Address
                  <span className="text-[#B12704]">*</span>
                </label>
                <textarea
                  name="registeredAddress"
                  value={formData.registeredAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#0F1111] mb-1">
                  Warehouse/Logistics Hub Address
                </label>
                <textarea
                  name="warehouseAddress"
                  value={formData.warehouseAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                  placeholder="If different from registered address"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-1 px-4 rounded-md border border-[#FCD200] focus:outline-none focus:ring-2 focus:ring-[#F7CA00] shadow-sm"
              >
                Submit Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExportIdDetails;
