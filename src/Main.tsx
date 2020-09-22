import React from "react";
import log from "loglevel";
import Cookies from "js-cookie";
import _ from "lodash";
import { render as Render } from "react-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { RestLink } from "apollo-link-rest";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloProvider } from "react-apollo";
import { App } from "@/App";
import { resolvers } from "@/resolvers";
import "@/assets/styles/main.scss";

if (process.env.NODE_ENV !== "production") {
  log.setLevel(log.levels.INFO);
} else {
  log.setLevel(log.levels.INFO);
}

const GRAPH_URI = process.env.REACT_APP_RS_URI + "/_/graphql";
const REST_URI = process.env.REACT_APP_RS_URI;
const WHITELIST_DOMAINS = ["localhost", "open.se-same.com"];

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      log.error(`[GraphQL error]: M: ${message} L: ${locations} P: ${path}`);
    });
  }

  if (networkError) {
    log.error(`[Network error ${operation.operationName}]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("OSSLOCAL_SESSION_TOKEN");
  const context = {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return context;
});

const restLink = new RestLink({ uri: REST_URI });

const httpLink = new HttpLink({ uri: GRAPH_URI });

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, restLink, authLink, httpLink]),
  cache,
  resolvers,
});

const data = {
  isAuthenticated: !!Cookies.get("OSSLOCAL_SESSION_TOKEN"),
};

cache.writeData({ data });
client.onResetStore(async () => cache.writeData({ data }));

function render(): void {
  Render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("root"),
  );
}

if (_.includes(WHITELIST_DOMAINS, window.location.hostname)) {
  render();

  if (module.hot) {
    module.hot.accept("@/App", () => {
      render();
    });
  }
}
