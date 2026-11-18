import { useEffect } from "react";
import { useLocation } from "wouter";
import Loader from "../components/Loader.tsx";
import Stylesheet from "../components/Stylesheet.tsx";
import UserSettings from "../components/UserSettings.tsx";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";

function UserSettingsView() {
  const { isLoading, user } = useAuth(),
    [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation(ROUTES.LOGIN);
    }
  }, [isLoading, user]);

  if (isLoading || !user) {
    return <Loader label="Chargement de vos paramètres..." />;
  }

  return (
    <div className="settingsview">
      <Stylesheet href="/css/UserSettingsView.css" />
      <UserSettings user={user} />
    </div>
  );
}

export default UserSettingsView;
