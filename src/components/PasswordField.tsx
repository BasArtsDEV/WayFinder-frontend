import { useState } from "react";
import FormField, { type FormFieldProps } from "./FormField";

type PasswordFieldProps = Omit<
  FormFieldProps,
  "type" | "showToggle" | "isVisible" | "onToggle"
>;

export default function PasswordField(props: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <FormField
      {...props}
      type={isVisible ? "text" : "password"}
      showToggle
      isVisible={isVisible}
      onToggle={() => {
        setIsVisible((prev: boolean) => !prev);
      }}
    />
  );
}
