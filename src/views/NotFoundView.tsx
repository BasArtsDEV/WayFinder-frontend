import { Link } from "wouter";

/**
 * Vue affichée en cas de route inexistante (Erreur 404)
 */
function NotFoundView() {
  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Erreur 404 : Page non trouvée</h2>
      </div>
      <Link href="/">
        <a className="link_btn">Retourner à l'accueil</a>
      </Link>
    </div>
  );
}

export default NotFoundView;
