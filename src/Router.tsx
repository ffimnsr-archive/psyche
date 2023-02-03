import styled from "styled-components";
import React, { lazy, ReactElement } from "react";
import NoMatch from "./pages/NoMatch";
import logoIcon from "./assets/images/logo_icon.png";
import log from "loglevel";
import { useRecoilValue } from "recoil";
import { Route, Routes, Navigate, useLocation, RouteProps } from "react-router-dom";
import { motion } from "framer-motion";

// Disable lazy loads for this components as this needs quick load times.
import Login from "./pages/Login";
import Home from "./pages/private/Home";
import { authState } from "./utils/atom";

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
export function PrivRoute({ children }: RouteProps): ReactElement {
  const isAuthenticated = useRecoilValue(authState);
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
  const isLoading = false;

  if (isLoading) {
    log.trace("Router: wallet loading");
    return <div>{LoadingPlaceholder}</div>;
  }

  return (
    <React.Suspense fallback={LoadingPlaceholder}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/profile" element={<AccountProfile />} />
        <Route path="/_/public/share/:id" element={<ShareableProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </React.Suspense>
  );
}
