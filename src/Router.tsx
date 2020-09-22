import React from "react";
import {
  Route,
  Redirect,
  Switch,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import log from "loglevel";
import styled from "styled-components";
import gql from "graphql-tag";
import _ from "lodash";
import { useQuery } from "react-apollo";
import { motion } from "framer-motion";
import AuthDispatcher from "@/pages/AuthDispatcher";
import AuthFramer from "@/pages/AuthFramer";
import NoMatch from "@/pages/NoMatch";
import logoIcon from "@/assets/images/logo_icon.png";

const REST_URI = process.env.REACT_APP_RS_URI;

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
const LazyNotifications = React.lazy(() => import("@/pages/member/Notifications"));
const LazyUserProjects = React.lazy(() => import("@/pages/member/Projects"));
const LazySchedules = React.lazy(() => import("@/pages/member/Schedules"));
const LazyShareableProfile = React.lazy(() => import("@/pages/ShareableProfile"));

const LazyBankAccounts = React.lazy(() => import("@/pages/manager/BankAccounts"));
const LazyOrganizations = React.lazy(() => import("@/pages/manager/Organizations"));
const LazyProjects = React.lazy(() => import("@/pages/manager/Projects"));
const LazyUsers = React.lazy(() => import("@/pages/manager/Users"));
const LazyWithdrawalRequests = React.lazy(
  () => import("@/pages/manager/WithdrawalRequests"),
);

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

  const createOnNotNil = <T,>(props: RouteComponentProps<T>): React.ReactNode =>
    !_.isUndefined(component) ? React.createElement(component, props) : null;

  return no ? (
    <Route
      {...otherProps}
      render={<T,>(props: RouteComponentProps<T>): React.ReactNode =>
        !data.isAuthenticated ? createOnNotNil(props) : <Redirect to="/" />
      }
    />
  ) : (
    <Route
      {...otherProps}
      render={<T,>(props: RouteComponentProps<T>): React.ReactNode => {
        if (data.isAuthenticated) {
          return createOnNotNil(props);
        } else {
          const width = 500;
          const height = 600;
          const left = screen.width / 2 - width / 2;
          const top = screen.height / 2 - height / 2;

          log.trace("Opening authorization window");
          const popup = window.open(
            `${REST_URI}/login`,
            "_blank",
            `menubar=no,toolbar=no,status=no,width=${width},height=${height},left=${left},top=${top}`,
          );

          popup?.focus();
          return <AuthFramer />;
        }
      }}
    />
  );
}

export function Router(): JSX.Element {
  return (
    <React.Suspense fallback={LoadingPlaceholder}>
      <Switch>
        <AuthRoute exact path="/" component={LazyMain} />
        <AuthRoute path="/notifications" component={LazyNotifications} />
        <AuthRoute path="/u/projects" component={LazyUserProjects} />
        <AuthRoute path="/bank_accounts" component={LazyBankAccounts} />
        <AuthRoute path="/organizations" component={LazyOrganizations} />
        <AuthRoute path="/projects" component={LazyProjects} />
        <AuthRoute path="/users" component={LazyUsers} />
        <AuthRoute path="/withdrawal_requests" component={LazyWithdrawalRequests} />
        <AuthRoute path="/schedules" component={LazySchedules} />
        <OpenRoute path="/u/share/:id" component={LazyShareableProfile} />
        <OpenRoute path="/auth/callback" component={AuthDispatcher} />
        <OpenRoute component={NoMatch} />
      </Switch>
    </React.Suspense>
  );
}
