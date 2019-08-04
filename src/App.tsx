import * as React from "react";
import { FocusStyleManager } from "@blueprintjs/core";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import { Router } from "@/Router";

FocusStyleManager.onlyShowFocusOnTabs();

interface IAppProps {
  history: History;
}

export const App = ({ history }: IAppProps) => (
  <ConnectedRouter history={history}>
    <Router />
  </ConnectedRouter>
);
