import React from "react";

export interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
  isVisible?: boolean;
  onToggle?: () => void;
}

function FormField({
  id,
  isVisible = false,
  label,
  name,
  onChange,
  onToggle,
  placeholder,
  required = true,
  showToggle = false,
  type,
  value,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      <div className="form-field-input">
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />

        {showToggle && (
          <button
            type="button"
            className="form-field-toggle"
            onClick={onToggle}
            aria-pressed={isVisible}
          >
            <i className={isVisible ? "bi bi-eye" : "bi bi-eye-slash"}></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default FormField;
