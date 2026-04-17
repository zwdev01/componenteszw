import React, { useState, useRef, useEffect } from "react";
import { cn } from "./lib/utils";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  multiple?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
  hint?: string;
  value?: string | string[];
  onChange?: (value: any) => void;
  className?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  searchClassName?: string;
};

export const Select: React.FC<SelectProps> = ({
  options,
  multiple = false,
  placeholder = "Select...",
  label,
  required,
  hint,
  value,
  onChange,
  className,
  triggerClassName,
  dropdownClassName,
  optionClassName,
  labelClassName,
  hintClassName,
  searchClassName,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const isSelected = (val: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(val);
    }
    return value === val;
  };

  const handleSelect = (val: string) => {
    if (multiple) {
      let newValue = Array.isArray(value) ? [...value] : [];
      if (newValue.includes(val)) {
        newValue = newValue.filter((v) => v !== val);
      } else {
        newValue.push(val);
      }
      onChange?.(newValue);
    } else {
      onChange?.(val);
      setOpen(false);
    }
  };

  const removeItem = (val: string) => {
    if (!multiple || !Array.isArray(value)) return;
    onChange?.(value.filter((v) => v !== val));
  };

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("w-[300px] text-sm relative", className)} ref={ref}>
      {label && (
        <label className={cn("block mb-1 font-medium", labelClassName)}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={cn(
          "border rounded-lg px-3 py-2 flex items-center cursor-pointer justify-between",
          triggerClassName
        )}
        onClick={() => setOpen(!open)}
      >
        <span className="flex-1 flex flex-wrap gap-2">
          {multiple && Array.isArray(value) ? (
            value.length > 0 ? (
              value.map((val) => {
                const opt = options.find((o) => o.value === val);
                return (
                  <span
                    key={val}
                    className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                  >
                    {opt?.label}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(val);
                      }}
                    >
                      ×
                    </button>
                  </span>
                );
              })
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )
          ) : (
            <span>
              {options.find((o) => o.value === value)?.label || (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </span>
          )}
        </span>
        <span style={{ 
          transition: 'transform 200ms', 
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          marginLeft: '8px',
          flexShrink: 0,
        }}>
          ▾
        </span>
      </div>

      {open && (
        <div
          className={cn(
            "border rounded-lg mt-2 p-2 bg-white shadow absolute w-full z-50",
            dropdownClassName
          )}
        >
          <input
            type="text"
            placeholder="Buscar..."
            className={cn(
              "w-full border px-2 py-1 mb-2 rounded",
              searchClassName
            )}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="max-h-40 overflow-auto">
            {filtered.map((opt) => (
              <div
                key={opt.value}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer",
                  optionClassName
                )}
                onClick={() => handleSelect(opt.value)}
              >
                {multiple && (
                  <input
                    type="checkbox"
                    checked={isSelected(opt.value)}
                    readOnly
                  />
                )}
                <span>{opt.label}</span>
                {!multiple && isSelected(opt.value) && (
                  <span className="ml-auto">✔</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {hint && (
        <p className={cn("text-gray-400 mt-1 text-xs", hintClassName)}>
          {hint}
        </p>
      )}
    </div>
  );
};