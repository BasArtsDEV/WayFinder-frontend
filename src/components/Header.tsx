import type { ReactNode } from "react";

/**
 * Composant d'en-tête de l'application
 */
function Header({ children }: { children: ReactNode }) {
  return (
    <header className="main-header">
      <div className="header-layout">
        <h1>{children}</h1>
      </div>
    </header>
  );
}

export default Header;
