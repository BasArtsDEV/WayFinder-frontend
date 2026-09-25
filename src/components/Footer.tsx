import React from "react";

/**
 * Application footer component
 */
function Footer({ children }: React.PropsWithChildren) {
  return <footer className="main-footer">{children}</footer>;
}

export default Footer;
