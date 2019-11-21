import * as React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import NoMatch from "@/pages/NoMatch";
import logoIcon from "@/assets/images/logo_icon.png";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingPlaceholder = (
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

const LazyMain = React.lazy(() => import("@/pages/Home"));
const LazyProfile = React.lazy(() => import("@/pages/Profile"));
const LazyNotifications = React.lazy(() => import("@/pages/Notifications"));
const LazyMessages = React.lazy(() => import("@/pages/Messages"));
const LazySchedules = React.lazy(() => import("@/pages/Schedules"));
const LazySettings = React.lazy(() => import("@/pages/Settings"));
const LazyLogin = React.lazy(() => import("@/pages/Login.C"));
const LazyRegister = React.lazy(() => import("@/pages/Register"));
const LazyRecoverAccount = React.lazy(() => import("@/pages/RecoverAccount"));

export const Router = () => (
  <React.Suspense fallback={LoadingPlaceholder}>
    <Switch>
      <Route exact path="/" component={LazyMain} />
      <Route path="/profile" component={LazyProfile} />
      <Route path="/notifications" component={LazyNotifications} />
      <Route path="/messages" component={LazyMessages} />
      <Route path="/schedules" component={LazySchedules} />
      <Route path="/settings" component={LazySettings} />
      <Route path="/login" component={LazyLogin} />
      <Route path="/login/callback/:provider" component={LazyLogin} />
      <Route path="/logout" component={LazyLogin} />
      <Route path="/register" component={LazyRegister} />
      <Route path="/register/callback/:provider" component={LazyRegister} />
      <Route path="/confirm_email/:token" component={LazyRegister} />
      <Route path="/recover_account" component={LazyRecoverAccount} />
      <Route path="/recover_account/confirm/:token" component={LazyRecoverAccount} />
      <Route component={NoMatch} />
    </Switch>
  </React.Suspense>
);
