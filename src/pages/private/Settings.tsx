import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Card, Checkbox, Classes, H4, H5 } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";
import { WORK_FUNCTIONS_QUERY } from "@/operations/queries";
import { useQuery } from "@apollo/client";
import { WorkFunction } from "@/models/internals";

const ContainerSettings = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

function SettingsView(): JSX.Element {
  log.trace("SettingsView: rendering component");

  const { loading, error, data } = useQuery(WORK_FUNCTIONS_QUERY);
  if (loading) return <div>Loading</div>;
  if (error) {
    log.error("SettingsView: failed call to work functions query =", error);
    return <div>Error</div>;
  }

  log.debug("SettingsView: profile call result =", data);
  if (!data || !data.internal.workFunctions) {
    return <div>Empty</div>;
  }

  const workFunctions: WorkFunction[] = data.internal.workFunctions;

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Settings</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ContainerSettings>
          <Card>
            <H4>Settings</H4>
            <p className={Classes.TEXT_SMALL}>Contains current user settings.</p>
            <H5>Work Interests</H5>
            <div
              style={{
                columnCount: 2,
                columnGap: "1em",
              }}
            >
              <ul className="list-none m-0 pl-1.5">
                {workFunctions.map((x) => (
                  <li key={x.id}>
                    <Checkbox inline={true} label={x.name} />
                  </li>
                ))}
              </ul>
            </div>
            <H5>Site Preferences</H5>
            <div
              style={{
                columnCount: 2,
                columnGap: "1em",
              }}
            >
              <ul className="list-none m-0 pl-1.5">
                <li>
                  <Checkbox inline={true} label="Opt-in personalize marketing" />
                </li>
                <li>
                  <Checkbox inline={true} label="Opt-in anonymous usage statistics" />
                </li>
                <li>
                  <Checkbox inline={true} label="Opt-in experimental beta builds" />
                </li>
              </ul>
            </div>
          </Card>
        </ContainerSettings>
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default SettingsView;
