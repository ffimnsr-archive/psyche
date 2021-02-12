import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { AutoSizer, List } from "react-virtualized";
import { Card, Checkbox, Classes, H4, H5 } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";

const ContainerSettings = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const list = [
  "Brian Vaughn",
  "Brian Vaughn",
  // And so on...
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rowRenderer = ({ key, index, style }: any) => (
  <div key={key} style={style}>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div>
          <b>Current Role</b>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <div>Location</div>
      </div>
    </div>
    <div>Organization</div>
    <div>Mar 2019 - Present . 1 yr 11 mos</div>
    <div>{list[index]}</div>
  </div>
);

function SettingsView(): JSX.Element {
  log.trace("Rendering settings view");

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
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  paddingLeft: 5,
                }}
              >
                <li>
                  <Checkbox inline={true} label="hello1" />
                </li>
                <li>
                  <Checkbox inline={true} label="hello2" />
                </li>
                <li>
                  <Checkbox inline={true} label="hello3" />
                </li>
                <li>
                  <Checkbox inline={true} label="hello4" />
                </li>
              </ul>
            </div>
            <H5>Site Preferences</H5>
            <div
              style={{
                columnCount: 2,
                columnGap: "1em",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  paddingLeft: 5,
                }}
              >
                <li>
                  <Checkbox inline={true} label="hello1" />
                </li>
                <li>
                  <Checkbox inline={true} label="hello2" />
                </li>
                <li>
                  <Checkbox inline={true} label="hello3" />
                </li>
                <li>
                  <Checkbox inline={true} label="hello4" />
                </li>
              </ul>
            </div>
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  height={list.length * 100}
                  rowCount={list.length}
                  rowHeight={100}
                  rowRenderer={rowRenderer}
                  width={width}
                />
              )}
            </AutoSizer>
          </Card>
        </ContainerSettings>
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default SettingsView;
