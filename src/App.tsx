import React from "react";
import log from "loglevel";
import Cookies from "js-cookie";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useApolloClient } from "react-apollo";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { FocusStyleManager } from "@blueprintjs/core";
import { Router } from "@/Router";
import keycloak from "@/services/keycloak";

FocusStyleManager.onlyShowFocusOnTabs();

const eventLogger = (event: unknown, error: unknown) => {
  log.info("onKeycloakEvent", event, error);
};

export function App(): JSX.Element {
  const client = useApolloClient();

  return (
    <HelmetProvider>
      <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={eventLogger}
        onTokens={(tokens) => {
          log.trace("onKeycloakTokens", tokens);

          if (tokens.token !== undefined) {
            Cookies.set("OSSLOCAL_SESSION_TOKEN", tokens.token);
          }

          if (tokens.idToken !== undefined) {
            Cookies.set("OSSLOCAL_SESSION_ID_TOKEN", tokens.idToken);
          }

          if (tokens.refreshToken !== undefined) {
            Cookies.set("OSSLOCAL_SESSION_REFRESH_TOKEN", tokens.refreshToken);
          }

          client.writeData({
            data: {
              token: tokens.token,
              idToken: tokens.idToken,
              refreshToken: tokens.refreshToken,
            },
          });
        }}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ReactKeycloakProvider>
    </HelmetProvider>
  );
}
