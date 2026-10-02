import { Link } from "wouter";
import { ROUTES } from "../config.ts";

/**
 * Displayed view if used route doesn't exist (Erreur 404)
 */
function NotFoundView() {
  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Erreur 404 : Page non trouvée</h2>
      </div>

      <Link className="link_btn" href={ROUTES.HOME}>
        Retourner à l&apos;accueil
      </Link>
    </div>
  );
}

export default NotFoundView;
