import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";
import { ExperienceLevel } from "@/models/internals";

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
  const { loading, error, data } = {} as any;

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  return (
    <ContainerExperienceLevels>
      <ExperienceLevelList list={data.experienceLevel.experienceLevels} />
    </ContainerExperienceLevels>
  );
}

function ExperienceLevels(): JSX.Element {
  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Experience Levels</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ExperienceLevelsContent />
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default ExperienceLevels;
