export const CONFIG = {
    BASE_URL: "https://localhost:8000/api/",
    ENROLLMENTS: "https://localhost:8000/api/enrollments",
    ME: "https://localhost:8000/api/me",
    TREASURE_HUNTS: "https://localhost:8000/api/treasure_hunts",
  } as const,
  ROUTES = {
    HOME: "/",
    HUNTS: "/hunts",
    LOGIN: "/login",
    REGISTER: "/register",
    USER_VIEW: "/user/me",
  } as const;
