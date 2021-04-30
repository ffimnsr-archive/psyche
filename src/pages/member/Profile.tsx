import React, { useEffect, useState } from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { AutoSizer, List } from "react-virtualized";
import { Card, H5 } from "@blueprintjs/core";
import { ResponsiveCalendar } from "@nivo/calendar";
import { DemoCalendarData } from "@/seeds";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
  ImageAvatar,
} from "@/components";
import { generateHash } from "@/utils";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { MY_PROFILE_QUERY } from "@/operations/queries";
import { UserClue } from "@/models";
import { useKeycloak } from "@react-keycloak/web";
import { KeycloakProfile } from "keycloak-js";

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
function UserActivityCalendar({ data }: any) {
  return (
    <ResponsiveCalendar
      data={data}
      from="2015-03-01"
      to="2016-07-12"
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
}

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

function ProfileView(): JSX.Element {
  log.trace("ProfileView: rendering component");

  const { loading, error, data } = useQuery(MY_PROFILE_QUERY);
  const { keycloak } = useKeycloak();
  const [userProfile, setUserProfile] = useState<KeycloakProfile>();

  log.info(keycloak.userInfo);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const temp = await keycloak.loadUserProfile();
      setUserProfile(temp);
    };

    fetchUserProfile();
  }, [keycloak]);

  if (loading) return <div>Loading</div>;
  if (error) {
    log.error("ProfileView: failed call to my profile query =", error);
    return <div>Error</div>;
  }

  log.debug("ProfileContent: profile call result =", data);
  if (!data || !data.userClue.myProfile) {
    return <div>Empty</div>;
  }

  const profile: UserClue = data.userClue.myProfile;
  const emailHash = generateHash(userProfile?.email ?? profile.username);

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
              <ImageAvatar
                src={`https://www.gravatar.com/avatar/${emailHash}?s=210&d=robohash`}
                alt="avatar"
              />
              <ProfileMb20 />
              <ProfileMb10>
                <b>Name</b>
                <div>{`${userProfile?.firstName} ${userProfile?.lastName}`}</div>
              </ProfileMb10>
              <ProfileMb10>
                <b>Joined Date</b>
                <div>June 10, 1994</div>
              </ProfileMb10>
              <ProfileMb10>
                <b>Email</b>
                <div>{userProfile?.email}</div>
              </ProfileMb10>
              <ProfileMb10>
                <b>Shareable Profile</b>
                <div>
                  <Link to={`/o/public/share/${profile.publicCode}`}>Click Here</Link>
                </div>
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
              <H5>User Activity</H5>
              <div style={{ height: "400px" }}>
                <UserActivityCalendar data={DemoCalendarData} />
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

export default ProfileView;
