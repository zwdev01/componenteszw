import React from "react"
import { cn } from "./lib/utils"

type CardRowProps = {
  children?: React.ReactNode
  onClick?: () => void


  className?: string
  contentClassName?: string
  hoverClassName?: string
  skeletonClassName?: string

  clickable?: boolean
}

export const CardRow: React.FC<CardRowProps> = ({
  children,
  onClick,
  className,
  contentClassName,
  hoverClassName,
  skeletonClassName,
  clickable = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-200",
        clickable && "cursor-pointer",
        clickable && "hover:shadow-md",
        hoverClassName,
        className
      )}
    >
      <div
        className={cn(
          "min-h-[72px] px-6 py-4 flex items-center justify-between",
          contentClassName
        )}
      >
        {children || (
          <>
            <div className={cn("flex-1 h-5 rounded-md bg-gray-100", skeletonClassName)} />
            <div className={cn("w-24 h-5 rounded-md bg-gray-100 ml-6", skeletonClassName)} />
            <div className={cn("w-24 h-5 rounded-md bg-gray-100 ml-6", skeletonClassName)} />
            <div className={cn("w-32 h-5 rounded-md bg-gray-100 ml-6", skeletonClassName)} />
            <div className={cn("w-6 h-6 rounded-md bg-gray-100 ml-6", skeletonClassName)} />
          </>
        )}
      </div>
    </div>
  )
}
