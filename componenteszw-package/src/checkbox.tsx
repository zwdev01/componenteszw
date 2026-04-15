import * as React from "react"
import { Check, Minus } from "lucide-react"
import { cn } from "./lib/utils"

type CheckboxProps = {
  label?: string
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  hintText?: string
  onChange?: (checked: boolean) => void


  className?: string
  checkboxClassName?: string
  labelClassName?: string
  hintClassName?: string
  iconClassName?: string
}

export function Checkbox({
  label,
  checked = false,
  indeterminate = false,
  disabled,
  hintText,
  onChange,

  className,
  checkboxClassName,
  labelClassName,
  hintClassName,
  iconClassName,
}: CheckboxProps) {
  const id = React.useId()

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label
        htmlFor={id}
        className={cn(
          "flex items-center gap-2 cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          labelClassName
        )}
      >

        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="hidden"
        />

        <div
          className={cn(
            "w-4 h-4 flex items-center justify-center rounded border transition",
            checked || indeterminate
              ? "bg-primary text-white border-primary"
              : "bg-white border-gray-300",
            checkboxClassName
          )}
        >
          {indeterminate ? (
            <Minus size={12} className={iconClassName} />
          ) : checked ? (
            <Check size={12} className={iconClassName} />
          ) : null}
        </div>

        {label && <span className="text-sm">{label}</span>}
      </label>

      {hintText && (
        <span className={cn("text-xs text-gray-500", hintClassName)}>
          {hintText}
        </span>
      )}
    </div>
  )
}
