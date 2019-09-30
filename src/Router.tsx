import * as React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import Loadable, { LoadingComponentProps } from "react-loadable";
import NoMatch from "@/pages/NoMatch";
import logoIcon from "@/assets/images/logo_icon.png";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingDelay = 300;

function Loading(props: LoadingComponentProps): JSX.Element | null {
  if (props.error) {
    return (
      <Container>
        Error! <button onClick={props.retry}>Retry</button>
      </Container>
    );
  } else if (props.pastDelay) {
    return (
      <Container>
        <motion.img
          src={logoIcon}
          alt="logo"
          width="90"
          animate={{ scale: [0.5, 1, 1, 0.5] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            loop: Infinity,
            repeatDelay: 1
          }}
        />
      </Container>
    );
  } else {
    return null;
  }
}

const LazyMain = Loadable({
  loader: () => import("@/pages/Home"),
  loading: Loading,
  delay: LoadingDelay
});

const LazyProfile = Loadable({
  loader: () => import("@/pages/Profile"),
  loading: Loading,
  delay: LoadingDelay
});

const LazyNotifications = Loadable({
  loader: () => import("@/pages/Notifications"),
  loading: Loading,
  delay: LoadingDelay
});

const LazyMessages = Loadable({
  loader: () => import("@/pages/Messages"),
  loading: Loading,
  delay: LoadingDelay
});

const LazySchedules = Loadable({
  loader: () => import("@/pages/Schedules"),
  loading: Loading,
  delay: LoadingDelay
});

const LazySettings = Loadable({
  loader: () => import("@/pages/Settings"),
  loading: Loading,
  delay: LoadingDelay
});

const LazyLogin = Loadable({
  loader: () => import("@/pages/Login"),
  loading: Loading,
  delay: LoadingDelay
});

const LazyRegister = Loadable({
  loader: () => import("@/pages/Register"),
  loading: Loading,
  delay: LoadingDelay
});

const LazyRecoverAccount = Loadable({
  loader: () => import("@/pages/RecoverAccount"),
  loading: Loading,
  delay: LoadingDelay
});

export const Router = () => (
  <Switch>
    <Route exact path="/" component={LazyMain} />
    <Route path="/profile" component={LazyProfile} />
    <Route path="/notifications" component={LazyNotifications} />
    <Route path="/messages" component={LazyMessages} />
    <Route path="/schedules" component={LazySchedules} />
    <Route path="/settings" component={LazySettings} />
    <Route path="/login" component={LazyLogin} />
    <Route path="/register" component={LazyRegister} />
    <Route path="/recover-account" component={LazyRecoverAccount} />
    <Route component={NoMatch} />
  </Switch>
);
