import React from "react"
import { Button } from "./button"
import { cn } from "./lib/utils"

type ModalVariant = "success" | "error" | "question" | "content"
type ButtonVariant = "primary" | "secondary" | "destructive"

type ModalAction = {
  text: string
  onClick: () => void
  variant?: ButtonVariant
}

type ModalProps = {
  open: boolean
  onClose: () => void
  variant?: ModalVariant
  title: string
  description?: string
  children?: React.ReactNode
  primaryAction?: ModalAction
  secondaryAction?: ModalAction
  size?: "small" | "medium" | "large"

  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
  hideIcon?: boolean

  className?: string
  overlayClassName?: string
  contentClassName?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  iconClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  variant = "content",
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  size = "medium",

  closeOnOverlayClick = true,
  closeOnEsc = true,
  hideIcon = false,

  className,
  overlayClassName,
  contentClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
}) => {
  React.useEffect(() => {
    if (!open) return

    document.body.style.overflow = "hidden"

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, closeOnEsc, onClose])

  if (!open) return null

  const sizeClasses = {
    small: "w-[360px]",
    medium: "w-[480px]",
    large: "w-[640px]",
  }

  const iconMap = {
    success: {
      icon: "✓",
      bg: "bg-green-100",
      text: "text-green-600",
    },
    error: {
      icon: "✕",
      bg: "bg-red-100",
      text: "text-red-600",
    },
    question: {
      icon: "?",
      bg: "bg-orange-100",
      text: "text-orange-500",
    },
    content: {
      icon: "•",
      bg: "bg-gray-100",
      text: "text-gray-500",
    },
  }

  const currentIcon = iconMap[variant]

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center", className)}>

      <div
        className={cn(
          "absolute inset-0 backdrop-blur-sm bg-black/20",
          overlayClassName
        )}
        onClick={() => {
          if (closeOnOverlayClick) onClose()
        }}
      />


      <div
        className={cn(
          "relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200",
          sizeClasses[size],
          contentClassName
        )}
      >

        <div className={cn("px-6 pt-6 pb-4 text-center", headerClassName)}>
          {!hideIcon && (
            <div
              className={cn(
                "w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold",
                currentIcon.bg,
                currentIcon.text,
                iconClassName
              )}
            >
              {currentIcon.icon}
            </div>
          )}

          <h2 className={cn("text-lg font-semibold text-gray-900", titleClassName)}>
            {title}
          </h2>

          {description && (
            <p className={cn("mt-2 text-sm text-gray-500", descriptionClassName)}>
              {description}
            </p>
          )}
        </div>


        {children && (
          <div className={cn("px-6 pb-6", bodyClassName)}>
            {children}
          </div>
        )}


        {(primaryAction || secondaryAction) && (
          <div
            className={cn(
              "flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100",
              footerClassName
            )}
          >
            {secondaryAction && (
              <Button
                text={secondaryAction.text}
                variant={secondaryAction.variant ?? "secondary"}
                onClick={secondaryAction.onClick}
              />
            )}

            {primaryAction && (
              <Button
                text={primaryAction.text}
                variant={primaryAction.variant ?? "primary"}
                onClick={primaryAction.onClick}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}