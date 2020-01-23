import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
import {
  Card,
  Elevation,
  H5,
  HTMLTable,
  Dialog,
  Classes,
  Tooltip,
  Button,
  AnchorButton,
  Intent,
  Checkbox
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
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

const EditButton = styled.a`
  float: right;
`;

const defaultDialogOptions = {
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: false,
  enforceFocus: true,
  usePortal: true
};

function format(value: string): string {
  return value.replace(/^(\w{4})(\w{4})(\w{4})(\w{4})$/, "$1-$2-$3-$4")
}

function Account({ data }: any) {
  const title = "Account"
  const [isOpen, setIsOpen] = useState(false);
  const { socialSecurityNumber } = data.profile;
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <div className="clearfixr" style={{marginBottom: "10px"}}>
          <H5 style={{display: "inline"}}>{title}</H5>
          <EditButton
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            EDIT
          </EditButton>
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
      <Dialog
        icon={IconNames.INFO_SIGN}
        title={title}
        onClose={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        {...defaultDialogOptions}
      >
        <div className={Classes.DIALOG_BODY}>
          <p>
            <strong>
              Data integration is the seminal problem of the digital age. For over ten years, we’ve
              helped the world’s premier organizations rise to the challenge.
            </strong>
          </p>
          <p>
            Palantir Foundry radically reimagines the way enterprises interact with data by amplifying
            and extending the power of data integration. With Foundry, anyone can source, fuse, and
            transform data into any shape they desire. Business analysts become data engineers — and
            leaders in their organization’s data revolution.
          </p>
          <p>
            Foundry’s back end includes a suite of best-in-class data integration capabilities: data
            provenance, git-style versioning semantics, granular access controls, branching,
            transformation authoring, and more. But these powers are not limited to the back-end IT
            shop.
          </p>
          <p>
            In Foundry, tables, applications, reports, presentations, and spreadsheets operate as data
            integrations in their own right. Access controls, transformation logic, and data quality
            flow from original data source to intermediate analysis to presentation in real time. Every
            end product created in Foundry becomes a new data source that other users can build upon.
            And the enterprise data foundation goes where the business drives it.
          </p>
          <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip content="This button is hooked up to close the dialog.">
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </Tooltip>
            <AnchorButton
              intent={Intent.PRIMARY}
              href="https://www.palantir.com/palantir-foundry/"
              target="_blank"
            >
              Visit the Foundry website
            </AnchorButton>
          </div>
        </div>
      </Dialog>
    </>
  );
}

function PrivacyAndSafety({ data }) {
  const title = "Privacy and Safety"
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <div className="clearfixr" style={{marginBottom: "10px"}}>
          <H5 style={{display: "inline"}}>{title}</H5>
          <EditButton
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            EDIT
          </EditButton>
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
      <Dialog
        icon={IconNames.INFO_SIGN}
        title={title}
        onClose={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        {...defaultDialogOptions}
      >
        <div className={Classes.DIALOG_BODY}>
          <p>
            <strong>
              Data integration is the seminal problem of the digital age. For over ten years, we’ve
              helped the world’s premier organizations rise to the challenge.
            </strong>
          </p>
          <p>
            Palantir Foundry radically reimagines the way enterprises interact with data by amplifying
            and extending the power of data integration. With Foundry, anyone can source, fuse, and
            transform data into any shape they desire. Business analysts become data engineers — and
            leaders in their organization’s data revolution.
          </p>
          <p>
            Foundry’s back end includes a suite of best-in-class data integration capabilities: data
            provenance, git-style versioning semantics, granular access controls, branching,
            transformation authoring, and more. But these powers are not limited to the back-end IT
            shop.
          </p>
          <p>
            In Foundry, tables, applications, reports, presentations, and spreadsheets operate as data
            integrations in their own right. Access controls, transformation logic, and data quality
            flow from original data source to intermediate analysis to presentation in real time. Every
            end product created in Foundry becomes a new data source that other users can build upon.
            And the enterprise data foundation goes where the business drives it.
          </p>
          <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip content="This button is hooked up to close the dialog.">
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </Tooltip>
            <AnchorButton
              intent={Intent.PRIMARY}
              href="https://www.palantir.com/palantir-foundry/"
              target="_blank"
            >
              Visit the Foundry website
            </AnchorButton>
          </div>
        </div>
      </Dialog>
    </>
  );
}

function Notifications({ data }) {
  const title = "Site Preference & Notifications";
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <div className="clearfixr" style={{marginBottom: "10px"}}>
          <H5 style={{display: "inline"}}>{title}</H5>
          <EditButton
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            EDIT
          </EditButton>
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
      <Dialog
        icon={IconNames.INFO_SIGN}
        title={title}
        onClose={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        {...defaultDialogOptions}
      >
        <div className={Classes.DIALOG_BODY}>
          <p>
            <strong>
              Data integration is the seminal problem of the digital age. For over ten years, we’ve
              helped the world’s premier organizations rise to the challenge.
            </strong>
          </p>
          <p>
            Palantir Foundry radically reimagines the way enterprises interact with data by amplifying
            and extending the power of data integration. With Foundry, anyone can source, fuse, and
            transform data into any shape they desire. Business analysts become data engineers — and
            leaders in their organization’s data revolution.
          </p>
          <p>
            Foundry’s back end includes a suite of best-in-class data integration capabilities: data
            provenance, git-style versioning semantics, granular access controls, branching,
            transformation authoring, and more. But these powers are not limited to the back-end IT
            shop.
          </p>
          <p>
            In Foundry, tables, applications, reports, presentations, and spreadsheets operate as data
            integrations in their own right. Access controls, transformation logic, and data quality
            flow from original data source to intermediate analysis to presentation in real time. Every
            end product created in Foundry becomes a new data source that other users can build upon.
            And the enterprise data foundation goes where the business drives it.
          </p>
          <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip content="This button is hooked up to close the dialog.">
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </Tooltip>
            <AnchorButton
              intent={Intent.PRIMARY}
              href="https://www.palantir.com/palantir-foundry/"
              target="_blank"
            >
              Visit the Foundry website
            </AnchorButton>
          </div>
        </div>
      </Dialog>
    </>
  );
}

function WorkPreference({ data }: any) {
  const title = "Work Preference"
  const [isOpen, setIsOpen] = useState(false);
  const workFunctions = data.wf.map(({ id, name }: any) => (
    <tr key={id}>
      <CheckboxContainer>
        <Checkbox
          label={name}
          defaultIndeterminate={false}
          disabled={true}
        />
      </CheckboxContainer>
    </tr>
  ));

  return (
    <>
      <Card elevation={Elevation.ONE}>
        <div className="clearfixr" style={{marginBottom: "10px"}}>
          <H5 style={{display: "inline"}}>{title}</H5>
          <EditButton>EDIT</EditButton>
        </div>
        <ResponsiveTable condensed={true}>
          <tbody>
            {workFunctions}
          </tbody>
        </ResponsiveTable>
      </Card>
      <Dialog
        icon={IconNames.INFO_SIGN}
        title={title}
        onClose={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        {...defaultDialogOptions}
      >
        <div className={Classes.DIALOG_BODY}>
          <p>
            <strong>
              Data integration is the seminal problem of the digital age. For over ten years, we’ve
              helped the world’s premier organizations rise to the challenge.
            </strong>
          </p>
          <p>
            Palantir Foundry radically reimagines the way enterprises interact with data by amplifying
            and extending the power of data integration. With Foundry, anyone can source, fuse, and
            transform data into any shape they desire. Business analysts become data engineers — and
            leaders in their organization’s data revolution.
          </p>
          <p>
            Foundry’s back end includes a suite of best-in-class data integration capabilities: data
            provenance, git-style versioning semantics, granular access controls, branching,
            transformation authoring, and more. But these powers are not limited to the back-end IT
            shop.
          </p>
          <p>
            In Foundry, tables, applications, reports, presentations, and spreadsheets operate as data
            integrations in their own right. Access controls, transformation logic, and data quality
            flow from original data source to intermediate analysis to presentation in real time. Every
            end product created in Foundry becomes a new data source that other users can build upon.
            And the enterprise data foundation goes where the business drives it.
          </p>
          <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip content="This button is hooked up to close the dialog.">
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </Tooltip>
            <AnchorButton
              intent={Intent.PRIMARY}
              href="https://www.palantir.com/palantir-foundry/"
              target="_blank"
            >
              Visit the Foundry website
            </AnchorButton>
          </div>
        </div>
      </Dialog>
    </>
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
