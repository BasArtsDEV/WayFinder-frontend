import { createContext, useContext } from "react";
import type { User } from "../services/user.ts";

interface UserAuthProps {
  loading: boolean;
  user?: User | null;
}

const AuthContext = createContext<UserAuthProps>({
  loading: false,
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}
