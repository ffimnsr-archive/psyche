import * as React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Loadable from "react-loadable";
import NoMatch from "@/pages/NoMatch";
import logoIcon from "@/assets/images/logo_icon.png";

const Container = styled.div`
  height: 100vh;
  width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  return (
    <Container>
      <img src={logoIcon} alt="logo" width="40" />
    </Container>
  );
}

const LazyMain = Loadable({
  loader: () => import("@/pages/Home"),
  loading: Loading,
  delay: 500
});

const LazyProfile = Loadable({
  loader: () => import("@/pages/Profile"),
  loading: Loading,
  delay: 500
});

const LazyLogin = Loadable({
  loader: () => import("@/pages/Login"),
  loading: Loading,
  delay: 500
});

const LazyRegister = Loadable({
  loader: () => import("@/pages/Register"),
  loading: Loading,
  delay: 500
});

const LazyRecoverAccount = Loadable({
  loader: () => import("@/pages/RecoverAccount"),
  loading: Loading,
  delay: 500
});

export const Router = () => (
  <Switch>
    <Route exact path="/" component={LazyMain} />
    <Route path="/profile" component={LazyProfile} />
    <Route path="/login" component={LazyLogin} />
    <Route path="/register" component={LazyRegister} />
    <Route path="/recover-account" component={LazyRecoverAccount} />
    <Route component={NoMatch} />
  </Switch>
);
