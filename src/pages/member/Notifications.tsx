import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Card, H5, Button, Elevation } from "@blueprintjs/core";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";

const Container = styled.main`
  height: 100vh;
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

function Notifications(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Notifications</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
      </ContainerMain>
    </Container>
  );
}

export default Notifications;
