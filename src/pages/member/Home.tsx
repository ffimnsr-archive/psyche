import React from "react";
import styled from "styled-components";
// import gql from "graphql-tag";
// import { useQuery } from "react-apollo";
import { Helmet } from "react-helmet-async";
import {
  Card,
  Button,
  Elevation,
  Callout,
  Intent,
  NonIdealState,
  Colors,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";

// const INDUSTRY_QUERY = gql`
//   query {
//     industries {
//       id
//     }
//   }
// `;

const Container = styled.main`
  height: 100vh;
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

const ContainerHome = styled.div`
  flex: 0 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ContainerContent = styled.div`
  background-color: ${Colors.WHITE};
`;

const ContainerCallout = styled.div`
  margin-bottom: 10px;
`;

function Home(): JSX.Element {
  const action = (
    <>
      <Button intent={Intent.SUCCESS} fill={true} large={true} text="Join" />
      <small>
        We will notify you immediately through SMS and email once a project gets assigned
        to you.
      </small>
    </>
  );

  const description = (
    <p>
      Once you&apos;ve joined the search pool you&apos;ll be able to get projects that you
      would work on. Those projects were based on things that you&apos;ve indicated on
      your profile. You can either accept or reject the project that&apos;s been assigned
      to you.
    </p>
  );

  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Home</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ContainerHome>
          <ContainerCallout>
            <Callout intent={Intent.WARNING} title="Fill up your profile!">
              In order to use our services you need to complete your initial private
              profile. Your profile will not be shared with any of the clients nor other
              third party services.
            </Callout>
          </ContainerCallout>
          <ContainerContent>
            <Card elevation={Elevation.ONE}>
              <NonIdealState
                icon={IconNames.MOUNTAIN}
                title="Join Search Pool"
                description={description}
                action={action}
              />
            </Card>
          </ContainerContent>
        </ContainerHome>
      </ContainerMain>
    </Container>
  );
}

export default Home;
