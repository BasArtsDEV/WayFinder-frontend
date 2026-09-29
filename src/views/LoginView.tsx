import { Link } from "wouter";
import FormField from "../components/FormField.tsx";
import { ROUTES } from "../config.ts";
import { useLogin } from "../hooks/useLogin.ts";

function LoginView() {
  const {
    email,
    error,
    handleSubmit,
    isLoading,
    password,
    setEmail,
    setPassword,
  } = useLogin();

  return (
    <div className="loginview">
      <div className="login-container">
        <h1>Se connecter</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <FormField
            label="Adresse e-mail"
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <FormField
            label="Mot de passe"
            type="password"
            name="password"
            id="password"
            placeholder="Entrez votre mot de passe ..."
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <p className="mt-4">
            Vous n'avez pas de compte ?{" "}
            <Link href={ROUTES.REGISTER} className="btn-app-hypertext">
              Inscrivez-vous
            </Link>
            .
          </p>
          <div className="form-submit">
            <button
              type="submit"
              className="btn-app-primary"
              disabled={isLoading}
            >
              <span className="btn-icon-wrapper">
                <img
                  src="/icons/check.png"
                  className="btn-action-icon"
                  alt=""
                />
              </span>
              <span>{isLoading ? "Connexion..." : "Valider"}</span>
            </button>
          </div>
          <Link href={ROUTES.HOME} className="btn-app-secondary">
            <div className="btn-icon-wrapper">
              <img
                className="btn-action-icon"
                src="/icons/home.png"
                alt="Retour"
              />
            </div>
            <span>Retourner à l'accueil</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
