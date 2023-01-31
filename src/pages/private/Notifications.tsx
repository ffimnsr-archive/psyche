import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { H5, Card, Elevation } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "../../components";

const ContainerNotifications = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

function RecentNotifications(): JSX.Element {
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>Notifications</H5>
        <div></div>
      </Card>
    </>
  );
}

function NotificationsView(): JSX.Element {
  log.trace("NotificationsView: rendering component");

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Notifications</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ContainerNotifications>
          <RecentNotifications />
        </ContainerNotifications>
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default NotificationsView;
