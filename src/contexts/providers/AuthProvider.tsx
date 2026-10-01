import { type PropsWithChildren, useEffect, useState } from "react";
import { logout } from "../../services/authService.ts";
import { getMe, type User } from "../../services/user.ts";
import { AuthContext } from "../AuthContext.ts";

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null),
    [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    getMe()
      .then((data: User) => {
        setUser(data);
      })
      .catch(() => {
        logout();
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}
