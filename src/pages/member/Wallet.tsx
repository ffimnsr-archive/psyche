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
import { WithdrawalRequest } from "@/models";
import { useQuery, gql } from "@apollo/client";

const WITHDRAWAL_REQUESTS_QUERY = gql`
  query _withdrawalRequests {
    withdrawalRequest {
      withdrawalRequests {
        id
        userId
        amount
        referenceNo
        remarks
        approvedById
        approvedAt
        status
      }
    }
  }
`;

const ContainerWithdrawalRequests = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function WithdrawalRequestList({ list }: { list: WithdrawalRequest[] }): JSX.Element {
  const withdrawalRequests = list.map(
    ({
      id,
      userId,
      amount,
      referenceNo,
      remarks,
      approvedById,
      approvedAt,
      status,
    }: WithdrawalRequest) => (
      <tr key={id}>
        <td>{id}</td>
        <td>{userId}</td>
        <td>{amount}</td>
        <td>{referenceNo}</td>
        <td>{remarks}</td>
        <td>{approvedById}</td>
        <td>{approvedAt}</td>
        <td>{status}</td>
      </tr>
    ),
  );

  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>WALLET</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{withdrawalRequests}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function WithdrawalRequestsContent(): JSX.Element {
  const { loading, error, data } = useQuery(WITHDRAWAL_REQUESTS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerWithdrawalRequests>
      <WithdrawalRequestList list={data.withdrawalRequest.withdrawalRequests} />
    </ContainerWithdrawalRequests>
  );
}

function WalletView(): JSX.Element {
  log.trace("Rendering wallet view");

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Wallet</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <WithdrawalRequestsContent />
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default WalletView;
