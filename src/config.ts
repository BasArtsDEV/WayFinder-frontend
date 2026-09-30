export const CONFIG = {
    BASE_URL: "https://localhost:8000/api/",
    ME: "https://localhost:8000/api/me",
  } as const,
  ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    USER_VIEW: "/user/me",
  } as const;
