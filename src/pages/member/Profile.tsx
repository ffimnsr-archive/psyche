import React from "react";
import log from "loglevel";
import styled from "styled-components";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
import {
  Card,
  H5,
  H1,
  Elevation,
  Colors,
  Classes,
  Text,
  Tag,
  Intent,
  HTMLTable,
  Divider,
  Spinner,
  NonIdealState,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";
import { HapButton } from "@/components/HapButton";
import { generateHash } from "@/utils";

const PROFILE_QUERY = gql`
  query _profile {
    profile: myProfile {
      id
      publicId
      isAccountVerified
      email
      clue {
        id
        firstName
        lastName
        fullName
        bio
        country {
          id
          name
        }
      }
    }
  }
`;

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerMain = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerProfile = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ContainerNonTrivial = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
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

const ContainerButton = styled.div`
  margin: 10px 0;

  & > :first-child {
    margin-right: 10px;
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

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

const Table = styled.table`
  padding: 10px 60px 30px 60px;
  width: 100%;

  & > tbody > tr > td:first-child {
    width: 30%;
    text-align: center;
  }
`;

const ImageAvatar = styled.img`
  border-radius: 50%;
  border: 1px dashed #000;
`;

interface MyProfile {
  id: number;
  publicId: string;
  isAccountVerified: boolean;
  email: string;
  clue?: {
    firstName: string;
    lastName: string;
    fullName: string;
    bio: string;
    country?: {
      name: string;
    };
  };
}

function ProfileLoading(): JSX.Element {
  return (
    <ContainerNonTrivial>
      <Spinner size={Spinner.SIZE_LARGE} />
    </ContainerNonTrivial>
  );
}

function ProfileError(): JSX.Element {
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

function ProfileContent(): JSX.Element {
  const { loading, error, data } = useQuery(PROFILE_QUERY);

  if (loading) return <ProfileLoading />;
  if (error) {
    log.error(error);
    return <ProfileError />;
  }

  const { publicId, isAccountVerified, email, clue } =
    (data.profile as MyProfile) ??
    ({ id: 0, publicId: "", isAccountVerified: false, email: "" } as MyProfile);
  const emailHash = generateHash(email);

  return (
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
              <H1>{clue?.fullName}</H1>
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
              <ContainerButton>
                <HapButton
                  to={`/u/share/${publicId}`}
                  icon={IconNames.SHARE}
                  text="Shareable Link"
                  large={true}
                  intent={Intent.PRIMARY}
                />
                <HapButton
                  to="/settings"
                  icon={IconNames.EDIT}
                  text="Edit Profile"
                  large={true}
                />
              </ContainerButton>
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
  );
}

function Profile(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Profile</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ContainerProfile>
          <ProfileContent />
        </ContainerProfile>
      </ContainerMain>
    </Container>
  );
}

export default Profile;
