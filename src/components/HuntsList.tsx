import { useState } from "react";
import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import { useTreasureHunts } from "../hooks/useTreasureHunts.ts";
import { filterHunts, type HuntSort } from "../utils/hunt.ts";
import Hunt from "./Hunt.tsx";
import HuntsToolbar from "./HuntsToolbar.tsx";

export default function HuntsList() {
  const { error, hunts, isLoading } = useTreasureHunts(),
    [search, setSearch] = useState<string>(""),
    [sort, setSort] = useState<HuntSort>("recent"),
    visibleHunts = filterHunts(hunts, search, sort);

  return (
    <section className="hunts" aria-labelledby="hunts-title">
      <h1 id="hunts-title" className="hunts-title">
        Chasses au trésor
      </h1>
      <p className="hunts-subtitle">
        Choisissez une chasse publique, ou rejoignez une chasse privée avec son
        code depuis l&apos;accueil.
      </p>

      <HuntsToolbar
        search={search}
        sort={sort}
        onSearchChange={setSearch}
        onSortChange={setSort}
      />

      {isLoading && (
        <p className="hunts-message">Chargement des chasses au trésor...</p>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <p className="hunts-count" aria-live="polite">
          {visibleHunts.length}{" "}
          {visibleHunts.length > 1
            ? "chasses disponibles"
            : "chasse disponible"}
        </p>
      )}

      {visibleHunts.length > 0 && (
        <ul className="hunts-list">
          {visibleHunts.map((hunt) => (
            <Hunt key={hunt.id} hunt={hunt} />
          ))}
        </ul>
      )}

      {!isLoading && !error && visibleHunts.length === 0 && (
        <div className="hunts-empty">
          <i className="bi bi-compass" aria-hidden="true"></i>
          <p>
            {hunts.length
              ? "Aucune chasse ne correspond à votre recherche."
              : "Aucune chasse publique n'est disponible pour le moment."}
          </p>
          <Link href={`~${ROUTES.HOME}`} className="btn-app-primary">
            <span className="btn-icon-wrapper">
              <img src="/icons/enter.png" className="btn-action-icon" alt="" />
            </span>
            <span>Rejoindre avec un code</span>
          </Link>
        </div>
      )}
    </section>
  );
}
