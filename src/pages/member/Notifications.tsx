import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { H5, Card, Elevation } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";
import { Link } from "react-router-dom";
import { AutoSizer, List } from "react-virtualized";

const ContainerNotifications = styled.div`
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
          <Link to="/u/project/12313">
            <b>Project Name</b>
          </Link>
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
        <div>Active</div>
      </div>
    </div>
    <div>Current Role</div>
    <div>Mar 2019 - Present . 1 yr 11 mos</div>
    <div>{list[index]}</div>
  </div>
);

function RecentNotifications(): JSX.Element {
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>Notifications</H5>
        <div>
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
        </div>
      </Card>
    </>
  );
}

function NotificationsView(): JSX.Element {
  log.trace("NotificationsView: rendering component");

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Notifications</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ContainerNotifications>
          <RecentNotifications />
        </ContainerNotifications>
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default NotificationsView;
