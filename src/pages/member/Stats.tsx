import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useQuery, gql } from "@apollo/client";
import { Card, H5, Button, Elevation, Colors, Classes } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";

const ContainerStats = styled.div`
  flex: 1 1 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

function Feeds(): JSX.Element {
  return <div>Hello</div>;
}

function StatsView(): JSX.Element {
  log.trace("Rendering stats view");

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Work Statistics</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ContainerStats>
          <Feeds />
        </ContainerStats>
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default StatsView;
