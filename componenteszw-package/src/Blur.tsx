import React from "react"
import { cn } from "./lib/utils"

type BackgroundBlurProps = {
  active: boolean
  blur?: number
  overlayOpacity?: number
  children?: React.ReactNode


  onClick?: () => void
  closeOnClick?: boolean
  disablePointerEvents?: boolean


  className?: string
  overlayClassName?: string
  contentClassName?: string
}

export const BackgroundBlur: React.FC<BackgroundBlurProps> = ({
  active,
  blur = 8,
  overlayOpacity = 0.35,
  children,

  onClick,
  closeOnClick = false,
  disablePointerEvents = false,

  className,
  overlayClassName,
  contentClassName,
}) => {
  if (!active) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-40",
        disablePointerEvents && "pointer-events-none",
        className
      )}
    >

      <div
        className={cn("absolute inset-0 backdrop-blur-sm", overlayClassName)}
        style={{
          backdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(255,255,255,${overlayOpacity})`,
        }}
        onClick={() => {
          if (closeOnClick) onClick?.()
        }}
      />


      <div
        className={cn(
          "relative z-50 flex items-center justify-center w-full h-full",
          !disablePointerEvents && "pointer-events-auto",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
