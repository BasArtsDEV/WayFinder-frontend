import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import { useJoinByCode } from "../hooks/useJoinByCode.ts";

function WelcomePageView() {
  const { user } = useAuth(),
    { code, error, handleSubmit, isLoading, setCode } = useJoinByCode();

  return (
    <div className="welcomepageview">
      <div className="welcome-container">
        <div className="welcome-container-icon">
          <img
            className="welcome-container-icon"
            src="/icons/app-icon.png"
            alt="Icone de l'application"
          />
        </div>

        <div className="welcome-container-text">
          <h1>Bienvenue !</h1>
          <p>
            Pour commencer à créer ou à jouer à une carte au trésor, veuillez
            utiliser un compte.
          </p>
        </div>

        <div className="home-divider"></div>

        {user ? (
          <form className="button-container" onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger m-0" role="alert">
                {error}
              </div>
            )}

            <label htmlFor="code" className="visually-hidden">
              Code d&apos;invitation
            </label>
            <input
              id="code"
              name="code"
              type="text"
              placeholder="Entrez un code"
              className="input"
              autoComplete="off"
              maxLength={6}
              value={code}
              onChange={(event) => {
                setCode(event.target.value.toUpperCase());
              }}
            />

            <button
              type="submit"
              className="btn-app-primary"
              disabled={isLoading}
            >
              <i className="bi bi-arrow-right-circle" aria-hidden="true"></i>
              <span>{isLoading ? "Recherche..." : "Rejoindre"}</span>
            </button>

            <Link to={ROUTES.HUNTS} className="btn-app-secondary">
              <i className="bi bi-map text-success"></i>
              <span>Voir les chasses</span>
            </Link>
          </form>
        ) : (
          <div className="button-container">
            <Link to={ROUTES.LOGIN} className="btn-app-primary">
              <div className="btn-icon-wrapper">
                <img
                  className="btn-action-icon"
                  src="/icons/enter.png"
                  alt="Connexion"
                />
              </div>
              <span>Connexion</span>
            </Link>

            <Link to={ROUTES.REGISTER} className="btn-app-secondary">
              <div className="btn-icon-wrapper">
                <img
                  className="btn-action-icon"
                  src="/icons/add-user.png"
                  alt="Inscription"
                />
              </div>
              <span>Créer mon compte</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomePageView;
