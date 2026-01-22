import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input focus:px-4 transition-all duration-300 focus:shadow-md focus:shadow-blue-300  file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex  w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs  outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring-blue-500 focus-visible:ring-blue-500 focus-visible:ring-[1px] disabled:bg-gray-100",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
