import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";

function WelcomePageView() {
  const { user } = useAuth();

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
          <div className="button-container">
            <input
              id="code"
              name="code"
              type="text"
              placeholder="Entrez un code"
              className="input"
            />

            <button className="btn-app-primary">
              <i className="bi bi-arrow-right-circle"></i>
              <span>Rejoindre</span>
            </button>

            <Link to={ROUTES.HUNTS} className="btn-app-secondary">
              <i className="bi bi-map text-success"></i>
              <span>Voir les chasses</span>
            </Link>
          </div>
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
