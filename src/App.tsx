import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Auth0Provider } from "@auth0/auth0-react";
import { FocusStyleManager } from "@blueprintjs/core";
import { Router } from "./Router";

FocusStyleManager.onlyShowFocusOnTabs();

/**
 * Renders the app that contains the browser router and router component. This
 * also initialize the helmet provider and auth provider.
 * @returns React component
 */
export function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Auth0Provider
        domain="dev-sesame.eu.auth0.com"
        clientId="aGybMZW8GSePfI6meANg2bEUz7RetN5U"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Auth0Provider>
    </HelmetProvider>
  );
}
