import Cookies from "js-cookie";

export const resolvers = {
  Query: {
    token(): string | undefined {
      return Cookies.get("OSSLOCAL_SESSION_TOKEN");
    },
    idToken(): string | undefined {
      return Cookies.get("OSSLOCAL_SESSION_ID_TOKEN");
    },
    refreshToken(): string | undefined {
      return Cookies.get("OSSLOCAL_SESSION_REFRESH_TOKEN");
    },
  },
};
