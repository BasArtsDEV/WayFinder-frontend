import { Link } from "wouter";
import Stylesheet from "../components/Stylesheet.tsx";
import { ROUTES } from "../config.ts";

function NotFoundView() {
  return (
    <div className="notfoundview">
      <Stylesheet href="/css/NotFoundView.css" />
      <div className="not-found-container">
        <img className="not-found-icon" src="/icons/app-icon.png" alt="" />

        <p className="not-found-code" aria-hidden="true">
          404
        </p>
        <h1>Page introuvable</h1>

        <div className="not-found-box">
          <p>
            Oups, vous vous êtes égaré ! La page que vous cherchez n&apos;existe
            pas ou a été déplacée.
          </p>

          <Link href={ROUTES.HOME} className="btn-app-primary">
            <span className="btn-icon-wrapper">
              <img
                className="btn-action-icon"
                src="/icons/home_white.png"
                alt=""
              />
            </span>
            <span>Retourner à l&apos;accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundView;
