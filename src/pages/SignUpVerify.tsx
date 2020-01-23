import React from "react";
import styled from "styled-components";
import { Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { useMutation } from "react-apollo";
import { HapButton } from "@/components/HapButton";
import bgPattern from "@/assets/images/pattern.svg";

const SIGN_UP_VERIFY_MUTATION = gql`
  mutation signUpVerify($input: SignUpVerifyInput!) {
    signUpVerify(input: $input) @rest(
      type: "SignUpVerify",
      method: "POST",
      path: "/sign_up/verify",
    ) {
      success
      token
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

const ContainerDesign = styled.div`
  flex: 1 1 auto;
  background-size: auto !important;
  background-color: #434959;
  background-image: url(${bgPattern});
`;

const ContainerSidePane = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  width: 500px;

  @media (max-width: 512px) {
    width: 100vw;
  }
`;

const ContainerForm = styled.div`
  flex: 1 1 auto;
  align-self: center;
  padding: 0 2em;
`;

function SignUpVerifyLoading() {
  return (
    <Spinner
      size={Spinner.SIZE_LARGE}
    />
  );
}

function SignUpVerifyError() {
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
      title="Sign-In Error!"
      description={description}
      action={action}
    />
  );
}

function SignUpVerifyContent() {
  // TODO: run mutation on mount
  const { code } = useParams();
  const [signUpVerify, { loading, error }] = useMutation(SIGN_UP_VERIFY_MUTATION);

  if (loading) return <SignUpVerifyLoading />;
  if (error) return <SignUpVerifyError />;

  const description = (
    <div>
      An email has been sent to .
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
      icon={IconNames.TICK_CIRCLE}
      title="Account Verified!"
      description={description}
      action={action}
    />
  );
}

function SignUpVerify() {
  return (
    <Container>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerForm>
          <SignUpVerifyContent />
        </ContainerForm>
      </ContainerSidePane>
    </Container>
  );
}

export default SignUpVerify;
