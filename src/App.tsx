import * as React from "react";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import { Router } from "@/Router";

interface AppProps {
  history: History;
}

export const App = ({ history }: AppProps) => (
  <ConnectedRouter history={history}>
    <Router />
  </ConnectedRouter>
);
