import React from "react";
import { Route, Redirect, Switch, RouteProps } from "react-router-dom";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
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
        repeatDelay: 1,
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
const LazySignIn = React.lazy(() => import("@/pages/SignIn"));
const LazySignUp = React.lazy(() => import("@/pages/SignUp"));
const LazySignUpVerify = React.lazy(() => import("@/pages/SignUpVerify"));
const LazyRecoverAccount = React.lazy(() => import("@/pages/RecoverAccount"));
const LazyRecoverAccountVerify = React.lazy(() => import("@/pages/RecoverAccountVerify"));
const LazyShareableProfile = React.lazy(() => import("@/pages/ShareableProfile"));

const OpenRoute = Route;

interface AuthRouteProps extends RouteProps {
  no?: boolean;
}

function AuthRoute({
  component,
  no = false,
  ...otherProps
}: AuthRouteProps): JSX.Element {
  const { data } = useQuery(IS_AUTHENTICATED_QUERY);

  return no ? (
    <Route
      {...otherProps}
      render={(props: any): JSX.Element =>
        !data.isAuthenticated ? (
          React.createElement(component!, props)
        ) : (
          <Redirect to="/" />
        )
      }
    />
  ) : (
    <Route
      {...otherProps}
      render={(props: any): JSX.Element =>
        data.isAuthenticated ? (
          React.createElement(component!, props)
        ) : (
          <Redirect to="/sign_in" />
        )
      }
    />
  );
}

export function Router(): JSX.Element {
  return (
    <React.Suspense fallback={LoadingPlaceholder}>
      <Switch>
        <AuthRoute no={true} path="/sign_in" component={LazySignIn} />
        <AuthRoute no={true} path="/oauth/success" component={LazySignIn} />
        <AuthRoute no={true} path="/oauth/error" component={LazySignIn} />
        <AuthRoute no={true} exact path="/sign_up" component={LazySignUp} />
        <AuthRoute no={true} path="/sign_up/verify/:code" component={LazySignUpVerify} />
        <AuthRoute
          no={true}
          exact
          path="/recover_account"
          component={LazyRecoverAccount}
        />
        <AuthRoute
          no={true}
          path="/recover_account/verify/:code"
          component={LazyRecoverAccountVerify}
        />
        <AuthRoute exact path="/" component={LazyMain} />
        <AuthRoute path="/profile" component={LazyProfile} />
        <AuthRoute path="/notifications" component={LazyNotifications} />
        <AuthRoute path="/messages" component={LazyMessages} />
        <AuthRoute path="/schedules" component={LazySchedules} />
        <AuthRoute path="/settings" component={LazySettings} />
        <OpenRoute path="/u/share/:id" component={LazyShareableProfile} />
        <OpenRoute component={NoMatch} />
      </Switch>
    </React.Suspense>
  );
}
