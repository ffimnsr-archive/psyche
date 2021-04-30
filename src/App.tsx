import React from "react";
import log from "loglevel";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { FocusStyleManager } from "@blueprintjs/core";
import { Router } from "@/Router";
import { globalStateVar } from "@/Cache";
import keycloak from "@/services/keycloak";
import { setToken } from "@/utils";

FocusStyleManager.onlyShowFocusOnTabs();

const eventLogger = (event: unknown, error: unknown) => {
  log.trace("eventLogger: onKeycloakEvent =", event, error);
};

export function App(): JSX.Element {
  return (
    <HelmetProvider>
      <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={eventLogger}
        onTokens={(tokens) => {
          log.debug("App: onKeycloakTokens =", tokens);
          setToken(tokens);
          globalStateVar({ token: tokens.token });
        }}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ReactKeycloakProvider>
    </HelmetProvider>
  );
}
