import React from "react";
import { Route, Redirect, Switch, RouteProps } from "react-router-dom";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery }  from "react-apollo";
import { motion } from "framer-motion";
import NoMatch from "@/pages/NoMatch";
import logoIcon from "@/assets/images/logo_icon.png";

const IS_AUTHENTICATED_QUERY = gql`
  query isAuthenticated {
    isAuthenticated @client(always: true)
  }
`;

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

const LazyMain = React.lazy(() => import("@/pages/member/Home"));
const LazyProfile = React.lazy(() => import("@/pages/member/Profile"));
const LazyNotifications = React.lazy(() => import("@/pages/member/Notifications"));
const LazyMessages = React.lazy(() => import("@/pages/member/Messages"));
const LazySchedules = React.lazy(() => import("@/pages/member/Schedules"));
const LazySettings = React.lazy(() => import("@/pages/member/Settings"));
const LazyLogin = React.lazy(() => import("@/pages/Login"));
const LazyRegister = React.lazy(() => import("@/pages/Register"));
const LazyConfirmAccount = React.lazy(() => import("@/pages/ConfirmAccount"));
const LazyRecoverAccount = React.lazy(() => import("@/pages/RecoverAccount"));
const LazyRecoverAccountProcess = React.lazy(() => import("@/pages/RecoverAccountProcess"));

interface PrivateRouteProps extends RouteProps {}

function PrivateRoute({ component, ...otherProps }: PrivateRouteProps) {
  const { data } = useQuery(IS_AUTHENTICATED_QUERY);

  return (
    <Route
      {...otherProps}
      render={(props: any) =>
        data.isAuthenticated ? React.createElement(component!, props) : <Redirect to="/login" />
      }
    />
  );
};

export function Router () {
  return (
    <React.Suspense fallback={LoadingPlaceholder}>
      <Switch>
        <Route path="/login" component={LazyLogin} />
        <Route path="/register" component={LazyRegister} />
        <Route path="/oauth/success" component={LazyLogin} />
        <Route path="/oauth/error" component={LazyLogin} />
        <Route path="/confirm_email/:token" component={LazyConfirmAccount} />
        <Route path="/recover_account" component={LazyRecoverAccount} />
        <Route path="/recover_account/confirm/:token" component={LazyRecoverAccountProcess} />
        <PrivateRoute path="/logout" component={LazyLogin} />
        <PrivateRoute exact path="/" component={LazyMain} />
        <PrivateRoute path="/profile" component={LazyProfile} />
        <PrivateRoute path="/notifications" component={LazyNotifications} />
        <PrivateRoute path="/messages" component={LazyMessages} />
        <PrivateRoute path="/schedules" component={LazySchedules} />
        <PrivateRoute path="/settings" component={LazySettings} />
        <Route component={NoMatch} />
      </Switch>
    </React.Suspense>
  );
}
