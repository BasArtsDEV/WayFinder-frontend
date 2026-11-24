import { usePWA } from "../hooks/usePWA.ts";
import Stylesheet from "./Stylesheet.tsx";

export default function PwaBanner() {
  const {
    canInstall,
    checkNetwork,
    installApp,
    needRefresh,
    networkError,
    updateApp,
  } = usePWA();

  if (!networkError && !needRefresh && !canInstall) {
    return null;
  }

  function handleInstall() {
    installApp().catch(() => null);
  }

  function handleReload() {
    checkNetwork().catch(() => null);
  }

  return (
    <>
      <Stylesheet href="/css/Pwa.css" />
      {networkError ? (
        <div className="pwa-banner pwa-banner-offline" role="status">
          <span>Vous êtes hors ligne.</span>
          <button
            className="pwa-banner-button"
            type="button"
            onClick={handleReload}
          >
            Recharger
          </button>
        </div>
      ) : null}

      {needRefresh ? (
        <div className="pwa-banner" role="status">
          <span>Une nouvelle version est disponible.</span>
          <button
            className="pwa-banner-button"
            type="button"
            onClick={updateApp}
          >
            Mettre à jour
          </button>
        </div>
      ) : null}

      {canInstall ? (
        <div className="pwa-banner">
          <span>Installer WayFinder sur votre appareil</span>
          <button
            className="pwa-banner-button"
            type="button"
            onClick={handleInstall}
          >
            Installer
          </button>
        </div>
      ) : null}
    </>
  );
}
