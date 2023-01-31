import React from "react";
import log from "loglevel";
import { Helmet } from "react-helmet-async";
import { Card, H5, Elevation } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "../../components";

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
  log.trace("StatsView: rendering component");

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
