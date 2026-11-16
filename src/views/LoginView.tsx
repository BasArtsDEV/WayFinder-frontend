import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import FormField from "../components/FormField.tsx";
import PasswordField from "../components/PasswordField.tsx";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
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
    } = useLogin(),
    { user } = useAuth(),
    [, setLocation] = useLocation();

  useEffect(() => {
    if (user) {
      setLocation(ROUTES.HOME);
    }
  }, [user]);

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

          <PasswordField
            label="Mot de passe"
            name="password"
            id="password"
            placeholder="Entrez votre mot de passe ..."
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <p className="mt-4">
            Vous n&apos;avez pas de compte ?&nbsp;
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
                  alt="Icône de validation de l'inscription"
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
                alt="Retour à l'accueil"
              />
            </div>
            <span>Retourner à l&apos;accueil</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
