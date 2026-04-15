import React from "react"
import { cn } from "./lib/utils"

type InputState = "default" | "error" | "disabled"
type InputSize = "small" | "medium" | "large"

type InputProps = {
  label?: string
  placeholder?: string
  value?: string
  hintText?: string
  required?: boolean
  state?: InputState
  size?: InputSize
  type?: "text" | "date" | "password" | "number"
  iconRight?: React.ReactNode
  disabled?: boolean
  onChange?: (value: string) => void


  className?: string
  inputClassName?: string
  labelClassName?: string
  hintClassName?: string
  iconClassName?: string
}

export const Input = ({
  label,
  placeholder,
  value,
  hintText,
  required,
  state = "default",
  size = "medium",
  type = "text",
  iconRight,
  disabled,
  onChange,

  className,
  inputClassName,
  labelClassName,
  hintClassName,
  iconClassName,
}: InputProps) => {
  const sizes = {
    small: "px-2 py-1 text-sm",
    medium: "px-3 py-2 text-sm",
    large: "px-4 py-3 text-base",
  }

  const states = {
    default: "border-gray-300 focus:border-green-500",
    error: "border-red-500 focus:border-red-500",
    disabled: "bg-gray-100 cursor-not-allowed",
  }

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {label && (
        <label className={cn("text-sm font-medium", labelClassName)}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled || state === "disabled"}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "w-full rounded-md border outline-none",
            sizes[size],
            states[state],
            iconRight && "pr-10",
            inputClassName
          )}
        />

        {iconRight && (
          <div
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              iconClassName
            )}
          >
            {iconRight}
          </div>
        )}
      </div>

      {hintText && (
        <span
          className={cn(
            "text-xs",
            state === "error" ? "text-red-500" : "text-gray-500",
            hintClassName
          )}
        >
          {hintText}
        </span>
      )}
    </div>
  )
}
