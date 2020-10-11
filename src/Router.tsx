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
import { motion } from "framer-motion";
import NoMatch from "@/pages/NoMatch";
import logoIcon from "@/assets/images/logo_icon.png";
import { useKeycloak } from "@react-keycloak/web";

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
const LazyLogin = React.lazy(() => import("@/pages/Login"));

const LazyBankAccounts = React.lazy(() => import("@/pages/manager/BankAccounts"));
const LazyOrganizations = React.lazy(() => import("@/pages/manager/Organizations"));
const LazyProjects = React.lazy(() => import("@/pages/manager/Projects"));
const LazyUsers = React.lazy(() => import("@/pages/manager/Users"));
const LazyWithdrawalRequests = React.lazy(
  () => import("@/pages/manager/WithdrawalRequests"),
);

const OpenRoute = Route;

interface AuthRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<unknown>;
}

function AuthRoute({ component: Component, ...rest }: AuthRouteProps) {
  const { keycloak } = useKeycloak();
  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak?.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
}

export function Router(): JSX.Element {
  const [, initialized] = useKeycloak();

  if (!initialized) {
    log.info("Keycloak loading");
    return <div>Loading...</div>;
  }

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
        <OpenRoute path="/login" component={LazyLogin} />
        <OpenRoute path="/u/share/:id" component={LazyShareableProfile} />
        <OpenRoute component={NoMatch} />
      </Switch>
    </React.Suspense>
  );
}
