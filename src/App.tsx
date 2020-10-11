import React from "react";
import log from "loglevel";
import Cookies from "js-cookie";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useApolloClient } from "react-apollo";
import { KeycloakProvider } from "@react-keycloak/web";
import { FocusStyleManager } from "@blueprintjs/core";
import { Router } from "@/Router";
import keycloak from "@/services/keycloak";

FocusStyleManager.onlyShowFocusOnTabs();

export function App(): JSX.Element {
  const client = useApolloClient();

  return (
    <HelmetProvider>
      <KeycloakProvider
        keycloak={keycloak}
        onEvent={(eventType, error) => {
          log.info("onKeycloakEvent", eventType, error);
        }}
        onTokens={(tokens) => {
          log.trace("onKeycloakTokens", tokens);

          Cookies.set("OSSLOCAL_SESSION_TOKEN", tokens.token);
          Cookies.set("OSSLOCAL_SESSION_ID_TOKEN", tokens.idToken);
          Cookies.set("OSSLOCAL_SESSION_REFRESH_TOKEN", tokens.refreshToken);

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
      </KeycloakProvider>
    </HelmetProvider>
  );
}
