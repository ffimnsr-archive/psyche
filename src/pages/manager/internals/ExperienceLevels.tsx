import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar, NavigationHeader } from "@/components";
import { ExperienceLevel } from "@/models/internals";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

const EXPERIENCE_LEVELS_QUERY = gql`
  query _experienceLevels {
    experienceLevel {
      experienceLevels {
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

const ContainerExperienceLevels = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function ExperienceLevelList({ list }: { list: ExperienceLevel[] }): JSX.Element {
  const experienceLevels = list.map(({ id, name, description }: ExperienceLevel) => (
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
        <H5>EXPERIENCE LEVELS</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{experienceLevels}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function ExperienceLevelsContent(): JSX.Element {
  const { loading, error, data } = useQuery(EXPERIENCE_LEVELS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerExperienceLevels>
      <ExperienceLevelList list={data.experienceLevel.experienceLevels} />
    </ContainerExperienceLevels>
  );
}

function ExperienceLevels(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Experience Levels</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ExperienceLevelsContent />
      </ContainerMain>
    </Container>
  );
}

export default ExperienceLevels;
