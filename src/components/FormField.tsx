interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
}

function FormField({
  id,
  label,
  name,
  placeholder,
  required = true,
  type,
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
      />
    </div>
  );
}

export default FormField;
