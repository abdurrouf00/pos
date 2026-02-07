"use client";

import React, { useState } from "react";
import HrSelect from "@/components/common/HrSelect";
import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";

export default function MembershipForm() {
    const [membershipData, setMembershipData] = useState({
        branch: "",
        activation_date: "",
        child_name: "",
        dob: "",
        guardian_name: "",
        guardian_phone: "",
        secondary_phone: "",
        address: "",
        child_class: "",
        school_name: "",
        payment_type: "",
        email: "",
        package_for: "",
        package_type: "",
        package_amount: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMembershipData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", membershipData);
        // Validation logic can be added here following the pattern
    };

    const branchOptions = [
        { label: "Main Branch", value: "main" },
        { label: "Elite Branch", value: "elite" },
    ];

    const paymentTypeOptions = [
        { label: "Cash", value: "cash" },
        { label: "Card", value: "card" },
        { label: "Mobile Banking", value: "mobile_banking" },
    ];

    const packageForOptions = [
        { label: "1st Child", value: "1st_child" },
        { label: "2nd Child", value: "2nd_child" },
        { label: "3rd Child", value: "3rd_child" },
    ];

    const packageTypeOptions = [
        { label: "Two Months", value: "two_months" },
        { label: "Three Months", value: "three_months" },
        { label: "Six Months", value: "six_months" },
        { label: "One Year", value: "one_year" },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 ">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Membership Registration</h2>
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Branch */}
                    <HrSelect
                        label="Branch"
                        name="branch"
                        value={membershipData.branch}
                        onChange={handleChange}
                        options={branchOptions}
                        placeholder="Select Branch"
                        required
                        error={errors.branch}
                    />

                    {/* Activation Date */}
                    <HrInput
                        label="Activation Date"
                        name="activation_date"
                        type="date"
                        value={membershipData.activation_date}
                        onChange={handleChange}
                        required
                        error={errors.activation_date}
                    />

                    {/* Name of Child */}
                    <HrInput
                        label="Name of Child"
                        name="child_name"
                        placeholder="Enter child's name"
                        value={membershipData.child_name}
                        onChange={handleChange}
                        required
                        error={errors.child_name}
                    />

                    {/* Date of Birth */}
                    <HrInput
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={membershipData.dob}
                        onChange={handleChange}
                        required
                        error={errors.dob}
                    />

                    {/* Guardian Name */}
                    <HrInput
                        label="Guardian Name"
                        name="guardian_name"
                        placeholder="Enter guardian's name"
                        value={membershipData.guardian_name}
                        onChange={handleChange}
                        required
                        error={errors.guardian_name}
                    />

                    {/* Guardian Phone */}
                    <HrInput
                        label="Guardian Phone"
                        name="guardian_phone"
                        placeholder="01xxxxxxxxx"
                        value={membershipData.guardian_phone}
                        onChange={handleChange}
                        required
                        error={errors.guardian_phone}
                    />

                    {/* Secondary Phone */}
                    <HrInput
                        label="Secondary Phone"
                        name="secondary_phone"
                        placeholder="Secondary phone number"
                        value={membershipData.secondary_phone}
                        onChange={handleChange}
                    />

                    {/* Email */}
                    <HrInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="example@mail.com"
                        value={membershipData.email}
                        onChange={handleChange}
                    />

                    {/* Address */}
                    <HrInput
                        label="Address"
                        name="address"
                        type="textarea"
                        placeholder="Enter full address"
                        wrapperClassName="md:col-span-2 lg:col-span-1"
                        value={membershipData.address}
                        onChange={handleChange}
                        rows={2}
                    />

                    {/* Child Class */}
                    <HrInput
                        label="Child Class"
                        name="child_class"
                        placeholder="e.g. Class 5"
                        value={membershipData.child_class}
                        onChange={handleChange}
                    />

                    {/* School Name */}
                    <HrInput
                        label="School Name"
                        name="school_name"
                        placeholder="Enter school name"
                        value={membershipData.school_name}
                        onChange={handleChange}
                    />

                    {/* Payment Type */}
                    <HrSelect
                        label="Payment Type"
                        name="payment_type"
                        value={membershipData.payment_type}
                        onChange={handleChange}
                        options={paymentTypeOptions}
                        placeholder="Select Payment Type"
                        required
                        error={errors.payment_type}
                    />

                    {/* Package For */}
                    <HrSelect
                        label="Package For"
                        name="package_for"
                        value={membershipData.package_for}
                        onChange={handleChange}
                        options={packageForOptions}
                        placeholder="Select"
                    />

                    {/* Package Type */}
                    <HrSelect
                        label="Package Type"
                        name="package_type"
                        value={membershipData.package_type}
                        onChange={handleChange}
                        options={packageTypeOptions}
                        required
                        error={errors.package_type}
                        placeholder="Select Package Type"
                    />

                    {/* Package Amount */}
                    <HrInput
                        label="Package Amount"
                        name="package_amount"
                        type="number"
                        placeholder="0.00"
                        value={membershipData.package_amount}
                        onChange={handleChange}
                        required
                        error={errors.package_amount}
                    />
                </div>

                <div className="flex justify-end gap-3 mt-8 border-t pt-5">
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Save Membership
                    </Button>
                </div>
            </form>
        </div>
    );
}
