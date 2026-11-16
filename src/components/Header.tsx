import type { ReactNode } from "react";
import { Link, useRoute } from "wouter";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import { getUserAvatar } from "../services/user.ts";
import GameExitButton from "./GameExitButton.tsx";

/**
 * Application header component
 */
function Header({ children }: { children: ReactNode }) {
  const { user } = useAuth(),
    [isPlaying, gameParams] = useRoute(`${ROUTES.GAME}/:id`);

  return (
    <header className="header">
      <div className="header-layout">
        {isPlaying ? (
          <GameExitButton enrollmentId={Number(gameParams.id)} />
        ) : (
          <Link to={ROUTES.HOME} className="header-element header-button">
            <i className="bi bi-house-door-fill home__icon"></i>
          </Link>
        )}

        <div className="header-element">
          <h1 className="m-0 title-text-app">{children}</h1>
        </div>

        {user ? (
          <Link to={ROUTES.USER_VIEW} className="avatar-section">
            <div className="header-avatar-circle">
              <img
                src={getUserAvatar(user.id.toString())}
                alt={`Avatar de ${user.username}`}
                className="avatar-field-icon"
              />
            </div>
          </Link>
        ) : (
          <Link to={ROUTES.LOGIN}>
            <div className="header-element">
              <div className="header-button">
                <img
                  className="header-button-icon"
                  src="/icons/user.png"
                  alt="Compte"
                />
              </div>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
