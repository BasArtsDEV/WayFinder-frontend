import { useLogout } from "../hooks/useLogout.ts";

export default function LogoutButton() {
  const handleLogout = useLogout();

  return (
    <button
      type="button"
      className="btn-app-secondary btn-logout"
      onClick={handleLogout}
    >
      <div className="btn-icon-wrapper">
        <i className="bi bi-box-arrow-right btn-action-icon"></i>
      </div>
      <p className="btn-text">Se déconnecter</p>
    </button>
  );
}
