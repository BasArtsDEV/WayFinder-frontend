import { useEffect } from "react";
import { useLocation } from "wouter";
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
    return <div>Chargement de vos paramètres.</div>;
  }

  return (
    <div className="settingsview">
      <UserSettings user={user} />
    </div>
  );
}

export default UserSettingsView;
