import React from "react";
import Router from "../components/Router";

/**
 * Main component of the application
 */
function Main({ children }: { children?: React.ReactNode }) {
  return (
    <main className="app-main flex-grow-1">
      <Router />
      {children}
    </main>
  );
}

export default Main;
