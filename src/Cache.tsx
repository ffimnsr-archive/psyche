import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import Cookies from "js-cookie";
import { GlobalState } from "@/models/GlobalState";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        globalState: {
          read() {
            return globalStateVar();
          },
        },
      },
    },
  },
});

export const globalStateVar: ReactiveVar<GlobalState> = makeVar<GlobalState>({
  token: Cookies.get("OSSLOCAL_SESSION_TOKEN"),
  idToken: Cookies.get("OSSLOCAL_SESSION_ID_TOKEN"),
  refreshToken: Cookies.get("OSSLOCAL_SESSION_REFRESH_TOKEN"),
});
