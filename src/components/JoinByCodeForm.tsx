import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import { useJoinByCode } from "../hooks/useJoinByCode.ts";

export default function JoinByCodeForm() {
  const { code, error, handleSubmit, isLoading, setCode } = useJoinByCode();

  return (
    <form className="button-container" onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger m-0" role="alert">
          {error}
        </div>
      )}

      <label htmlFor="code" className="visually-hidden">
        Code d&apos;invitation
      </label>
      <input
        id="code"
        name="code"
        type="text"
        placeholder="Entrez un code"
        className="input"
        autoComplete="off"
        maxLength={6}
        value={code}
        onChange={(event) => {
          setCode(event.target.value.toUpperCase());
        }}
      />

      <button type="submit" className="btn-app-primary" disabled={isLoading}>
        <span className="btn-icon-wrapper">
          <img className="btn-action-icon" src="/icons/enter.png" alt="" />
        </span>
        <span>{isLoading ? "Recherche..." : "Rejoindre"}</span>
      </button>

      <Link to={ROUTES.HUNTS} className="btn-app-secondary">
        <span className="btn-icon-wrapper">
          <i className="bi bi-map-fill" aria-hidden="true"></i>
        </span>
        <span>Voir les chasses</span>
      </Link>
    </form>
  );
}
