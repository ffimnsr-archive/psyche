import React from "react";
import log from "loglevel";
import Cookies from "js-cookie";
import _ from "lodash";
import { render as Render } from "react-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, Operation } from "apollo-link";
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

enum Role {
  Manager = 2,
  Member = 1,
  Anonymous = -1,
}

const MANAGER_GRAPH_URI = process.env.REACT_APP_RS_URI + "/_/graphql";
const MEMBER_GRAPH_URI = process.env.REACT_APP_RS_URI + "/u/graphql";
const ANONYMOUS_GRAPH_URI = process.env.REACT_APP_RS_URI + "/o/graphql";

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
const managerHttpLink = new HttpLink({ uri: MANAGER_GRAPH_URI });
const memberHttpLink = new HttpLink({ uri: MEMBER_GRAPH_URI });
const anonymousHttpLink = new HttpLink({ uri: ANONYMOUS_GRAPH_URI });

function isManager(o: Operation) {
  return o.getContext().role === Role.Manager;
}

function isMember(o: Operation) {
  return o.getContext().role === Role.Member;
}

const apolloLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    role: Role.Member,
  });
  return forward(operation);
}).split(
  isManager,
  managerHttpLink,
  new ApolloLink((operation, forward) => {
    return forward(operation);
  }).split(isMember, memberHttpLink, anonymousHttpLink),
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, restLink, authLink, apolloLink]),
  cache,
  resolvers,
});

const data = {
  token: Cookies.get("OSSLOCAL_SESSION_TOKEN"),
  idToken: Cookies.get("OSSLOCAL_SESSION_ID_TOKEN"),
  refreshToken: Cookies.get("OSSLOCAL_SESSION_REFRESH_TOKEN"),
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
