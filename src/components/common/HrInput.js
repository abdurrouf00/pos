"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState, forwardRef } from "react";
import { Textarea } from "../ui/textarea";

const HrInput = forwardRef(({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className,
  labelClassName,
  wrapperClassName,
  disabled = false,
  hint,
  rows = 5,
  fullWidth = true,
  errorText = '',
  ...rest
}, ref) => {
  const inputId = id || name;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-xs",
        fullWidth ? "w-full" : "",
        wrapperClassName
      )}
    >
      {label && (
        <Label
          htmlFor={inputId}
          className={cn(
            "text-xs font-medium text-gray-700 ",
            required &&
            "after:content-['*'] after:ml-[-0.4rem] after:text-red-500",
            error && "text-red-500",
            labelClassName
          )}
        >
          {label}
        </Label>
      )}

      {type === "textarea" ? (
        <Textarea
          ref={ref} // ✅ forward ref here
          id={inputId}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={cn(
            error &&
            "border-red-500 focus-visible:ring-red-500/30 focus-visible:border-red-500",
            className
          )}
          aria-invalid={!!error}
          required={required}
          {...rest}
        />
      ) : (
        <div className="relative">
          <Input
            ref={ref} // ✅ forward ref here
            id={inputId}
            name={name}
            type={type === "password" && showPassword ? "text" : type}
            value={value ?? ""}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              error &&
              "border-red-500 focus-visible:ring-red-500/30 focus-visible:border-red-500 ",
              className
            )}
            aria-invalid={!!error}
            required={required}
            {...rest}
          />
          {type === "password" && !showPassword && (
            <EyeOff
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
          {type === "password" && showPassword && (
            <Eye
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      )}

      {hint && !error && <p className="text-xs text-gray-500 mt-1">{hint}</p>}

      {error && <p className="text-xs text-red-500 mt-1">{errorText}</p>}
    </div>
  );
});

HrInput.displayName = "HrInput"; // important for forwardRef

export default HrInput;
