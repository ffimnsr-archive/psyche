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
} from "../../../components";
import { Rank } from "../../../models/internals";

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
  const { loading, error, data } = {} as any;

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  return (
    <ContainerRanks>
      <RankList list={data.rank.ranks} />
    </ContainerRanks>
  );
}

function Ranks(): JSX.Element {
  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Ranks</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <RanksContent />
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default Ranks;
