import React from "react";
import log from "loglevel";
import styled from "styled-components";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
import { Card, H5, Button, Elevation, Colors, Classes } from "@blueprintjs/core";
import { Sidebar, NavigationHeader } from "@/components";

const MY_PROFILE_QUERY = gql`
  query __my_profile {
    userClue {
      myProfile {
        id
        username
        organizations {
          id
        }
      }
    }
  }
`;

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

const ContainerNewsFeed = styled.div`
  flex: 1 1 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const NewsFeed = styled.div`
  min-width: 600px;
  background-color: ${Colors.WHITE};

  & > div.${Classes.CARD}:not(:last-child) {
    margin-bottom: 10px;
  }
`;

function MyProfile(): JSX.Element {
  const { loading, error, data } = useQuery(MY_PROFILE_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  const feed = data.userClue.myProfile.organizations.map(({ id }: { id: number }) => (
    <Card key={id} elevation={Elevation.ONE}>
      <H5>{id}</H5>
      <p>Hello</p>
      <Button text="Explore" />
    </Card>
  ));

  return <NewsFeed>{feed}</NewsFeed>;
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
        <ContainerNewsFeed>
          <MyProfile />
        </ContainerNewsFeed>
      </ContainerMain>
    </Container>
  );
}

export default Profile;
