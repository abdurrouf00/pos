import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const HrModal = (props) => {
  const {
    title,
    children,
    button,
    toggle,
    setToggle,
    size = "sm:max-w-lg",
    description,
    className,
    onClose,
  } = props;
  const handleClose = () => {
    setToggle(!toggle);
    if (onClose) {
      onClose();
    }
  }
  return (
    <div className={`modal ${className}`}>
      <Dialog open={toggle} onOpenChange={handleClose}>
        {/* <DialogTrigger asChild>
          <div> {toggle}</div>
        </DialogTrigger> */}
        <DialogContent className={`${size} max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            {title && (
              <DialogTitle className=" pb-3">{title}</DialogTitle>
            )}
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">{children}</div>
          <DialogFooter>
            <div>{button}</div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HrModal;
