import { createContext, useContext } from "react";
import type { User } from "../services/user.ts";

interface UserAuthProps {
  isLoading: boolean;
  error?: string | null;
  user?: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<UserAuthProps>({
  error: null,
  isLoading: false,
  setUser: () => {
    /* empty */
  },
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}
