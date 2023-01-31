import React, { useEffect, useState } from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Card, H5 } from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
  ImageAvatar,
  FullPageLoader,
} from "../../components";
import { generateHash } from "../../utils";
import { Link } from "react-router-dom";
import { useAuth0, User } from "@auth0/auth0-react";
import { PrivRoute } from "../../Router";

const ContainerProfile = styled.div`
  flex: 0 1 auto;
  margin: 20px;
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-gap: 10px;
`;

const ProfileMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 10px;
  }
`;

function ProfileView(): JSX.Element {
  log.trace("ProfileView: rendering component");

  const { loading, error, data } = {} as any;
  const { user } = useAuth0();
  const [userProfile, setUserProfile] = useState<User>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setUserProfile(user);
    };

    fetchUserProfile();
  }, [user]);

  if (loading) return <FullPageLoader />;
  if (error) {
    log.error("ProfileView: failed call to my profile query =", error);
    return <div>Error</div>;
  }

  log.debug("ProfileContent: profile call result =", data);
  if (!data || !data.public.profile) {
    return <div>Empty</div>;
  }

  const profile = data.public.profile;
  const emailHash = generateHash(userProfile?.email ?? profile.username);

  const info = [
    { name: "Name", data: `${userProfile?.firstName} ${userProfile?.lastName}` },
    { name: "Joined Date", data: "June 10, 1994" },
    { name: "Email", data: userProfile?.email },
    {
      name: "Shareable Profile",
      data: <Link to={`/o/public/share/${profile.publicCode}`}>Click Here</Link>,
    },
  ];

  const infoComponents = info.map((x, i) => (
    <div className="mb-1" key={i}>
      <b>{x.name}</b>
      <div>{x.data ?? "None"}</div>
    </div>
  ));

  const connect = [
    { name: "LinkedIn", profileUrl: profile.socialLinkedIn },
    { name: "Facebook", profileUrl: profile.socialFacebook },
    { name: "Github", profileUrl: profile.socialGithub },
    { name: "Dribble", profileUrl: profile.socialDribble },
    { name: "Blog / Website", profileUrl: profile.socialBlog },
  ];

  const connectComponents = connect.map((x, i) => (
    <div className="mb-1" key={i}>
      <b>{x.name}</b>
      <div>{x.profileUrl ?? "None"}</div>
    </div>
  ));

  return (
    <PrivRoute>
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
                <div className="mb-4" />
                {infoComponents}
              </Card>
            </div>
            <ProfileMiddleContainer>
              <Card>
                <H5>Work Experience</H5>
                <div></div>
              </Card>
              <Card>
                <H5>User Activity</H5>
                <div style={{ height: "400px" }}>
                  {/* <UserActivityCalendar data={DemoCalendarData} /> */}
                </div>
              </Card>
              <Card>
                <H5>Work Status</H5>
                <div></div>
              </Card>
            </ProfileMiddleContainer>
            <div>
              <Card>
                <H5>Connect</H5>
                <div className="mb-4" />
                {connectComponents}
              </Card>
            </div>
          </ContainerProfile>
        </ContainerRootInner>
      </ContainerRoot>
    </PrivRoute>
  );
}

export default ProfileView;
