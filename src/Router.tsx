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
      width="89"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1,
      }}
    />
  </Container>
);

const LazyLogin = React.lazy(() => import("@/pages/Login"));
const LazyShareableProfile = React.lazy(() => import("@/pages/ShareableProfile"));

const LazyMemberMain = React.lazy(() => import("@/pages/member/Home"));
const LazyMemberNotifications = React.lazy(() => import("@/pages/member/Notifications"));
const LazyMemberProjects = React.lazy(() => import("@/pages/member/Projects"));
const LazyMemberSchedules = React.lazy(() => import("@/pages/member/Schedules"));
const LazyMemberBankAccounts = React.lazy(() => import("@/pages/member/BankAccounts"));
const LazyMemberIssues = React.lazy(() => import("@/pages/member/Issues"));
const LazyMemberStats = React.lazy(() => import("@/pages/member/Stats"));
const LazyMemberWallet = React.lazy(() => import("@/pages/member/Wallet"));
const LazyMemberProfile = React.lazy(() => import("@/pages/member/Profile"));
const LazyMemberFeed = React.lazy(() => import("@/pages/member/Feed"));

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
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
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
  const { initialized } = useKeycloak();

  if (!initialized) {
    log.trace("Keycloak loading...");
    return <div>{LoadingPlaceholder}</div>;
  }

  return (
    <React.Suspense fallback={LoadingPlaceholder}>
      <Switch>
        <AuthRoute exact path="/" component={LazyMemberMain} />
        <AuthRoute path="/u/notifications" component={LazyMemberNotifications} />
        <AuthRoute path="/u/schedules" component={LazyMemberSchedules} />
        <AuthRoute path="/u/projects" component={LazyMemberProjects} />
        <AuthRoute path="/u/bank_accounts" component={LazyMemberBankAccounts} />
        <AuthRoute path="/u/issues" component={LazyMemberIssues} />
        <AuthRoute path="/u/stats" component={LazyMemberStats} />
        <AuthRoute path="/u/wallet" component={LazyMemberWallet} />
        <AuthRoute path="/u/profile" component={LazyMemberProfile} />
        <AuthRoute path="/u/feed" component={LazyMemberFeed} />
        <AuthRoute path="/_/bank_accounts" component={LazyBankAccounts} />
        <AuthRoute path="/_/projects" component={LazyProjects} />
        <AuthRoute path="/_/users" component={LazyUsers} />
        <AuthRoute path="/_/organizations" component={LazyOrganizations} />
        <AuthRoute path="/_/withdrawal_requests" component={LazyWithdrawalRequests} />
        <AuthRoute path="/docs/help" component={LazyWithdrawalRequests} />
        <OpenRoute path="/login" component={LazyLogin} />
        <OpenRoute path="/o/public/share/:id" component={LazyShareableProfile} />
        <OpenRoute component={NoMatch} />
      </Switch>
    </React.Suspense>
  );
}
