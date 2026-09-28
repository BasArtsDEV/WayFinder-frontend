import { Link } from "wouter";
import FormField from "../components/FormField.tsx";

function RegisterView() {
  return (
    <div className="registerview">
      <div className="register-container">
        <h1>Créer mon compte</h1>
        <form className="register-form">
          <FormField
            label="Nom d'utilisateur"
            type="text"
            name="username"
            id="username"
            placeholder="Entrez un nom d'utilisateur..."
          />
          <FormField
            label="Adresse e-mail"
            type="email"
            name="email"
            id="email"
            placeholder="exemple@mail.com"
          />
          <div className="form-field-row">
            <FormField
              label="Prénom"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Jean"
            />
            <FormField
              label="Nom"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Némarre"
            />
          </div>
          <FormField
            label="Mot de passe"
            type="password"
            name="password"
            id="password"
            placeholder="Saisissez un mot de passe..."
          />
          <FormField
            label="Confirmer le mot de passe"
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Récrivez votre mot de passe..."
          />
          <p className="mt-1">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="btn-app-hypertext">
              Connectez-vous
            </Link>
            .
          </p>
          <div className="form-submit">
            <button type="submit" className="btn-app-primary">
              <span className="btn-icon-wrapper">
                <img
                  src="/icons/check.png"
                  className="btn-action-icon"
                  alt=""
                />
              </span>
              <span>Valider</span>
            </button>
          </div>
          <Link href="/" className="btn-app-secondary">
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

export default RegisterView;
