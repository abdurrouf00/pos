"use client";

import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  ModalClose
} from "@/components/ui/modal";
import { useState } from "react";

/**
 * A reusable modal component for forms
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.triggerButton - Custom trigger button element
 * @param {React.ReactNode} props.children - Form component to display in modal
 * @param {string} props.title - Modal title
 * @param {boolean} props.initialOpen - Whether modal is initially open
 * @param {boolean} props.open - Controlled open state
 * @param {function} props.onOpenChange - Callback when modal open state changes
 * @param {function} props.onSubmit - Form submission handler (optional)
 * @param {boolean} props.showSubmitButton - Whether to show a submit button in footer
 * @param {string} props.submitText - Text for submit button
 * @param {string} props.cancelText - Text for cancel button
 * @param {string} props.width - CSS max-width of modal
 */
export function FormModal({ 
  triggerButton,
  children,
  title = "Form",
  initialOpen = false,
  open: controlledOpen,
  onOpenChange,
  onSubmit,
  showSubmitButton = false,
  submitText = "Submit",
  cancelText = "Cancel",
  width = "max-w-md"
}) {
  const [internalOpen, setInternalOpen] = useState(initialOpen);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  
  const handleOpenChange = (isOpen) => {
    if (!isControlled) {
      setInternalOpen(isOpen);
    }
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Modal open={open} onOpenChange={handleOpenChange}>
      <ModalTrigger asChild>
        {triggerButton || <Button variant="outline">Open Form</Button>}
      </ModalTrigger>
      <ModalContent className={width}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <div className="py-2">
          {children}
        </div>
        <ModalFooter>
          {showSubmitButton && (
            <Button type="button" onClick={handleSubmit}>
              {submitText}
            </Button>
          )}
          <ModalClose asChild>
            <Button variant="outline">{cancelText}</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default FormModal; 