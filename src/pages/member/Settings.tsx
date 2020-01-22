import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
import { 
  Card,
  Elevation,
  H5,
  HTMLTable,
  Checkbox
} from "@blueprintjs/core";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";

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

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

const CheckboxContainer = styled.td`
  & > label.bp3-control.bp3-disabled {
    margin-bottom: 0;
    cursor: pointer;
    color: #182026;
  }
`;

const EditButton = styled.div`
  float: right;
`;

function format(value: string): string {
  return value.replace(/^(\w{4})(\w{4})(\w{4})(\w{4})$/, "$1-$2-$3-$4")
}

function Account({ data }: any) {
  const { socialSecurityNumber } = data.profile;
  return (
    <Card elevation={Elevation.ONE}>
      <div className="clearfixn" style={{marginBottom: "10px"}}>
        <H5 style={{display: "inline"}}>Account</H5>
        <EditButton>EDIT</EditButton>
      </div>
      
      <ResponsiveTable condensed={true}>
        <tbody>
          <tr>
            <td>Social No.</td>
            <td>{format(socialSecurityNumber)}</td>
          </tr>
          <tr>
            <td>First Name</td>
            <td></td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td></td>
          </tr>
          <tr>
            <td>Gender</td>
            <td></td>
          </tr>
          <tr>
            <td>Birt Date</td>
            <td></td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td></td>
          </tr>
          <tr>
            <td>Bio</td>
            <td></td>
          </tr>
        </tbody>
      </ResponsiveTable>
    </Card> 
  );
}

function PrivacyAndSafety({ data }) {
  return (
    <Card elevation={Elevation.ONE}>
      <div className="clearfixn" style={{marginBottom: "10px"}}>
        <H5 style={{display: "inline"}}>Privacy and Safety</H5>
        <EditButton>EDIT</EditButton>
      </div>
      <ResponsiveTable condensed={true}>
        <tbody>
          <tr>
            <td>
              
            </td>
          </tr>
        </tbody>
      </ResponsiveTable>
    </Card> 
  );
}

function Notifications({ data }) {
  return (
    <Card elevation={Elevation.ONE}>
      <div className="clearfixn" style={{marginBottom: "10px"}}>
        <H5 style={{display: "inline"}}>Site Preference & Notifications</H5>
        <EditButton>EDIT</EditButton>
      </div>
      <ResponsiveTable condensed={true}>
        <tbody>
          <tr>
            <td>
              
            </td>
          </tr>
        </tbody>
      </ResponsiveTable>
    </Card> 
  );
}

function WorkPreference({ data }: any) {
  const workFunctions = data.wf.map(({ id, name }: any) => (
    <tr>
      <CheckboxContainer>
        <Checkbox
          key={id}
          label={name}
          defaultIndeterminate={false}
          disabled={true}
        />        
      </CheckboxContainer>
    </tr>    
  ));

  return (
    <Card elevation={Elevation.ONE}>
      <div className="clearfixn" style={{marginBottom: "10px"}}>
        <H5 style={{display: "inline"}}>Work Preference</H5>
        <EditButton>EDIT</EditButton>
      </div>      
      <ResponsiveTable condensed={true}>
        <tbody>
          {workFunctions}
        </tbody>
      </ResponsiveTable>
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
          </SettingsPane>
        </ContainerSettings>
      </ContainerMain>      
    </Container>
  );
}

export default Settings;
