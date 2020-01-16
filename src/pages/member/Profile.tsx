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

const ContainerProfile = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ProfilePane = styled.div`
  background-color: #fff;

  & > div.bp3-card:not(:last-child) {
    margin-bottom: 10px;
  }
`;

function Profile() {
  return (
    <Container>
      <Helmet
        titleTemplate="%s | Open Sesame"
      >
        <title>Profile</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ContainerProfile>
          <ProfilePane>
            <Card elevation={Elevation.ONE}>
              Avatar
              Full Name
              Public ID
            </Card>
            <Card elevation={Elevation.ONE}>
              <H5>Hello</H5>
              <p>Hello</p>
            </Card>
            <Card elevation={Elevation.ONE}>
              <H5>Hello</H5>
              <p>Hello</p>
            </Card>
          </ProfilePane>
        </ContainerProfile>
      </ContainerMain>
    </Container>
  );
}

export default Profile;
