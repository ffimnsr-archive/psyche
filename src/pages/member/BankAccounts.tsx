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
import { BankAccount } from "@/models";
import { useQuery, gql } from "@apollo/client";

const BANK_ACCOUNTS_QUERY = gql`
  query _bankAccountsQuery {
    bankAccount {
      bankAccounts {
        id
        userId
        accountName
        accountNo
        bankAddress
        bankBranch
        bankName
        bankSwiftCode
        bankRoutingNumber
      }
    }
  }
`;

const ContainerBankAccounts = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function BankAccountList({ list }: { list: BankAccount[] }): JSX.Element {
  const bankAccounts = list.map(
    ({
      id,
      userId,
      accountName,
      accountNo,
      bankAddress,
      bankBranch,
      bankName,
      bankSwiftCode,
      bankRoutingNumber,
    }: BankAccount) => (
      <tr key={id}>
        <td>{id}</td>
        <td>{userId}</td>
        <td>{accountName}</td>
        <td>{accountNo}</td>
        <td>{bankAddress}</td>
        <td>{bankBranch}</td>
        <td>{bankName}</td>
        <td>{bankSwiftCode}</td>
        <td>{bankRoutingNumber}</td>
        <td></td>
      </tr>
    ),
  );

  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>BANK ACCOUNTS</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{bankAccounts}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function BankAccountsContent(): JSX.Element {
  const { loading, error, data } = useQuery(BANK_ACCOUNTS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerBankAccounts>
      <BankAccountList list={data.bankAccount.bankAccounts} />
    </ContainerBankAccounts>
  );
}

function BankAccountsView(): JSX.Element {
  log.trace("Rendering bank accounts view");

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>BankAccounts</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <BankAccountsContent />
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default BankAccountsView;
