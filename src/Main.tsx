import React from "react";
import log from "loglevel";
import _ from "lodash";
import { render as Render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { App } from "@/App";
import "@/assets/styles/main.scss";
import { ApolloClientInstance } from "@/services/apollo";

const WHITELIST_DOMAINS = ["localhost", "sesame.7f000001.nip.io", "open.se-same.com"];

log.setLevel(process.env.NODE_ENV !== "production" ? log.levels.DEBUG : log.levels.INFO);

/**
 * Renders the app virtual dom to the root container of
 * HTML template.
 */
function main(): void {
  Render(
    <ApolloProvider client={ApolloClientInstance}>
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
