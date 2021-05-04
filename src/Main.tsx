import React from "react";
import log from "loglevel";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import _ from "lodash";
import { render as Render } from "react-dom";
import {
  ApolloClient,
  ApolloLink,
  Operation,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { App } from "@/App";
import { cache } from "@/Cache";
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

interface Token {
  exp: string;
  // TODO: this here needs to be defined.
}

const MANAGER_GRAPH_URI = process.env.REACT_APP_RS_URI + "/_/graphql";
const MEMBER_GRAPH_URI = process.env.REACT_APP_RS_URI + "/u/graphql";
const ANONYMOUS_GRAPH_URI = process.env.REACT_APP_RS_URI + "/o/graphql";

const WHITELIST_DOMAINS = ["localhost", "open.se-same.com"];

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
  const token = Cookies.get("OSSLOCAL_SESSION_TOKEN") ?? "";
  const decodedToken = jwtDecode<Token>(token);
  const context = {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return context;
});

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
  link: ApolloLink.from([errorLink, authLink, apolloLink]),
  cache,
  resolvers,
});

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
