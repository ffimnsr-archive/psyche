import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar, NavigationHeader } from "@/components";
import { Industry } from "@/models/internals";
import { useQuery, gql } from "@apollo/client";

const INDUSTRIES_QUERY = gql`
  query _industries {
    industry {
      industries {
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

const ContainerIndustries = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function IndustryList({ list }: { list: Industry[] }): JSX.Element {
  const industries = list.map(({ id, name, description }: Industry) => (
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
        <H5>INDUSTRIES</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{industries}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function IndustriesContent(): JSX.Element {
  const { loading, error, data } = useQuery(INDUSTRIES_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerIndustries>
      <IndustryList list={data.industry.industries} />
    </ContainerIndustries>
  );
}

function Industries(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Industries</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <IndustriesContent />
      </ContainerMain>
    </Container>
  );
}

export default Industries;