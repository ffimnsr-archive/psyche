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
import { Organization } from "@/models";

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
  const { loading, error, data } = {} as any;

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  return (
    <ContainerOrganizations>
      <OrganizationList list={data.organization.organizations} />
    </ContainerOrganizations>
  );
}

function Organizations(): JSX.Element {
  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Organizations</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <OrganizationsContent />
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default Organizations;
