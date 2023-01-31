import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Card, Elevation, H5 } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "../../components";

const ContainerProjects = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;

  & > div {
    margin-bottom: 0.5rem;
  }
`;

function JoinedProjects(): JSX.Element {
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>Joined Projects</H5>
      </Card>
    </>
  );
}

function HostedProjects(): JSX.Element {
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>Hosted Projects</H5>
      </Card>
    </>
  );
}

function ProjectsContent(): JSX.Element {
  return (
    <ContainerProjects>
      <JoinedProjects />
      <HostedProjects />
    </ContainerProjects>
  );
}

function ProjectsView(): JSX.Element {
  log.trace("ProjectsView: rendering component");

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Projects</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ProjectsContent />
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default ProjectsView;
