import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
import { Colors, Classes, Spinner } from "@blueprintjs/core";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";
import {
  Account,
  Notifications,
  PrivacyAndSafety,
  WorkPreference,
} from "@/pages/member/settings_fragments/SettingsFragment";

const SETTINGS_QUERY = gql`
  query _settings {
    profile: myProfile {
      id
      email
      publicId
      socialSecurityNumber
      workPreference {
        interests
        projectLimit
      }
      sitePreference {
        optInMarketing
        optInUsageStat
        experimentalFeatures
        supportPin
      }
      clue {
        id
        firstName
        lastName
        gender
        birthDate
        image
        bio
        phoneNumber
        country {
          id
          name
        }
      }
    }
    countries {
      id
      name
    }
    workFunctions {
      id
      name
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

const ContainerSettings = styled.div`
  flex: 0 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-x: none;
  overflow-y: none;
`;

const ContainerNonTrivial = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
`;

const SettingsPane = styled.div`
  background-color: ${Colors.WHITE};

  & > div.${Classes.CARD} {
    margin-bottom: 10px;
  }
`;

function SettingsLoading(): JSX.Element {
  return (
    <ContainerNonTrivial>
      <Spinner size={Spinner.SIZE_LARGE} />
    </ContainerNonTrivial>
  );
}

function SettingsContent(): JSX.Element {
  const { loading, error, data } = useQuery(SETTINGS_QUERY);

  if (loading) return <SettingsLoading />;
  if (error) return <SettingsLoading />;

  return (
    <SettingsPane>
      <Account data={data} />
      <WorkPreference data={data} />
      <PrivacyAndSafety data={data} />
      <Notifications data={data} />
    </SettingsPane>
  );
}

function Settings(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Settings</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ContainerSettings>
          <SettingsContent />
        </ContainerSettings>
      </ContainerMain>
    </Container>
  );
}

export default Settings;
