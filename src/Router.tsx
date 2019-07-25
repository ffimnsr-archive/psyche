import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

function Loading() {
  return <div>Loading...</div>;
}

const LazyMain = Loadable({
  loader: () => import("@/pages/Home"),
  loading: Loading
});

const LazyLogin = Loadable({
  loader: () => import("@/pages/Login"),
  loading: Loading
});

const LazyRegister = Loadable({
  loader: () => import("@/pages/Register"),
  loading: Loading
});

const LazyRecoverAccount = Loadable({
  loader: () => import("@/pages/RecoverAccount"),
  loading: Loading
});

const LazyNoMatch = Loadable({
  loader: () => import("@/pages/NoMatch"),
  loading: Loading
});

export const Router = () => (
  <Switch>
    <Route exact path="/" component={LazyMain} />
    <Route path="/login" component={LazyLogin} />
    <Route path="/register" component={LazyRegister} />
    <Route path="/recover-account" component={LazyRecoverAccount} />
    <Route component={LazyNoMatch} />
  </Switch>
);
