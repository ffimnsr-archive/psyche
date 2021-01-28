import React from "react";
// import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
// import { gql } from "@apollo/client";
import { AutoSizer, List } from "react-virtualized";
import { Card, H5 } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";

// const MY_PROFILE_QUERY = gql`
//   query __myProfile {
//     userClue {
//       myProfile {
//         id
//         username
//         organizations {
//           id
//         }
//       }
//     }
//   }
// `;

const ContainerProfile = styled.div`
  flex: 0 1 auto;
  margin: 20px;
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-gap: 10px;
`;

const ProfileMb10 = styled.div`
  margin-bottom: 10px;
`;

const ProfileMb20 = styled.div`
  margin-bottom: 20px;
`;

const ProfileMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 10px;
  }
`;

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

function Profile(): JSX.Element {
  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Profile</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ContainerProfile>
          <div>
            <Card>
              <img src="https://ui-avatars.com/api/?size=210" />
              <ProfileMb20 />
              <ProfileMb10>
                <b>Name</b>
                <div>John Doe</div>
              </ProfileMb10>
              <ProfileMb10>
                <b>Joined Date</b>
                <div>June 10, 1994</div>
              </ProfileMb10>
              <ProfileMb10>
                <b>Email</b>
                <div>jd@example.com</div>
              </ProfileMb10>
              <ProfileMb10>
                <b>Shareable Profile</b>
                <div>Click Here</div>
              </ProfileMb10>
            </Card>
          </div>
          <ProfileMiddleContainer>
            <Card>
              <H5>Work Experience</H5>
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
            <Card>
              <H5>Work Status</H5>
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
          </ProfileMiddleContainer>
          <div>
            <Card>
              <H5>Connect</H5>
              <ProfileMb20 />
              <ProfileMb10>
                <b>LinkedIn</b>
                <div>None</div>
              </ProfileMb10>
              <ProfileMb10>
                <b>Facebook</b>
                <div>None</div>
              </ProfileMb10>
              <ProfileMb10>
                <b>Github</b>
                <div>None</div>
              </ProfileMb10>
              <ProfileMb10>
                <b>Dribble</b>
                <div>None</div>
              </ProfileMb10>
              <ProfileMb10>
                <b>Blog / Website</b>
                <div>None</div>
              </ProfileMb10>
            </Card>
          </div>
        </ContainerProfile>
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default Profile;
