import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { KeycloakProvider } from "@react-keycloak/web";
import { FocusStyleManager } from "@blueprintjs/core";
import { Router } from "@/Router";
import keycloak from "@/services/keycloak";

FocusStyleManager.onlyShowFocusOnTabs();

export function App(): JSX.Element {
  return (
    <HelmetProvider>
      <KeycloakProvider
        keycloak={keycloak}
        onEvent={(eventType, error) => {
          console.log("onKeycloakEvent", eventType, error);
        }}
        onTokens={(tokens) => {
          console.log("onKeycloakTokens", tokens);
        }}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </KeycloakProvider>
    </HelmetProvider>
  );
}
