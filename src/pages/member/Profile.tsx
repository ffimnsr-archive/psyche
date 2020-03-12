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
        firstName
        lastName
        country {
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
    country?: {
      name: string;
    };
  };
}

function ProfileContent(): JSX.Element {
  const { loading, error, data } = useQuery(PROFILE_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
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
              <H1>Full Name</H1>
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
                  {clue?.country?.name ?? "Location"}
                </Tag>
              </ContainerTag>
              <ContainerBio>
                <Text ellipsize={true}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla
                  erat quis molestie convallis. Cras elementum nunc a tellus dictum, sed
                  porttitor nibh ultrices. Curabitur dolor mauris, mollis quis hendrerit
                  eget, tincidunt sit amet eros. Sed cursus non felis non mollis. In
                  fermentum leo eu luctus accumsan. Nulla in commodo enim, in vehicula
                  massa. Suspendisse nibh neque, hendrerit fermentum nunc a, pretium
                  vehicula sem. In egestas dapibus odio. Etiam at posuere lacus. Quisque
                  ornare lacinia elit ac aliquet. Suspendisse eu cursus libero. Donec
                  vitae ante pellentesque, commodo dui commodo, fringilla ex. Vivamus
                  dictum dolor fermentum, fringilla nunc sed, gravida erat.
                </Text>
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
