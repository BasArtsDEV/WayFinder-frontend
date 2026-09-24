import React from "react";

/**
 * Composant du footer de l'application
 */
function Footer({ children }: React.PropsWithChildren) {
  return <footer className="main-footer">{children}</footer>;
}

export default Footer;
