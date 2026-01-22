import React from "react";
import { Button } from "../ui/button";
import HrModal from "./HrModal";

export default function Confirm({ open, onClose, onConfirm, title, message }) {
  if (!open) return null;

  return (
    <HrModal
      open={open}
      onClose={onClose}
      title={title || "Are you sure?"}
      message={message || "Do you want to proceed with this action?"}
      onConfirm={onConfirm}
      onCancel={onClose}
    >
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <div className="flex justify-end gap-2">
          <Button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Confirm
          </Button>
        </div>
      </div>
    </HrModal>
  );
}
