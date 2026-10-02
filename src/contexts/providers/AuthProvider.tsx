import { type PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ROUTES } from "../../config.ts";
import { logout } from "../../services/authService.ts";
import { getMe, type User } from "../../services/user.ts";
import { AuthContext } from "../AuthContext.ts";

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(true),
    [, setLocation] = useLocation(),
    logoutUser = (): void => {
      logout();
      setUser(null);
      setLocation(ROUTES.LOGIN);
    };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    getMe()
      .then((data: User) => {
        setIsLoading(true);
        setUser(data);
      })
      .catch(() => {
        setError("Vous n'êtes pas authentifié !");
        logoutUser();
      })
      .finally(() => {
        setIsLoading(false);
        setError(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ error, isLoading, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
}
