import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import { FocusStyleManager } from "@blueprintjs/core";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

FocusStyleManager.onlyShowFocusOnTabs();

/**
 * Renders the app that contains the browser router and router component. This
 * also initialize the helmet provider and auth provider.
 * @returns React component
 */
export function App(): JSX.Element {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <HelmetProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </HelmetProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}
