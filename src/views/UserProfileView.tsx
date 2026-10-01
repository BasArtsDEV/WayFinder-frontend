import { useLocation } from "wouter";
import UserProfile from "../components/UserProfile.tsx";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";

function UserProfileView() {
  const { error, isLoading, user } = useAuth(),
    [, setLocation] = useLocation();

  if (isLoading) {
    return <div>Chargement de votre profil.</div>;
  }

  if (error || !user) {
    setLocation(ROUTES.HOME);
    return <div style={{ color: "red" }}>Erreur : {error}</div>;
  }

  return <UserProfile user={user} />;
}

export default UserProfileView;
