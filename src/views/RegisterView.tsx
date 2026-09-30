import RegisterForm from "../components/RegisterForm.tsx";
import { useRegister } from "../hooks/useRegister.ts";

function RegisterView() {
  const { error, handleSubmit, isLoading, ...fields } = useRegister();

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
