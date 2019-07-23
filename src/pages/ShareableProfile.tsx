import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Card,
  H5,
  H1,
  Elevation,
  Spinner,
  Intent,
  NonIdealState,
  Colors,
  Classes,
  Tag,
  Text,
  Divider,
  SpinnerSize,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ContainerRoot, GoBackHomeButton, ImageAvatar } from "@/components";
import { generateHash } from "@/utils";
import { AutoSizer, List } from "react-virtualized";

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

const list = [
  "Brian Vaughn",
  "Brian Vaughn",
  // And so on...
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowRenderer({ key, index, style }: any) {
  return (
    <div key={key} style={style}>
      <div className="flex flex-row">
        <div className="flex-1 flex flex-col items-start">
          <div>
            <b>Current Role</b>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-end">
          <div>Location</div>
        </div>
      </div>
      <div>Organization</div>
      <div>Mar 2019 - Present . 1 yr 11 mos</div>
      <div>{list[index]}</div>
    </div>
  );
}

function ShareableProfileLoading(): JSX.Element {
  return (
    <ContainerNonTrivial>
      <Spinner size={SpinnerSize.LARGE} />
    </ContainerNonTrivial>
  );
}

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

interface MyShareableProfile {
  publicId: string;
  socialSecurityNumber: string;
  email: string;
  joinedAt: string;
  clue?: {
    firstName: string;
    lastName: string;
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
  const { id } = useParams();

  log.trace("ShareableProfileView: rendering component");
  log.debug("ShareableProfileView: loading profile =", id);

  const { loading, error, data } = {} as any;

  if (id !== "demo") {
    if (loading) return <ShareableProfileLoading />;
    if (error) {
      log.error("ShareableProfileView: failed call to profile query =", error);
      return <ShareableProfileError />;
    }
  }

  if (!data) {
    return <ShareableProfileError />;
  }

  const { profile } = data.public;

  const processedProfile: MyShareableProfile = {
    publicId: profile.publicCode,
    socialSecurityNumber: "string",
    email: "loremipsum",
    joinedAt: "06/11/94",
    clue: {
      firstName: "John",
      lastName: "Doe",
      bio: "Lorem Ipsum",
      country: {
        name: "Philippines",
      },
    },
    isAccountVerified: false,
    workExperiences: "Hello",
    kycState: "Valid",
  };

  const { publicId, isAccountVerified, email, clue } =
    processedProfile as MyShareableProfile;
  const emailHash = generateHash(email);

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
                    <div className="float-right">Hello</div>
                    <div>
                      <H1>
                        {clue?.firstName} {clue?.lastName}
                      </H1>
                      <ContainerTag>
                        <Tag
                          icon={isAccountVerified ? IconNames.ENDORSED : null}
                          large={true}
                          minimal={true}
                          intent={Intent.SUCCESS}
                        >
                          {publicId}
                        </Tag>
                        <Tag icon={IconNames.PATH_SEARCH} large={true} minimal={true}>
                          {clue?.country?.name ?? "Unknown Location"}
                        </Tag>
                      </ContainerTag>
                      <ContainerBio>
                        <Text ellipsize={true}>{clue?.bio ?? "A Great Talent"}</Text>
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
