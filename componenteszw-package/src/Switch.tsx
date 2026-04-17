import React, { useState } from "react";

type SwitchProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  labelActivo?: string;
  labelInactivo?: string;
  disabled?: boolean;
  className?: string;
};

export function Switch({
  checked = false,
  onChange,
  labelActivo = "Activo",
  labelInactivo = "Inactivo",
  disabled = false,
  className = "",
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className="text-sm font-medium"
        style={{ color: isChecked ? '#BB2111' : undefined }}
      >
        {labelActivo}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        style={{
          backgroundColor: '#D1D5DB',
          height: '28px',
          width: '56px',
          borderRadius: '9999px',
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          border: 'none',
          outline: 'none',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            height: '20px',
            width: '20px',
            borderRadius: '9999px',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transform: isChecked ? 'translateX(4px)' : 'translateX(32px)',
            transition: 'transform 200ms',
          }}
        />
      </button>

      <span
        className="text-sm font-medium"
        style={{ color: !isChecked ? '#BB2111' : undefined }}
      >
        {labelInactivo}
      </span>
    </div>
  );
}