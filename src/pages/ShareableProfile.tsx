import React, { useEffect, useState } from "react";
import log from "loglevel";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Card,
  H5,
  H1,
  Elevation,
  Intent,
  NonIdealState,
  Colors,
  Classes,
  Tag,
  Text,
  Divider,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ContainerRoot, GoBackHomeButton, ImageAvatar } from "../components";
import { generateHash } from "../utils";
import { UserProfile } from "./private/Profile";

const ContainerNonTrivial = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerMain = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: stretch;
`;

const ContainerProfile = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  max-width: 1000px;
  width: 960px;
`;

const ContainerTag = styled.div`
  margin-bottom: 10px;

  & > :first-child {
    margin-right: 10px;
  }
`;

const ContainerBio = styled.div`
  max-width: 500px;
`;

const Table = styled.table`
  padding: 10px 60px 30px 60px;
  width: 100%;

  & > tbody > tr > td:first-child {
    width: 40%;
    text-align: center;
  }
`;

const CustomDivider = styled(Divider)`
  margin: 5px 0;
`;

const ProfilePane = styled.div`
  background-color: ${Colors.WHITE};

  & > div.${Classes.CARD}:not(:last-child) {
    margin-bottom: 10px;
  }
`;

function ShareableProfileError(): JSX.Element {
  const description = (
    <div>
      The requested profile can not be found in the server. Please double check if you
      have the correct profile address.
    </div>
  );

  return (
    <ContainerNonTrivial>
      <NonIdealState
        icon={IconNames.WARNING_SIGN}
        title="Profile Not Found!"
        description={description}
        action={<GoBackHomeButton />}
      />
    </ContainerNonTrivial>
  );
}

interface ShareableUserProfile extends UserProfile {
  clue?: {
    bio: string;
    country?: {
      name: string;
    };
  };
  isAccountVerified: boolean;
  workExperiences?: string;
  kycState?: string;
}

function ShareableProfileView(): JSX.Element {
  log.trace("ShareableProfileView: rendering component");

  const [profile, setProfile] = useState<ShareableUserProfile | undefined>(undefined);
  const { id } = useParams();

  log.debug("ShareableProfileView: loading profile =", id);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`http://localhost:8080/api/user/${id}/extended`);
      const data = await resp.json();
      setProfile(data);
    };

    fetchData();
  });

  if (!profile || !id) {
    return <ShareableProfileError />;
  }

  const emailHash = generateHash(id);

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Profile</title>
      </Helmet>
      <ContainerMain>
        <ContainerProfile>
          <ProfilePane>
            <Table>
              <tbody>
                <tr>
                  <td>
                    <ImageAvatar
                      src={`https://www.gravatar.com/avatar/${emailHash}?s=200&d=robohash`}
                      alt="avatar"
                    />
                  </td>
                  <td>
                    <div className="float-right">Hey there!</div>
                    <div>
                      <H1>
                        {profile.firstName} {profile.lastName}
                      </H1>
                      <ContainerTag>
                        <Tag
                          icon={profile.isAccountVerified ? IconNames.ENDORSED : null}
                          large={true}
                          minimal={true}
                          intent={Intent.SUCCESS}
                        >
                          {profile.publicCode}
                        </Tag>
                        <Tag icon={IconNames.PATH_SEARCH} large={true} minimal={true}>
                          {profile.clue?.country?.name ?? "Unknown Location"}
                        </Tag>
                      </ContainerTag>
                      <ContainerBio>
                        <Text ellipsize={true}>
                          {profile.clue?.bio ?? "A Great Talent"}
                        </Text>
                      </ContainerBio>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Card elevation={Elevation.ONE}>
              <div className="clearfixr" style={{ marginBottom: "10px" }}>
                <H5 style={{ display: "inline" }}>Work Experiences</H5>
              </div>
              <CustomDivider />
              <br />
              <div></div>
            </Card>
            <Card elevation={Elevation.ONE}>
              <div className="clearfixr" style={{ marginBottom: "10px" }}>
                <H5 style={{ display: "inline" }}>Work Functions</H5>
              </div>
              <CustomDivider />
              <br />
              <div></div>
            </Card>
            <Card elevation={Elevation.ONE}>
              <div className="clearfixr" style={{ marginBottom: "10px" }}>
                <H5 style={{ display: "inline" }}>Issues Resolved</H5>
              </div>
              <CustomDivider />
              <br />
              <div></div>
            </Card>
          </ProfilePane>
        </ContainerProfile>
      </ContainerMain>
    </ContainerRoot>
  );
}

export default ShareableProfileView;
