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
  log.trace("onKeycloakEvent", event, error);
};

let secureCookies = false;
if (process.env.NODE_ENV !== "production") {
  secureCookies = true;
}

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
            Cookies.set("OSSLOCAL_SESSION_TOKEN", tokens.token, {
              sameSite: "Strict",
              secure: secureCookies,
            });
          }

          if (tokens.idToken !== undefined) {
            Cookies.set("OSSLOCAL_SESSION_ID_TOKEN", tokens.idToken, {
              sameSite: "Strict",
              secure: secureCookies,
            });
          }

          if (tokens.refreshToken !== undefined) {
            Cookies.set("OSSLOCAL_SESSION_REFRESH_TOKEN", tokens.refreshToken, {
              sameSite: "Strict",
              secure: secureCookies,
            });
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
