import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Account, Notifications, PrivacyAndSafety, WorkPreference } from "@/pages/member/fragments/SettingsFragment";

const SETTINGS_QUERY = gql`
  query {
    profile: memberMyProfile {
      id
      socialSecurityNumber
      clue {
        firstName
        lastName
        gender
        birthDate
        image
        phoneNumber
        bio
      }
    }
    wf: memberListWorkFunctions {
      id
      name
    }
  }
`;

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

const ContainerSettings = styled.div`
  flex: 0 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SettingsPane = styled.div`
  background-color: #fff;

  & > div.bp3-card {
    margin-bottom: 10px;
  }
`;

function Settings() {
  const { loading, error, data } = useQuery(SETTINGS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <Container>
      <Helmet
        titleTemplate="%s | Open Sesame"
      >
        <title>Settings</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ContainerSettings>
          <SettingsPane>
            <Account data={data} />
            <PrivacyAndSafety data={data} />
            <Notifications data={data} />
            <WorkPreference data={data} />
          </SettingsPane>
        </ContainerSettings>
      </ContainerMain>
    </Container>
  );
}

export default Settings;
