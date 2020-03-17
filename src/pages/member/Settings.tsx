import React from "react";
import log from "loglevel";
import styled from "styled-components";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
import { Colors, Classes, Spinner, NonIdealState, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Sidebar } from "@/components/Sidebar";
import { HapButton } from "@/components/HapButton";
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
        id
        interests
        projectLimit
      }
      sitePreference {
        id
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

function SettingsError(): JSX.Element {
  const description = (
    <div>The requested settings data can not be found in the server.</div>
  );

  const action = (
    <HapButton to="/" intent={Intent.PRIMARY} large={true}>
      Go Back Home
    </HapButton>
  );

  return (
    <ContainerNonTrivial>
      <NonIdealState
        icon={IconNames.WARNING_SIGN}
        title="Settings Data Not Found!"
        description={description}
        action={action}
      />
    </ContainerNonTrivial>
  );
}

function SettingsContent(): JSX.Element {
  const { loading, error, data } = useQuery(SETTINGS_QUERY);

  if (loading) return <SettingsLoading />;
  if (error) {
    log.error(error);
    return <SettingsError />;
  }

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
