import log from "loglevel";
import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { cache } from "@/Cache";
import { resolvers } from "@/resolvers";
import { GRAPH_URI } from "@/utils/globals";

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
  const token = "hello-world";

  log.trace(`Bearer ${token}`);
  const context = {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return context;
});

const httpLink = new HttpLink({ uri: GRAPH_URI });

const ApolloClientInstance = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
  resolvers,
});

export { ApolloClientInstance };
