import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Card, H5 } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "../../components";

const ContainerNewsFeed = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

function FeedView(): JSX.Element {
  log.trace("FeedView: rendering component");

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Feed</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ContainerNewsFeed>
          <Card>
            <H5>Activity Feed</H5>
            <div></div>
          </Card>
        </ContainerNewsFeed>
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default FeedView;
