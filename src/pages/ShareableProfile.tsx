import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-apollo";
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
import { HapButton } from "@/components/HapButton";

const REQUEST_PROFILE_QUERY = gql`
  query($id: String!) {
    requestProfile(id: $id)
      @rest(type: "RequestProfile", method: "GET", path: "/request_profile/{args.id}") {
      success
      profile
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function camelizeKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v));
  } else if (_.isPlainObject(obj)) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_.camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
}

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

function ShareableProfile(): JSX.Element {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REQUEST_PROFILE_QUERY, {
    variables: { id },
  });

  if (loading) return <ShareableProfileLoading />;
  if (error) return <ShareableProfileError />;

  if (_.isNil(data.requestProfile) || _.isNil(data.requestProfile.profile))
    return <ShareableProfileError />;

  const { profile } = data.requestProfile;
  const cleanData = camelizeKeys(profile);

  console.log(cleanData);

  const { publicId } = cleanData;

  return (
    <Container>
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
                    <ImageAvatar src="https://via.placeholder.com/200" alt="avatar" />
                  </td>
                  <td>
                    <div style={{ float: "right" }}>Hello</div>
                    <div>
                      <H1>Full Name</H1>
                      <ContainerTag>
                        <Tag
                          icon={IconNames.ENDORSED}
                          large={true}
                          minimal={true}
                          intent={Intent.SUCCESS}
                        >
                          {publicId}
                        </Tag>
                        <Tag icon={IconNames.PATH_SEARCH} large={true} minimal={true}>
                          Location
                        </Tag>
                      </ContainerTag>
                      <ContainerBio>
                        <Text ellipsize={true}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                          fringilla erat quis molestie convallis. Cras elementum nunc a
                          tellus dictum, sed porttitor nibh ultrices. Curabitur dolor
                          mauris, mollis quis hendrerit eget, tincidunt sit amet eros. Sed
                          cursus non felis non mollis. In fermentum leo eu luctus
                          accumsan. Nulla in commodo enim, in vehicula massa. Suspendisse
                          nibh neque, hendrerit fermentum nunc a, pretium vehicula sem. In
                          egestas dapibus odio. Etiam at posuere lacus. Quisque ornare
                          lacinia elit ac aliquet. Suspendisse eu cursus libero. Donec
                          vitae ante pellentesque, commodo dui commodo, fringilla ex.
                          Vivamus dictum dolor fermentum, fringilla nunc sed, gravida
                          erat.
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
    </Container>
  );
}

export default ShareableProfile;
