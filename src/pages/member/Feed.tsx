import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
import { Card, H5, Button, Elevation, Colors } from "@blueprintjs/core";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";

const FEED_QUERY = gql`
  query {
    industries {
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

  & > div.bp3-card:not(:last-child) {
    margin-bottom: 10px;
  }
`;

function Feeds(): JSX.Element {
  const { loading, error, data } = useQuery(FEED_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  const feed = data.industries.map(({ id }: { id: number }) => (
    <Card key={id} elevation={Elevation.ONE}>
      <H5>{id}</H5>
      <p>Hello</p>
      <Button text="Explore" />
    </Card>
  ));

  return <NewsFeed>{feed}</NewsFeed>;
}

function Feed(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Feed</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ContainerNewsFeed>
          <Feeds />
        </ContainerNewsFeed>
      </ContainerMain>
    </Container>
  );
}

export default Feed;
