import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar, NavigationHeader } from "@/components";
import { Project } from "@/models";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

const PROJECTS_QUERY = gql`
  query _projects {
    project {
      projects {
        id
        publicCode
        name
        description
        parentOrganizationId
        managedById
        createdById
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

const ContainerProjects = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function ProjectList({ list }: { list: Project[] }): JSX.Element {
  const projects = list.map(
    ({
      id,
      publicCode,
      name,
      description,
      parentOrganizationId,
      managedById,
      createdById,
    }: Project) => (
      <tr key={id}>
        <td>{id}</td>
        <td>{publicCode}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{parentOrganizationId}</td>
        <td>{managedById}</td>
        <td>{createdById}</td>
        <td>{description}</td>
        <td>{description}</td>
      </tr>
    ),
  );

  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>PROJECTS</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{projects}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function ProjectsContent(): JSX.Element {
  const { loading, error, data } = useQuery(PROJECTS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerProjects>
      <ProjectList list={data.project.projects} />
    </ContainerProjects>
  );
}

function Projects(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Projects</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ProjectsContent />
      </ContainerMain>
    </Container>
  );
}

export default Projects;
