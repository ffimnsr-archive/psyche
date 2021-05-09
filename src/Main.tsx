import React from "react";
import log from "loglevel";
import _ from "lodash";
import { render as Render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { App } from "@/App";
import "@/assets/styles/main.scss";
import { GraphQLClient } from "@/services/apollo";

const WHITELIST_DOMAINS = ["localhost", "open.se-same.com"];

if (process.env.NODE_ENV !== "production") {
  log.setLevel(log.levels.INFO);
} else {
  log.setLevel(log.levels.INFO);
}

/**
 * Renders the app virtual dom to the root container of
 * HTML template.
 */
function main(): void {
  Render(
    <ApolloProvider client={GraphQLClient}>
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
