import React from "react";
import log from "loglevel";
import { render as Render } from "react-dom";
import { App } from "@/App";
import { isProduction } from "@/utils/globals";
import "@/assets/styles/main.css";

const WHITELIST_DOMAINS = [
  "localhost",
  "sesame.7f000001.nip.io",
  "sesame.ac12ee4e.nip.io",
  "open.se-same.com",
];

log.setLevel(isProduction() ? log.levels.DEBUG : log.levels.INFO);

/**
 * Renders the app virtual dom to the root container of
 * HTML template.
 */
function main(): void {
  Render(<App />, document.getElementById("root"));
}

if (WHITELIST_DOMAINS.includes(window.location.hostname)) {
  main();

  if (module.hot) {
    module.hot.accept("@/App", () => {
      main();
    });
  }
}
