function WelcomePageView() {
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

        <div className="button-container">
          <a className="btn-app-primary">
            <div className="btn-icon-wrapper">
              <img
                className="btn-action-icon"
                src="/icons/enter.png"
                alt="Connexion"
              />
            </div>
            <span>Connexion</span>
          </a>

          <a className="btn-app-secondary">
            <div className="btn-icon-wrapper">
              <img
                className="btn-action-icon"
                src="/icons/add-user.png"
                alt="Inscription"
              />
            </div>
            <span>Créer mon compte</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default WelcomePageView;
