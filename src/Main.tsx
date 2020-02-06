import React from "react";
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

const ENDPOINT_URI = process.env.REACT_APP_REST_URI || "http://localhost:4000/api";
const GRAPH_URI = process.env.REACT_APP_GRAPH_URI || "http://localhost:4000/graphql";
const WHITELIST_DOMAINS = ["localhost", "open.se-same.com"];

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: M: ${message} L: ${locations} P: ${path}`);
    });
  }

  if (networkError) {
    console.log(`[Network error ${operation.operationName}]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");
  const context = {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${sessionStorage.getItem("token")}` : "",
    },
  };

  return context;
});

const restLink = new RestLink({ uri: ENDPOINT_URI });

const httpLink = new HttpLink({ uri: GRAPH_URI });

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, restLink, authLink, httpLink]),
  cache,
  resolvers,
});

const data = {
  isAuthenticated: !!sessionStorage.getItem("token"),
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
