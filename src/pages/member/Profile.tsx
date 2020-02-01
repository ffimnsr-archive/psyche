import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
import { Card, H5, Elevation, Colors, Classes } from "@blueprintjs/core";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";

const PROFILE_QUERY = gql`
  query {
    memberMyProfile {
      id
    }
  }
`;

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
  background-color: ${Colors.WHITE};

  & > div.${Classes.CARD}:not(:last-child) {
    margin-bottom: 10px;
  }
`;

function ProfileContent(): JSX.Element {
  const { loading, error } = useQuery(PROFILE_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <ProfilePane>
      <Card elevation={Elevation.ONE}>
        <img src="https://via.placeholder.com/200" />
        Full Name Public ID
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
  );
}

function Profile(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Profile</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ContainerProfile>
          <ProfileContent />
        </ContainerProfile>
      </ContainerMain>
    </Container>
  );
}

export default Profile;
