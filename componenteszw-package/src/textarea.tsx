import * as React from "react"
import { cn } from "./lib/utils"

type TextAreaState = "default" | "error" | "disabled"

type TextAreaProps = {
  label?: string
  placeholder?: string
  value?: string
  hintText?: string
  required?: boolean
  state?: TextAreaState
  maxLength?: number
  showCounter?: boolean
  disabled?: boolean
  onChange?: (value: string) => void


  className?: string
  textareaClassName?: string
  labelClassName?: string
  hintClassName?: string
}

export function TextArea({
  label,
  placeholder,
  value = "",
  hintText,
  required,
  state = "default",
  maxLength,
  showCounter,
  disabled,
  onChange,

  className,
  textareaClassName,
  labelClassName,
  hintClassName,
}: TextAreaProps) {
  const [internalValue, setInternalValue] = React.useState(value)

  const currentValue = value ?? internalValue

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value

    if (maxLength && val.length > maxLength) return

    setInternalValue(val)
    onChange?.(val)
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>

      {label && (
        <label className={cn("text-sm font-medium", labelClassName)}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}


      <textarea
        value={currentValue}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled || state === "disabled"}
        className={cn(
          "w-full min-h-[100px] rounded-md border px-3 py-2 text-sm outline-none resize-none transition",
          "focus:ring-2 focus:ring-primary",
          state === "error" && "border-red-500 focus:ring-red-500",
          state === "default" && "border-gray-300",
          (disabled || state === "disabled") &&
            "bg-gray-100 cursor-not-allowed opacity-70",
          textareaClassName
        )}
      />


      <div className="flex justify-between items-center text-xs">

        {hintText && (
          <span
            className={cn(
              state === "error" ? "text-red-500" : "text-gray-500",
              hintClassName
            )}
          >
            {hintText}
          </span>
        )}


        {showCounter && maxLength && (
          <span className={cn("text-gray-400", hintClassName)}>
            {currentValue.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
