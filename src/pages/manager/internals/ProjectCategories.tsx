import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar, NavigationHeader } from "@/components";
import { ProjectCategory } from "@/models/internals";
import { useQuery, gql } from "@apollo/client";

const COUNTRIES_QUERY = gql`
  query _projectCategories {
    projectCategory {
      projectCategories {
        id
        name
        description
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

const ContainerProjectCategories = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function ProjectCategoryList({ list }: { list: ProjectCategory[] }): JSX.Element {
  const projectCategory = list.map(({ id, name, description }: ProjectCategory) => (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td></td>
    </tr>
  ));

  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>COUNTRIES</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{projectCategory}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function ProjectCategoriesContent(): JSX.Element {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerProjectCategories>
      <ProjectCategoryList list={data.projectCategory.projectCategories} />
    </ContainerProjectCategories>
  );
}

function ProjectCategories(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>ProjectCategories</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ProjectCategoriesContent />
      </ContainerMain>
    </Container>
  );
}

export default ProjectCategories;
