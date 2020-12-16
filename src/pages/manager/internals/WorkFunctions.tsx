import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar, NavigationHeader } from "@/components";
import { WorkFunction } from "@/models/internals";
import { useQuery, gql } from "@apollo/client";

const WORK_FUNCTIONS_QUERY = gql`
  query _workFunctions {
    workFunction {
      workFunctions {
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

const ContainerWorkFunctions = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function WorkFunctionList({ list }: { list: WorkFunction[] }): JSX.Element {
  const workFunctions = list.map(({ id, name, description }: WorkFunction) => (
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
        <H5>WORK FUNCTIONS</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{workFunctions}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function WorkFunctionsContent(): JSX.Element {
  const { loading, error, data } = useQuery(WORK_FUNCTIONS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerWorkFunctions>
      <WorkFunctionList list={data.workFunction.workFunctions} />
    </ContainerWorkFunctions>
  );
}

function WorkFunctions(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>WorkFunctions</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <WorkFunctionsContent />
      </ContainerMain>
    </Container>
  );
}

export default WorkFunctions;
