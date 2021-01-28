import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";

const ContainerNotifications = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function RecentNotifications(): JSX.Element {
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>RECENT NOTIFICATIONS</H5>
        <ResponsiveTable
          condensed={true}
          bordered={true}
          interactive={true}
          striped={true}
        >
          <tbody>
            <tr>
              <td>Hello</td>
            </tr>
          </tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function Notifications(): JSX.Element {
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

export default Notifications;
