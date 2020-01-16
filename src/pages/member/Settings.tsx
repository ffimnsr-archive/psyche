import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
import { 
  Button,
  Card,
  Elevation,
  H5
} from "@blueprintjs/core";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";

const SETTINGS_QUERY = gql`
  query {
    workFunctions {
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

  & > div.bp3-card:not(:last-child) {
    margin-bottom: 10px;
  }
`;

function Account({ data }) {
  return (
    <Card elevation={Elevation.ONE}>
      <H5>Account</H5>
      <p>Hello</p>
    </Card> 
  );
}

function PrivacyAndSafety({ data }) {
  return (
    <Card elevation={Elevation.ONE}>
      <H5>Privacy and Safety</H5>
      <p>Hello</p>
    </Card> 
  );
}

function Notifications({ data }) {
  return (
    <Card elevation={Elevation.ONE}>
      <H5>Notifications</H5>
      <p>Hello</p>
    </Card> 
  );
}

function WorkPreference({ data }) {
  const workFunctions = data.workFunctions.map(({ id, name }) => (
    <p key={id}>
      {name}
    </p>
  ));

  return (
    <Card elevation={Elevation.ONE}>
      <H5>Work Preference</H5>
      {workFunctions}
    </Card>
  );
}

function SitePreference({ data }) {
  return (
    <Card elevation={Elevation.ONE}>
      <H5>Site Preference</H5>
      <p>Hello</p>
    </Card>  
  );
}

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
            <SitePreference data={data} />
          </SettingsPane>
        </ContainerSettings>
      </ContainerMain>      
    </Container>
  );
}

export default Settings;
