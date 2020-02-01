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
  Elevation,
  Spinner,
  Intent,
  NonIdealState,
  Colors,
  Classes,
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
  height: 100vh;
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

  if (_.isNil(data.requestProfile)) return <ShareableProfileError />;

  const { profile } = data.requestProfile;
  const formattedProfile = camelizeKeys(profile);

  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Profile</title>
      </Helmet>
      <ContainerMain>
        <ContainerProfile>
          <ProfilePane>
            <Card elevation={Elevation.ONE}>
              <img src="https://via.placeholder.com/200" />
              Full Name
              {formattedProfile.socialSecurityNumber}
              {formattedProfile.email}
            </Card>
            <Card elevation={Elevation.ONE}>
              <H5>Work Experience</H5>
              <p>Hello</p>
            </Card>
          </ProfilePane>
        </ContainerProfile>
      </ContainerMain>
    </Container>
  );
}

export default ShareableProfile;
