import { cva } from "class-variance-authority";
import { IoMdAlert } from "react-icons/io";

const alertVariants = cva(
  "text-sm py-4 px-4  rounded-md border  flex items-center gap-2",
  {
    variants: {
      type: {
        error: "text-pink-800 border  border-pink-200 bg-pink-50",
        success: "text-green-800 border border-green-200 bg-green-50",
        warning: "text-yellow-800 border border-yellow-200 bg-yellow-50",
        info: "text-blue-800 border border-blue-200 bg-blue-50",
      },
    },
  }
);

export default function Alert({ message, type }) {
  return (
    <div className={alertVariants({ type })}>
      <IoMdAlert size={20} /> {message}
    </div>
  );
}
