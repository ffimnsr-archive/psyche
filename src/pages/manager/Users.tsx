import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Sidebar, NavigationHeader } from "@/components";
import { UserClue } from "@/models";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

const USERS_QUERY = gql`
  query _users {
    userClue {
      userClues {
        id
        globalId
        username
        avatar
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

const ContainerUsers = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

const IdentityData = styled.td`
  text-transform: uppercase;
`;

const GlobalData = styled.td`
  text-transform: uppercase;
`;

const MoreData = styled.td`
  text-align: right !important;
`;

function UserList({ list }: { list: UserClue[] }): JSX.Element {
  const users = list.map(({ id, globalId, username, avatar }: UserClue) => (
    <tr key={id}>
      <IdentityData>{id}</IdentityData>
      <GlobalData>{globalId}</GlobalData>
      <td>{username}</td>
      <td>{avatar}</td>
      <MoreData>
        <a>
          <Icon icon={IconNames.MORE} />
        </a>
      </MoreData>
    </tr>
  ));

  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>USERS</H5>
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

  return (
    <ContainerUsers>
      <UserList list={data.userClue.userClues} />
    </ContainerUsers>
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
