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
  NonIdealState
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { HapButton } from "@/components/HapButton";

const REQUEST_PROFILE_QUERY = gql`
  query($id: String!) {
    requestProfile(id: $id) @rest(
      type: "RequestProfile",
      method: "GET",
      path: "/request_profile/{args.id}"
    ) {
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
  background-color: #fff;

  & > div.bp3-card:not(:last-child) {
    margin-bottom: 10px;
  }
`;

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
};

function ShareableProfileLoading() {
  return (
    <Spinner
      size={Spinner.SIZE_LARGE}
    />
  );
}

function ShareableProfileError() {
  // TODO: update data
  const description = (
    <div>
      An email has been sent to.
      Please check your inbox for a recovery email otherwise,
      if you have not received it your email may not be registered to our platform.
    </div>
  );

  const action = (
    <HapButton
      to="/"
      intent={Intent.PRIMARY}
      large={true}
    >
      Go Back Home
    </HapButton>
  );

  return (
    <NonIdealState
      icon={IconNames.WARNING_SIGN}
      title="Account Recovery Error!"
      description={description}
      action={action}
    />
  );
}

function ShareableProfile() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REQUEST_PROFILE_QUERY, {
    variables: { id }
  });

  if (loading) return <ShareableProfileLoading />;
  if (error) return <ShareableProfileError />;

  if (_.isNil(data.requestProfile)) return <ShareableProfileError />;

  const { profile } = data.requestProfile;
  const formattedProfile = camelizeKeys(profile);

  return (
    <Container>
      <Helmet
        titleTemplate="%s | Open Sesame"
      >
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
