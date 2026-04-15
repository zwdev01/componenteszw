import * as React from "react"
import { Upload, FileText, X } from "lucide-react"
import { cn } from "./lib/utils"

type FileUploadProps = {
  multiple?: boolean
  maxSize?: number
  acceptedFormats?: string[]
  onChange?: (files: File[]) => void

  className?: string
  dropzoneClassName?: string
  draggingClassName?: string
  labelClassName?: string
  buttonClassName?: string
  fileItemClassName?: string
  fileNameClassName?: string
  removeIconClassName?: string
}

export function FileUpload({
  multiple,
  maxSize = 5,
  acceptedFormats,
  onChange,

  className,
  dropzoneClassName,
  draggingClassName,
  labelClassName,
  buttonClassName,
  fileItemClassName,
  fileNameClassName,
  removeIconClassName,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [dragging, setDragging] = React.useState(false)

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return

    const validFiles = Array.from(newFiles).filter((file) => {
      const validSize = file.size / 1024 / 1024 <= maxSize
      const validType = acceptedFormats
        ? acceptedFormats.includes(file.type)
        : true

      return validSize && validType
    })

    const updated = multiple ? [...files, ...validFiles] : validFiles

    setFiles(updated)
    onChange?.(updated)
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition",
          dragging ? "border-primary bg-primary/5" : "border-gray-300",
          dragging && draggingClassName,
          dropzoneClassName
        )}
      >
        <Upload className="mx-auto mb-2" />

        <p className={cn("text-sm font-medium", labelClassName)}>
          Arrastra o selecciona un archivo
        </p>

        <p className="text-xs text-gray-500">
          Máx {maxSize}MB
        </p>

        <input
          type="file"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="file-upload"
        />

        <label
          htmlFor="file-upload"
          className={cn(
            "inline-block mt-3 px-4 py-2 border rounded cursor-pointer",
            buttonClassName
          )}
        >
          Seleccionar
        </label>
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {files.map((file, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between border p-2 rounded",
              fileItemClassName
            )}
          >
            <div className="flex items-center gap-2">
              <FileText size={16} />
              <span className={cn("text-sm", fileNameClassName)}>
                {file.name}
              </span>
            </div>

            <X
              size={16}
              className={cn("cursor-pointer", removeIconClassName)}
              onClick={() => {
                const updated = files.filter((_, idx) => idx !== i)
                setFiles(updated)
                onChange?.(updated)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
