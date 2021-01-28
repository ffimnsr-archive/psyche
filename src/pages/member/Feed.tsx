import React from "react";
// import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
// import { useQuery, gql } from "@apollo/client";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from "react-virtualized";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const list: any[] = [
  {
    color: "red",
    height: 60,
    caption: "hello",
  },
  {
    color: "green",
    height: 100,
    caption: "hello",
  },
];

const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: true,
});

const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 200,
  spacer: 10,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cellRenderer({ index, key, parent, style }: any) {
  const datum = list[index];

  return (
    <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
      <div
        style={{
          ...style,
          backgroundColor: "#f7f7f7",
          borderRadius: "0.5rem",
          padding: "10px",
          wordBreak: "break-all",
        }}
      >
        <div
          style={{
            backgroundColor: datum.color,
            height: datum.height * 3,
            width: "100%",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 20,
            borderRadius: "0.5rem",
          }}
        >
          Hello
        </div>
        <div>{datum.caption}</div>
      </div>
    </CellMeasurer>
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
                <Masonry
                  cellCount={list.length}
                  cellMeasurerCache={cache}
                  cellPositioner={cellPositioner}
                  cellRenderer={cellRenderer}
                  height={600}
                  width={width}
                  autoHeight={false}
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
