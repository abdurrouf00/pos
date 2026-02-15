"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import { Trash2 } from "lucide-react";

export default function RequisitionEditModal({ isOpen, onClose, requisition }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (requisition?.details) {
      setItems(requisition.details.map(d => ({
        ...d,
        quantity: d.requisition_qty // mapping for easier handling
      })));
    }
  }, [requisition]);

  const handleItemChange = (idx, field, value) => {
    const updatedItems = [...items];
    updatedItems[idx][field] = value;
    setItems(updatedItems);
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Updated Requisition:", { ...requisition, details: items });
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-5xl">
        <ModalHeader>
          <ModalTitle className="text-xl font-black text-gray-800 uppercase tracking-tight">
            Edit Requisition: <span className="text-blue-600 ml-2">{requisition?.requisition_no}</span>
          </ModalTitle>
        </ModalHeader>

        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight w-[60px] text-center">
                    SL
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight">
                    PRODUCT NAME
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight text-center">
                    UNIT
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight text-center w-[120px]">
                    REQ. QTY
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/30">
                    <td className="px-4 py-3 text-[11px] font-bold text-gray-400 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-[12px] font-black text-gray-900">
                      {item.product_name}
                      <span className="block text-[10px] text-gray-400 font-medium">
                        Brand: {item.brand || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] font-black text-gray-500 text-center uppercase">
                      {item.unit}
                    </td>
                    <td className="px-4 py-3">
                      <HrInput
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        className="h-9 text-center font-black text-blue-900 border-gray-200"
                        wrapperClassName="mb-0"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          const updated = items.filter((_, i) => i !== index);
                          setItems(updated);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ModalFooter className="mt-6 gap-3">
          <Button variant="outline" onClick={onClose} className="font-bold border-gray-200">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 font-black px-8"
          >
            {loading ? "Saving..." : "Update Requisition"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
