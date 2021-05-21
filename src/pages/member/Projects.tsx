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
} from "@/components";
import { AutoSizer, List } from "react-virtualized";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const PROJECTS_QUERY = gql`
  query _Projects {
    public {
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
function joinedProjectsRowRenderer({ key, index, style }: any) {
  return (
    <div key={key} style={style}>
      <div className="flex flex-row">
        <div className="flex-1 flex flex-col items-start">
          <div>
            <Link to="/u/project/12313">
              <b>Project Name</b>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-end">
          <div>Active</div>
        </div>
      </div>
      <div>Current Role</div>
      <div>Mar 2019 - Present . 1 yr 11 mos</div>
      <div>{list[index]}</div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hostedProjectsRowRenderer({ key, index, style }: any) {
  return (
    <div key={key} style={style}>
      <div className="flex flex-row">
        <div className="flex-1 flex flex-col items-start">
          <div>
            <a href="#">
              <b>Project Name</b>
            </a>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-end">
          <div>Active</div>
        </div>
      </div>
      <div>Organization</div>
      <div>Mar 2019 - Present . 1 yr 11 mos</div>
      <div>{list[index]}</div>
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
              height={list.length * 100}
              rowCount={list.length}
              rowHeight={100}
              rowRenderer={joinedProjectsRowRenderer}
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
              height={list.length * 100}
              rowCount={list.length}
              rowHeight={100}
              rowRenderer={hostedProjectsRowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </Card>
    </>
  );
}

function ProjectsContent(): JSX.Element {
  // TODO: process results
  useQuery(PROJECTS_QUERY);

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
