const API_BASE_URL = "https://localhost:8000/api",
  CONFIG = {
    BASE_URL: API_BASE_URL,
    ENROLLMENTS: `${API_BASE_URL}/enrollments`,
    ME: `${API_BASE_URL}/me`,
    TEAMS: `${API_BASE_URL}/teams`,
    TREASURE_HUNTS: `${API_BASE_URL}/treasure_hunts`,
  },
  ROUTES = {
    HOME: "/",
    HUNTS: "~/hunts",
    LOGIN: "/login",
    REGISTER: "/register",
    TEAMS: "/teams",
    USER_VIEW: "/user/me",
    VERIFY_EMAIL: "/verify-email",
  };

export { CONFIG, ROUTES };
