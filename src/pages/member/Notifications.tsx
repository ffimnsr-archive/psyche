import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerMain = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
`;

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
        <H5>Recent Notifications</H5>
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
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Notifications</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ContainerNotifications>
          <RecentNotifications />
        </ContainerNotifications>
      </ContainerMain>
    </Container>
  );
}

export default Notifications;
