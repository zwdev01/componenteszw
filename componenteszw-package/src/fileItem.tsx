import React from "react"
import { cn } from "./lib/utils"

type FileItemState = "default" | "loading"

type DropdownOption = {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  danger?: boolean
}

type FileItemProps = {
  title: string
  subtitle: string
  iconFile?: React.ReactNode
  loading?: boolean
  state?: FileItemState
  dropdownOptions?: DropdownOption[]
  onMenuClick?: () => void


  className?: string
  leftSectionClassName?: string
  titleClassName?: string
  subtitleClassName?: string
  iconClassName?: string
  menuButtonClassName?: string
  dropdownClassName?: string
  optionClassName?: string
}

export const FileItem: React.FC<FileItemProps> = ({
  title,
  subtitle,
  iconFile,
  loading = false,
  state = "default",
  dropdownOptions = [],
  onMenuClick,

  className,
  leftSectionClassName,
  titleClassName,
  subtitleClassName,
  iconClassName,
  menuButtonClassName,
  dropdownClassName,
  optionClassName,
}) => {
  const [openMenu, setOpenMenu] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const isLoading = loading || state === "loading"

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      className={cn(
        "relative w-[380px] rounded-xl border border-orange-500 bg-white px-4 py-4 flex items-start justify-between shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
    >

      <div className={cn("flex items-start gap-3", leftSectionClassName)}>
        <div className={cn("shrink-0", iconClassName)}>
          {iconFile}
        </div>

        <div className="flex flex-col">
          <span
            className={cn(
              "text-sm font-semibold text-gray-900",
              titleClassName
            )}
          >
            {title}
          </span>

          <div
            className={cn(
              "flex items-center gap-2 text-sm text-gray-500 mt-1",
              subtitleClassName
            )}
          >
            <span>{subtitle}</span>

            {isLoading && (
              <>
                <span className="animate-spin text-orange-500">✴</span>
                <span className="text-orange-500 font-medium">
                  Loading...
                </span>
              </>
            )}
          </div>
        </div>
      </div>


      <div className="relative" ref={menuRef}>
        <button
          onClick={() => {
            setOpenMenu(!openMenu)
            onMenuClick?.()
          }}
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-lg hover:bg-orange-50 text-orange-500 transition-colors duration-200",
            menuButtonClassName
          )}
        >
          <span className="text-xl leading-none">⋯</span>
        </button>

        {openMenu && dropdownOptions.length > 0 && (
          <div
            className={cn(
              "absolute right-0 mt-2 w-44 rounded-2xl border border-gray-200 bg-white shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-150",
              dropdownClassName
            )}
          >
            <div className="py-2">
              {dropdownOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.onClick?.()
                    setOpenMenu(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150",
                    option.danger
                      ? "text-red-500 hover:bg-red-50"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                    optionClassName
                  )}
                >
                  <span className="shrink-0">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
