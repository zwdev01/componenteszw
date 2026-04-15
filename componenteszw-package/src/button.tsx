import React from "react"
import { cn } from "./lib/utils"

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "destructive"

type ButtonSize = "small" | "medium"

type ButtonProps = {
  text?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"


  className?: string
  textClassName?: string
  iconClassName?: string
}

export const Button = ({
  text,
  iconLeft,
  iconRight,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  type = "button",

  className,
  textClassName,
  iconClassName,
}: ButtonProps) => {
  const base =
    "flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
  }

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    secondary:
      "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400",
    tertiary:
      "bg-orange-400 text-white hover:bg-orange-500 focus:ring-orange-400",
    success:
      "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400",
    warning:
      "bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-yellow-300",
    destructive:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  }

  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        base,
        sizes[size],
        variants[variant],
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <span className="animate-spin">⏳</span>
      ) : (
        iconLeft && (
          <span className={cn("flex items-center", iconClassName)}>
            {iconLeft}
          </span>
        )
      )}

      {text && (
        <span className={cn(textClassName)}>
          {loading ? "Cargando..." : text}
        </span>
      )}

      {!loading && iconRight && (
        <span className={cn("flex items-center", iconClassName)}>
          {iconRight}
        </span>
      )}
    </button>
  )
}
