import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { H5, Card, Elevation, H2 } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "../../components";

const ContainerWithdrawalRequests = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;

  & > div {
    margin-bottom: 0.5rem;
  }
`;

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function WithdrawalRequestList({ list }: { list: WithdrawalRequest[] }): JSX.Element {
//   const withdrawalRequests = list.map(
//     ({
//       id,
//       userId,
//       amount,
//       referenceNo,
//       remarks,
//       approvedById,
//       approvedAt,
//       status,
//     }: WithdrawalRequest) => (
//       <tr key={id}>
//         <td>{id}</td>
//         <td>{userId}</td>
//         <td>{amount}</td>
//         <td>{referenceNo}</td>
//         <td>{remarks}</td>
//         <td>{approvedById}</td>
//         <td>{approvedAt}</td>
//         <td>{status}</td>
//       </tr>
//     ),
//   );

//   return (
//     <>
//       <Card elevation={Elevation.ONE}>
//         <H5>WALLET</H5>
//         <ResponsiveTable condensed={true} striped={true}>
//           {/* <tbody>{withdrawalRequests}</tbody> */}
//         </ResponsiveTable>
//       </Card>
//     </>
//   );
// }

function WithdrawalRequestsContent(): JSX.Element {
  // const { loading, error, data } = useQuery(WITHDRAWAL_REQUESTS_QUERY);

  // if (loading) return <p>Loading</p>;
  // if (error) {
  //   log.error(error);
  //   return <p>Error</p>;
  // }

  return (
    <ContainerWithdrawalRequests>
      <Card elevation={Elevation.ONE} className="text-white bg-blue-700 p-11">
        <p className="text-white">Available Cash</p>
        <H2 className="text-white">P 200,000,000.00</H2>
        <p className="text-white">Total Equity</p>
        <H2 className="text-white">P 200,000,000.00</H2>
      </Card>
      <Card elevation={Elevation.ONE}>
        <H5>Withdrawal Requests</H5>
        <div className="h-25"></div>
      </Card>
    </ContainerWithdrawalRequests>
  );
}

function WalletView(): JSX.Element {
  log.trace("WalletView: rendering component");

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
