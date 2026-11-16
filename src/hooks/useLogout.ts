import { useLocation } from "wouter";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import { logout } from "../services/authService.ts";

export function useLogout() {
  const { setUser } = useAuth(),
    [, setLocation] = useLocation();

  return () => {
    logout();
    setUser(null);
    setLocation(ROUTES.HOME);
  };
}
