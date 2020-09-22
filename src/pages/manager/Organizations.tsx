import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar, NavigationHeader } from "@/components";
import { Organization } from "@/models";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

const ORGANIZATIONS_QUERY = gql`
  query _organizations {
    organization {
      organizations {
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

const ContainerOrganizations = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function OrganizationList({ list }: { list: Organization[] }): JSX.Element {
  const organizations = list.map(({ id, name, description }: Organization) => (
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
        <H5>ORGANIZATIONS</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{organizations}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function OrganizationsContent(): JSX.Element {
  const { loading, error, data } = useQuery(ORGANIZATIONS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerOrganizations>
      <OrganizationList list={data.organization.organizations} />
    </ContainerOrganizations>
  );
}

function Organizations(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Organizations</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <OrganizationsContent />
      </ContainerMain>
    </Container>
  );
}

export default Organizations;
