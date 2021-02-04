import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Card, Elevation, H5 } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";
import { AutoSizer, List } from "react-virtualized";
import { useQuery, gql } from "@apollo/client";

const PROJECTS_QUERY = gql`
  query _projects {
    profile: myProfile {
      id
      email
      publicId
      socialSecurityNumber
      workPreference {
        id
        interests
        projectLimit
      }
      sitePreference {
        id
        optInMarketing
        optInUsageStat
        experimentalFeatures
        supportPin
      }
      clue {
        id
        firstName
        lastName
        gender
        birthDate
        image
        bio
        phoneNumber
        isReady
        country {
          id
          name
        }
      }
    }
  }
`;

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

const list = [
  "Brian Vaughn",
  "Brian Vaughn",
  // And so on...
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowRenderer({ key, index, style }: any) {
  return (
    <div key={key} style={style}>
      {list[index]}
    </div>
  );
}

function JoinedProjects(): JSX.Element {
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>Joined Projects</H5>
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              height={list.length * 30}
              rowCount={list.length}
              rowHeight={30}
              rowRenderer={rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </Card>
    </>
  );
}

function HostedProjects(): JSX.Element {
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>Hosted Projects</H5>
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              height={list.length * 30}
              rowCount={list.length}
              rowHeight={30}
              rowRenderer={rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </Card>
    </>
  );
}

function ProjectsContent(): JSX.Element {
  // FZ_TODO: process results
  useQuery(PROJECTS_QUERY);

  return (
    <ContainerProjects>
      <JoinedProjects />
      <HostedProjects />
    </ContainerProjects>
  );
}

function Projects(): JSX.Element {
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

export default Projects;
