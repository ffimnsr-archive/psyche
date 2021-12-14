import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import { GlobalState } from "@/models/global_state";

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
  token: "",
});
