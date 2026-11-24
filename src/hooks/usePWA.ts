import { useCallback, useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { isApiReachable } from "../services/api.ts";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function usePWA() {
  const [canInstall, setCanInstall] = useState(false),
    [installPrompt, setInstallPrompt] =
      useState<BeforeInstallPromptEvent | null>(null),
    [networkError, setNetworkError] = useState(!navigator.onLine),
    {
      needRefresh: [needRefresh],
      updateServiceWorker,
    } = useRegisterSW(),
    checkNetwork = useCallback(async () => {
      const reachable = await isApiReachable();

      if (reachable) {
        if (networkError) {
          window.location.reload();
        }
        setNetworkError(false);
      } else {
        setNetworkError(true);
      }
    }, [networkError]);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setCanInstall(true);
    }

    function handleAppInstalled() {
      setInstallPrompt(null);
      setCanInstall(false);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    function handleNetworkChange() {
      checkNetwork().catch(() => {
        setNetworkError(true);
      });
    }

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, [checkNetwork]);

  async function installApp() {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setInstallPrompt(null);
      setCanInstall(false);
    }
  }

  function updateApp() {
    updateServiceWorker(true).catch(() => {
      window.location.reload();
    });
  }

  return {
    canInstall,
    checkNetwork,
    installApp,
    needRefresh,
    networkError,
    updateApp,
  };
}
