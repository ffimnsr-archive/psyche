import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";
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

function UserList({ list }: { list: UserClue[] }): JSX.Element {
  const users = list.map(({ id, globalId, username, avatar }: UserClue) => (
    <tr key={id}>
      <td>{id}</td>
      <td>{globalId}</td>
      <td>{username}</td>
      <td>{avatar}</td>
    </tr>
  ));

  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>ALL USERS</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{users}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function UsersContent(): JSX.Element {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerOrganizations>
      <UserList list={data.userClue.userClues} />
    </ContainerOrganizations>
  );
}

function Users(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Users</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <UsersContent />
      </ContainerMain>
    </Container>
  );
}

export default Users;