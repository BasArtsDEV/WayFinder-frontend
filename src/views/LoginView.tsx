function LoginView() {
  return (
    <div className="loginview">
      <div className="login-container">
        <h1>Se connecter</h1>
        <form className="login-form">
          <div className="form-mail">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div className="form-password">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Entrez votre mot de passe ..."
              required
            />
            <p className="mt-4">Vous n'avez pas de compte ? Inscrivez-vous.</p>
          </div>
          <div className="form-submit">
            <button type="submit" className="btn-login">
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
          <a className="btn-register">
            <div className="btn-icon-wrapper">
              <img
                className="btn-action-icon"
                src="/icons/home.png"
                alt="Retour"
              />
            </div>
            <span>Retourner à l'accueil</span>
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
