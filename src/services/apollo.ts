import log from "loglevel";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { ApolloClient, ApolloLink, Operation, HttpLink, NextLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
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

/**
 * Checks whether the role is manager.
 * @param o The operation context of apollo.
 * @returns Returns true if the role is manager.
 */
function isManager(o: Operation) {
  log.trace("isManager: operation name =", o.operationName);

  if (o.operationName === "_RequestProfileQuery") return false;

  return o.getContext().role === Role.Manager;
}

/**
 * Checks whether the role is member.
 * @param o The operation context of apollo.
 * @returns Returns true if the role is member.
 */
function isMember(o: Operation) {
  log.trace("isMember: operation name =", o.operationName);

  if (o.operationName === "_RequestProfileQuery") return false;

  return o.getContext().role === Role.Member;
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
const anonHttpLink = new HttpLink({ uri: ANONYMOUS_GRAPH_URI });

const redirectCheckMember = new ApolloLink((operation: Operation, forward: NextLink) => {
  return forward(operation);
}).split(isMember, memberHttpLink, anonHttpLink);

const apolloLink = new ApolloLink((operation: Operation, forward: NextLink) => {
  return forward(operation);
}).split(isManager, managerHttpLink, redirectCheckMember);

const ApolloClientInstance = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, apolloLink]),
  cache,
  resolvers,
});

export { ApolloClientInstance };
