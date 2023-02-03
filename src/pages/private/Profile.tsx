import React, { useEffect, useState } from "react";
import log from "loglevel";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Helmet } from "react-helmet-async";
import { Card, H5 } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
  ImageAvatar,
  FullPageLoader,
} from "../../components";
import { generateHash } from "../../utils";
import { PrivRoute } from "../../Router";
import { walletState } from "../../utils/atom";

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

export interface UserProfile {
  firstName: string;
  lastName: string;
  joinedDate: string;
  email: string;
  publicCode: string;
  socialSecurityNumber?: string;
  socialLinkedIn?: string;
  socialFacebook?: string;
  socialGithub?: string;
  socialDribble?: string;
  socialBlog?: string;
}

function ProfileView(): JSX.Element {
  log.trace("ProfileView: rendering component");
  const walletKey = useRecoilValue(walletState);

  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`http://localhost:8080/api/me`);
      const data = await resp.json();
      setProfile(data);
    };

    fetchData();
  });

  log.debug("ProfileView: profile call result =", profile);
  if (!profile) {
    return <FullPageLoader />;
  }

  const emailHash = generateHash(profile.email);

  const info = [
    { name: "Wallet", data: `${walletKey}` },
    { name: "Name", data: `${profile.firstName} ${profile.lastName}` },
    { name: "Joined Date", data: profile.joinedDate },
    { name: "Email", data: profile.email },
    {
      name: "Shareable Profile",
      data: <Link to={`/_/public/share/${profile.publicCode}`}>Click Here</Link>,
    },
  ];

  const infoComponents = info.map((x, i) => (
    <div className="mb-1" key={i}>
      <b>{x.name}</b>
      <div style={{ overflow: "hidden" }}>{x.data ?? "None"}</div>
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
                <div style={{ height: "400px" }}></div>
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
