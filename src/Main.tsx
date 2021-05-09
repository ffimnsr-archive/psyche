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
import type { KeycloakTokenParsed } from "keycloak-js";

enum Role {
  Manager = 2,
  Member = 1,
  Anonymous = -1,
}

const MANAGER_GRAPH_URI = process.env.REACT_APP_RS_URI + "/_/graphql";
const MEMBER_GRAPH_URI = process.env.REACT_APP_RS_URI + "/u/graphql";
const ANONYMOUS_GRAPH_URI = process.env.REACT_APP_RS_URI + "/o/graphql";

const WHITELIST_DOMAINS = ["localhost", "open.se-same.com"];

/**
 * Checks whether the role is manager.
 * @param o The operation context of apollo.
 * @returns Returns true if the role is manager.
 */
function isManager(o: Operation) {
  return o.getContext().role === Role.Manager;
}

/**
 * Checks whether the role is member.
 * @param o The operation context of apollo.
 * @returns Returns true if the role is member.
 */
function isMember(o: Operation) {
  return o.getContext().role === Role.Member;
}

/**
 * Renders the app virtual dom to the root container of
 * HTML template.
 */
function main(): void {
  if (process.env.NODE_ENV !== "production") {
    log.setLevel(log.levels.INFO);
  } else {
    log.setLevel(log.levels.INFO);
  }

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
    const decodedToken = jwtDecode<KeycloakTokenParsed>(token);
  
    const roles = decodedToken.realm_access?.roles ?? [];
    let role = Role.Anonymous;
    if (roles.includes("manager")) {
      role = Role.Manager;
    } else if (roles.includes("member")) {
      role = Role.Member;
    }
  
    const context = {
      role,
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

  const redirectCheckMember = new ApolloLink((operation, forward) => {
    return forward(operation);
  })
    .split(isMember, memberHttpLink, anonymousHttpLink);
  
  const apolloLink = new ApolloLink((operation, forward) => {
    return forward(operation);
  })
    .split(isManager, managerHttpLink, redirectCheckMember);
  
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, apolloLink]),
    cache,
    resolvers,
  });

  Render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("root"),
  );
}

if (_.includes(WHITELIST_DOMAINS, window.location.hostname)) {
  main();

  if (module.hot) {
    module.hot.accept("@/App", () => {
      main();
    });
  }
}
