import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Auth0Provider } from "@auth0/auth0-react";
import { FocusStyleManager } from "@blueprintjs/core";
import { Router } from "@/Router";

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
        domain="staging-sesame.us.auth0.com"
        clientId="8QaVNdVlPPcZGU2ttYck9QNj6ZyVK9fC"
        redirectUri={window.location.origin}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Auth0Provider>
    </HelmetProvider>
  );
}
