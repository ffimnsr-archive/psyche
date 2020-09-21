import React from "react";
import log from "loglevel";
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
  Button,
  Popover,
  Position,
  Menu,
  Icon,
  MenuItem,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Image,
  Text as Transcript,
  StyleSheet,
} from "@react-pdf/renderer";
import classNames from "classnames";
import { HapButton } from "@/components";
import { generateHash } from "@/utils";

const REQUEST_PROFILE_QUERY = gql`
  query _requestProfile($id: String!) {
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

const ImageAvatar = styled.img`
  border-radius: 50%;
  border: 1px dashed #000;
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

// Design was mock inside React-PDF REPL
// https://react-pdf.org/repl
const PdfStyles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 45,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function camelizeKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
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

function ProfilePdfDocument({ emailHash }: { emailHash: string }): JSX.Element {
  return (
    <Document>
      <Page size="A4" style={PdfStyles.body}>
        <View>
          <Image src={`https://www.gravatar.com/avatar/${emailHash}?s=200&d=robohash`} />
          <Transcript>Hello</Transcript>
        </View>
      </Page>
    </Document>
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
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(REQUEST_PROFILE_QUERY, {
    variables: { id },
  });

  if (loading) return <ShareableProfileLoading />;
  if (error) {
    log.error(error);
    return <ShareableProfileError />;
  }

  if (_.isNil(data.requestProfile) || _.isNil(data.requestProfile.profile))
    return <ShareableProfileError />;

  const { profile } = data.requestProfile;
  const processedProfile = camelizeKeys(profile);

  const {
    publicId,
    isAccountVerified,
    email,
    clue,
  } = processedProfile as MyShareableProfile;
  const emailHash = generateHash(email);

  const shareMenu = (
    <Menu>
      <PDFDownloadLink
        document={<ProfilePdfDocument emailHash={emailHash} />}
        className={classNames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}
        fileName={`CV-${publicId}.pdf`}
      >
        {({ loading }: { loading: boolean }): JSX.Element | string =>
          loading ? (
            <Text ellipsize={true}>Generating Document</Text>
          ) : (
            <>
              <Icon icon={IconNames.DOWNLOAD} />
              <Text>Download PDF</Text>
            </>
          )
        }
      </PDFDownloadLink>
      <MenuItem icon={IconNames.SOCIAL_MEDIA} text="Share to Social Media" />
    </Menu>
  );

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
                    <ImageAvatar
                      src={`https://www.gravatar.com/avatar/${emailHash}?s=200&d=robohash`}
                      alt="avatar"
                    />
                  </td>
                  <td>
                    <div style={{ float: "right" }}>
                      <Popover content={shareMenu} position={Position.BOTTOM}>
                        <Button icon={IconNames.MORE} minimal={true} />
                      </Popover>
                    </div>
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
    </Container>
  );
}

export default ShareableProfile;
