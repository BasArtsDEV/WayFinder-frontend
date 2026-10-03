import type { ReactNode } from "react";
import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import { getUserAvatar } from "../services/user.ts";

/**
 * Application header component
 */
function Header({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-layout">
        <div className="header-element">
          <div className="header-button">
            <img
              className="header-button-icon"
              src="/icons/settings.png"
              alt="Paramètres"
            />
          </div>
        </div>

        <div className="header-element">
          <h1 className="m-0 title-text-app">{children}</h1>
        </div>

        <Link to={ROUTES.HUNTS}>Chasses publiques</Link>

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
