import React, { lazy, ReactElement } from "react";
import { Route, Routes, Navigate, useLocation, RouteProps } from "react-router-dom";
import log from "loglevel";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import NoMatch from "./pages/NoMatch";
import logoIcon from "./assets/images/logo_icon.png";

// Disable lazy loads for this components as this needs quick load times.
import Login from "./pages/Login";
import Home from "./pages/private/Home";

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

const ShareableProfile = lazy(() => import("./pages/ShareableProfile"));
const AccountProfile = lazy(() => import("./pages/private/Profile"));
// const MemberNotifications = lazy(() => import("./pages/private/Notifications"));
// const MemberProjects = lazy(() => import("./pages/private/Projects"));
// const MemberProjectDetails = lazy(() => import("./pages/private/ProjectDetails"));
// const MemberSchedules = lazy(() => import("./pages/private/Schedules"));
// const MemberBankAccounts = lazy(() => import("./pages/private/BankAccounts"));
// const MemberIssues = lazy(() => import("./pages/private/Issues"));
// const MemberStats = lazy(() => import("./pages/private/Stats"));
// const MemberWallet = lazy(() => import("./pages/private/Wallet"));

// const MemberFeed = lazy(() => import("./pages/private/Feed"));
// const MemberSettings = lazy(() => import("./pages/private/Settings"));

// const BankAccounts = lazy(() => import("./pages/manager/BankAccounts"));
// const Organizations = lazy(() => import("./pages/manager/Organizations"));
// const Projects = lazy(() => import("./pages/manager/Projects"));
// const Users = lazy(() => import("./pages/manager/Users"));
// const WithdrawalRequests = lazy(() => import("./pages/manager/WithdrawalRequests"));

/**
 * Renders a component if user is authenticated otherwise redirect to login.
 * @param param0 Contains a react component with some unknown args.
 * @returns React component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PrivRoute({ children }: RouteProps): ReactElement {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  return isAuthenticated ? (
    (children as ReactElement)
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

/**
 * Renders the router that will switch based on url pathname.
 * @returns React component
 */
export function Router(): ReactElement {
  const { isLoading } = useAuth0();

  if (isLoading) {
    log.trace("Router: auth0 loading");
    return <div>{LoadingPlaceholder}</div>;
  }

  return (
    <React.Suspense fallback={LoadingPlaceholder}>
      <Routes>
        {/* <AuthRoute path="/u/notifications" element={<MemberNotifications />} />
        <AuthRoute path="/u/notification/:id" element={<MemberNotifications />} />
        <AuthRoute path="/u/schedules" element={<MemberSchedules />} />
        <AuthRoute path="/u/projects" element={<MemberProjects />} />
        <AuthRoute path="/u/project/:id" element={<MemberProjectDetails />} />
        <AuthRoute path="/u/bank_accounts" element={<MemberBankAccounts />} />
        <AuthRoute path="/u/bank_account/:id" element={<MemberBankAccounts />} />
        <AuthRoute path="/u/offers" element={<MemberIssues />} />
        <AuthRoute path="/u/offer/:id" element={<MemberIssues />} />
        <AuthRoute path="/u/issues" element={<MemberIssues />} />
        <AuthRoute path="/u/issue/:id" element={<MemberIssues />} />
        <AuthRoute path="/u/stats" element={<MemberStats />} />
        <AuthRoute path="/u/wallet" element={<MemberWallet />} />
        <AuthRoute path="/u/profile" element={<MemberProfile />} />
        <AuthRoute path="/u/feed" element={<MemberFeed />} />
        <AuthRoute path="/u/settings" element={<MemberSettings />} />
        <AuthRoute path="/_/bank_accounts" element={<BankAccounts />} />
        <AuthRoute path="/_/bank_account/:id" element={<BankAccounts />} />
        <AuthRoute path="/_/projects" element={<Projects />} />
        <AuthRoute path="/_/project/:id" element={<Projects />} />
        <AuthRoute path="/_/users" element={<Users />} />
        <AuthRoute path="/_/user/:id" element={<Users />} />
        <AuthRoute path="/_/organizations" element={<Organizations />} />
        <AuthRoute path="/_/organization/:id" element={<Organizations />} />
        <AuthRoute path="/_/withdrawal_requests" element={<WithdrawalRequests />} />
        <AuthRoute path="/_/withdrawal_request/:id" element={<WithdrawalRequests />} />
        <AuthRoute path="/docs/help" element={<WithdrawalRequests />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/user/profile" element={<AccountProfile />} />
        <Route path="/o/public/share/:id" element={<ShareableProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </React.Suspense>
  );
}
