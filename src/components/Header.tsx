import type { ReactNode } from "react";

/**
 * Application header component
 */
function Header({ children }: { children: ReactNode }) {
  return (
    <header className="header">
      <div className="header-layout">
        <a className="header-element">
          <a className="header-button">
            <img
              className="header-button-icon"
              src="/icons/user.png"
              alt="Compte"
            />
          </a>
        </a>
        <div className="header-element">
          <h1 className="m-0 title-text-app">{children}</h1>
        </div>
        <a className="header-element">
          <a className="header-button">
            <img
              className="header-button-icon"
              src="/icons/settings.png"
              alt="Paramètres"
            />
          </a>
        </a>
      </div>
    </header>
  );
}

export default Header;
