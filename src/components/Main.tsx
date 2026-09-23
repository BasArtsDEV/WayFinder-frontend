import React from "react";
import Router from "../components/Router";

/**
 * Composant main de l'application
 */
function Main({ children }: { children?: React.ReactNode }) {
  return (
      <main>
        <Router />
        {children}
      </main>);
}

export default Main;
