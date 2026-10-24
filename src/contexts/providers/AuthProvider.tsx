import { type PropsWithChildren, useEffect, useState } from "react";
import { getMe, type User } from "../../services/user.ts";
import { AuthContext } from "../AuthContext.ts";

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(true);

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
