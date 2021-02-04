import React from "react";
// import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
// import { useQuery, gql } from "@apollo/client";
import { AutoSizer, List } from "react-virtualized";
import { Card } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";

// const FEED_QUERY = gql`
//   query _feed {
//     industries {
//       id
//     }
//   }
// `;

const ContainerNewsFeed = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

// const NewsFeed = styled.div`
//   min-width: 600px;
//   background-color: ${Colors.WHITE};

//   & > div.${Classes.CARD}:not(:last-child) {
//     margin-bottom: 10px;
//   }
// `;

// function Feeds(): JSX.Element {
//   // const { loading, error, data } = useQuery(FEED_QUERY);

//   // // FZ_TODO
//   // if (loading) return <p>Loading</p>;
//   // if (error) {
//   //   log.error(error);
//   //   return <p>Error</p>;
//   // }

//   // const feed = data.industries.map(({ id }: { id: number }) => (
//   //   <Card key={id} elevation={Elevation.ONE}>
//   //     <H5>{id}</H5>
//   //     <p>Hello</p>
//   //     <Button text="Explore" />
//   //   </Card>
//   // ));

//   // return <NewsFeed>{feed}</NewsFeed>;
// }

const list = [
  "Brian Vaughn",
  "Brian Vaughn",
  // And so on...
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowRenderer({ key, index, style }: any) {
  return (
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
}

function Feed(): JSX.Element {
  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Feed</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ContainerNewsFeed>
          <Card>
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
        </ContainerNewsFeed>
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default Feed;
