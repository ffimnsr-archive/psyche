import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar, NavigationHeader } from "@/components";
import { Rank } from "@/models/internals";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

const RANKS_QUERY = gql`
  query _ranks {
    rank {
      ranks {
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

const ContainerRanks = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function RankList({ list }: { list: Rank[] }): JSX.Element {
  const ranks = list.map(({ id, name, description }: Rank) => (
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
        <H5>RANKS</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{ranks}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function RanksContent(): JSX.Element {
  const { loading, error, data } = useQuery(RANKS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerRanks>
      <RankList list={data.rank.ranks} />
    </ContainerRanks>
  );
}

function Ranks(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Ranks</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <RanksContent />
      </ContainerMain>
    </Container>
  );
}

export default Ranks;
