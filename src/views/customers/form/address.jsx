"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";

export default function AddressForm() {
  const [billing, setBilling] = useState({
    attention: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    fax: "",
  });

  const [shipping, setShipping] = useState({
    attention: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    fax: "",
  });

  const [copyBilling, setCopyBilling] = useState(false);

  // Billing change
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
  };

  // Shipping change
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  // Copy billing to shipping
  const handleCopyBilling = () => {
    setCopyBilling(!copyBilling);
    if (!copyBilling) {
      setShipping(billing);
    }
  };

  return (
    <div className=" bg-white space-y-6">
      <h2 className="text-lg font-semibold mb-4">Address Details</h2>

      <div className="space-y-4">
        {/* Billing Address */}
        <div className="flex-1 space-y-3 p-4 border rounded">
          <h3 className="font-bold mb-4">Billing Address</h3>

          <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
            <HrInput
              name="attention"
              value={billing.attention}
              onChange={handleBillingChange}
              label="Attention"
            />

            <HrInput
              name="country"
              value={billing.country}
              onChange={handleBillingChange}
              label="Country / Region"
            />

            <HrInput
              name="address"
              value={billing.address}
              onChange={handleBillingChange}
              label="Address"
            />

            <HrInput
              name="city"
              value={billing.city}
              onChange={handleBillingChange}
              label="City"
            />

            <HrInput
              name="state"
              value={billing.state}
              onChange={handleBillingChange}
              label="State"
            />

            <HrInput
              name="zip"
              value={billing.zip}
              onChange={handleBillingChange}
              label="Zip Code"
            />

            <HrInput
              name="phone"
              value={billing.phone}
              onChange={handleBillingChange}
              label="Phone"
            />

            <HrInput
              name="fax"
              value={billing.fax}
              onChange={handleBillingChange}
              label="Fax Number"
            />
          </div>
        </div>

        {/* Shipping Address */}

        <div className="flex-1 space-y-3 p-4 border rounded">
          <div className="flex gap-3 items-center mb-4">
            <h3 className="font-bold">Shipping Address</h3>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={copyBilling}
                onChange={handleCopyBilling}
              />
              Copy Billing Address
            </label>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
            <HrInput
              name="attention"
              value={shipping.attention}
              onChange={handleShippingChange}
              className="flex-1"
              label="Attention"
            />

            <HrInput
              name="country"
              value={shipping.country}
              onChange={handleShippingChange}
              label="Country / Region"
            />

            <HrInput
              name="address"
              value={shipping.address}
              onChange={handleShippingChange}
              label="Address"
            />

            <HrInput
              name="city"
              value={shipping.city}
              onChange={handleShippingChange}
              label="City"
            />

            <HrInput
              name="state"
              value={shipping.state}
              onChange={handleShippingChange}
              label="State"
            />

            <HrInput
              name="zip"
              value={shipping.zip}
              onChange={handleShippingChange}
              className="flex-1"
              label="Zip Code"
            />

            <HrInput
              name="phone"
              label="Phone"
              value={shipping.phone}
              onChange={handleShippingChange}
            />

            <HrInput
              name="fax"
              value={shipping.fax}
              onChange={handleShippingChange}
              label="Fax Number"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
