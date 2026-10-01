import { useLocation } from "wouter";
import RegisterForm from "../components/RegisterForm.tsx";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import { useRegister } from "../hooks/useRegister.ts";

function RegisterView() {
  const { error, handleSubmit, isLoading, ...fields } = useRegister(),
    { user } = useAuth(),
    [, setLocation] = useLocation();

  if (user) setLocation(ROUTES.USER_VIEW);

  return (
    <div className="registerview">
      <div className="register-container">
        <h1>Créer mon compte</h1>
        <RegisterForm
          error={error}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          fields={fields}
        />
      </div>
    </div>
  );
}

export default RegisterView;
