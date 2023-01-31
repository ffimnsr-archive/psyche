import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Colors, Classes } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "../../components";

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

function Feeds(): JSX.Element {
  // const { loading, error, data } = useQuery(FEED_QUERY);

  // // TODO
  // if (loading) return <p>Loading</p>;
  // if (error) {
  //   log.error(error);
  //   return <p>Error</p>;
  // }

  // const feed = data.industries.map(({ id }: { id: number }) => (
  //   <Card key={id} elevation={Elevation.ONE}>
  //     <H5>{id}</H5>
  //     <p>Hello</p>
  //     <Button text="Explore" />
  //   </Card>
  // ));

  return <NewsFeed>Hello</NewsFeed>;
}

function IssuesView(): JSX.Element {
  log.trace("IssuesView: rendering component");

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Issues</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ContainerNewsFeed>
          <Feeds />
        </ContainerNewsFeed>
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default IssuesView;