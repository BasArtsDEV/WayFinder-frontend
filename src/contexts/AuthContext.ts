import { createContext, useContext } from "react";
import type { User } from "../services/user.ts";

interface UserAuthProps {
  isLoading: boolean;
  user?: User | null;
}

export const AuthContext = createContext<UserAuthProps>({
  isLoading: false,
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}
