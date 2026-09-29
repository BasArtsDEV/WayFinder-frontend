import React from "react";

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({
  id,
  label,
  name,
  onChange,
  placeholder,
  required = true,
  type,
  value,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormField;
