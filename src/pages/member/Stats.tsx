import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useQuery, gql } from "@apollo/client";
import { Card, H5, Button, Elevation, Colors, Classes } from "@blueprintjs/core";
import { ResponsiveLine } from "@nivo/line";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";

function StatsContent(): JSX.Element {
  return (
    <div style={{ margin: "20px" }}>
      {/* <Breadcrumbs
        currentBreadcrumbRenderer={renderCurrentBreadcrumb}
        items={BREADCRUMBS}
      /> */}
      <div style={{ marginBottom: "1rem" }} />
      <Card elevation={Elevation.ONE}>
        <H5>Project Activity</H5>
        <div style={{ height: "400px" }}></div>
      </Card>
    </div>
  );
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
        <StatsContent />
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default StatsView;
