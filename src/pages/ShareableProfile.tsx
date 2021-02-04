import React from "react";
import log from "loglevel";
import styled from "styled-components";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery, gql } from "@apollo/client";
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
  HTMLTable,
  Divider,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ContainerRoot, HapButton, ImageAvatar } from "@/components";
import { generateHash, camelizeKeys } from "@/utils";

const REQUEST_PROFILE_QUERY = gql`
  query _requestProfile($publicCode: String!) {
    userClue {
      profile(publicCode: $publicCode) {
        id
        globalId
        publicCode
        username
        avatar
      }
    }
  }
`;

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

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
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

function ShareableProfileLoading(): JSX.Element {
  return (
    <ContainerNonTrivial>
      <Spinner size={Spinner.SIZE_LARGE} />
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

  const action = (
    <HapButton to="/" intent={Intent.PRIMARY} large={true}>
      Go Back Home
    </HapButton>
  );

  return (
    <ContainerNonTrivial>
      <NonIdealState
        icon={IconNames.WARNING_SIGN}
        title="Profile Not Found!"
        description={description}
        action={action}
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

function ShareableProfile(): JSX.Element {
  // const { id } = useParams<{ id: string }>();
  // const { loading, error, data } = useQuery(REQUEST_PROFILE_QUERY, {
  //   variables: { id },
  // });

  // if (loading) return <ShareableProfileLoading />;
  // if (error) {
  //   log.error(error);
  //   return <ShareableProfileError />;
  // }

  // if (_.isNil(data.requestProfile) || _.isNil(data.requestProfile.profile))
  //   return <ShareableProfileError />;

  // const { profile } = data.requestProfile;
  // const processedProfile = camelizeKeys(profile);

  const processedProfile: MyShareableProfile = {
    publicId: "Hello",
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

  const {
    publicId,
    isAccountVerified,
    email,
    clue,
  } = processedProfile as MyShareableProfile;
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
                    <div style={{ float: "right" }}>Hello</div>
                    <div>
                      <H1>
                        {clue?.firstName} {clue?.lastName}
                      </H1>
                      <ContainerTag>
                        <Tag
                          icon={isAccountVerified ? IconNames.ENDORSED : IconNames.BLANK}
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
              <ResponsiveTable condensed={true}>
                <tbody>
                  <tr>
                    <td>Hello</td>
                    <td>Hello</td>
                  </tr>
                </tbody>
              </ResponsiveTable>
            </Card>
            <Card elevation={Elevation.ONE}>
              <div className="clearfixr" style={{ marginBottom: "10px" }}>
                <H5 style={{ display: "inline" }}>Work Functions</H5>
              </div>
              <CustomDivider />
              <p>Hello</p>
            </Card>
            <Card elevation={Elevation.ONE}>
              <div className="clearfixr" style={{ marginBottom: "10px" }}>
                <H5 style={{ display: "inline" }}>Issues Resolved</H5>
              </div>
              <ResponsiveTable condensed={true}>
                <tbody>
                  <tr>
                    <td>Hello</td>
                    <td>Hello</td>
                  </tr>
                </tbody>
              </ResponsiveTable>
            </Card>
          </ProfilePane>
        </ContainerProfile>
      </ContainerMain>
    </ContainerRoot>
  );
}

export default ShareableProfile;
