import Cookies from "js-cookie";

export const resolvers = {
  Query: {
    isAuthenticated(): boolean {
      return !!Cookies.get("OSSLOCAL_SESSION_TOKEN");
    },
  },
};
