import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ROUTES } from "../config.ts";
import { getMe, type User } from "../services/user.ts";

function UserProfileView() {
  const [user, setUser] = useState<User | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(true),
    [error, setError] = useState<string | null>(null),
    [, setLocation] = useLocation();

  useEffect(() => {
    getMe()
      .then((data: User) => {
        setIsLoading(true);
        setUser(data);
      })
      .catch(() => {
        setError("Vous n'êtes pas authentifié !");
        setLocation(ROUTES.LOGIN);
      })
      .finally(() => {
        setIsLoading(false);
        setError(null);
      });
  }, []);

  if (isLoading) {
    return <div>Chargement de votre profil.</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Erreur : {error}</div>;
  }

  if (!user) {
    return <div>Aucun utilisateur connecté.</div>;
  }

  return (
    <div className="container">
      <div>AVATAR</div>
      <p>@{user.username}</p>

      {/* Column */}
      <div className="data-container">
        {/* Row */}
        <div className="data">
          <i></i>
          <p>
            Identité
            {user.firstName} {user.lastName}
          </p>
        </div>

        {/* Row */}
        <div className="data">
          <p>
            <strong>Adresse e-mail</strong>
            {user.email}
          </p>
        </div>

        {/* Row */}
        <div className="data">
          <p>
            <strong>Membre depuis</strong>
            {new Date(user.createdAt).toLocaleString("default", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfileView;
