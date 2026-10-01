import { createContext, useContext } from "react";
import type { User } from "../services/user.ts";

interface UserAuthProps {
  isLoading: boolean;
  error?: string | null;
  user?: User | null;
}

export const AuthContext = createContext<UserAuthProps>({
  error: null,
  isLoading: false,
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}
