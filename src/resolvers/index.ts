import Cookies from "js-cookie";

export const resolvers = {
  Query: {
    token(): string | undefined {
      return Cookies.get("OSSLOCAL_SESSION_TOKEN");
    },
  },
};
