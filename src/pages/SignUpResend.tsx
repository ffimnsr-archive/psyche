import React, { useState } from "react";
import log from "loglevel";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  InputGroup,
  Spinner,
  NonIdealState,
  Colors,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { HapButton } from "@/components/HapButton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import bgPattern from "@/assets/images/pattern.svg";

const SIGNUP_RESEND_MUTATION = gql`
  mutation _signUpResend($input: SignUpResendInput!) {
    signUpResend(input: $input)
      @rest(type: "SignUpResend", method: "POST", path: "/sign_up/resend") {
      success
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

const ContainerDesign = styled.div`
  flex: 1 1 auto;
  background-size: auto !important;
  background-color: ${Colors.GRAY2};
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

const ContainerOptions = styled.div`
  margin-top: 3em;
`;

const SignUpResendSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

function SignUpResendNonTrivialResponse({ email }: { email: string }): JSX.Element {
  const description = (
    <div>
      An email has been sent to <b>{email}</b>. Please check your inbox for an account
      verification email, else you may not receive it if the email is not registered with
      platform. Follow the instructions inside the email to activate your account.
    </div>
  );

  const action = (
    <HapButton to="/" intent={Intent.PRIMARY} large={true}>
      Go Back Home
    </HapButton>
  );

  return (
    <NonIdealState
      icon={IconNames.ENVELOPE}
      title="Recovery Email Sent!"
      description={description}
      action={action}
    />
  );
}

function SignUpResendLoading(): JSX.Element {
  return <Spinner size={Spinner.SIZE_LARGE} />;
}

function SignUpResendForm(): JSX.Element {
  const [capturedEmail, setCapturedEmail] = useState("[email placeholder]");
  const [recoverAccount, { loading, error, data }] = useMutation(SIGNUP_RESEND_MUTATION);

  if (loading) return <SignUpResendLoading />;
  if (error) {
    log.error(error);
    return <SignUpResendNonTrivialResponse email={capturedEmail} />;
  }

  if (data) {
    const { success } = data.signUpResend ?? { success: false };
    if (success) return <SignUpResendNonTrivialResponse email={capturedEmail} />;
  }

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={SignUpResendSchema}
        onSubmit={({ email }, { setSubmitting }): void => {
          setSubmitting(false);
          setCapturedEmail(email);
          recoverAccount({
            variables: {
              input: {
                email,
              },
            },
          });
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }): JSX.Element => (
          <Form>
            <FormGroup label="Email" labelFor="email">
              <InputGroup
                id="email"
                placeholder="Enter your email..."
                large={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Button
                intent={Intent.PRIMARY}
                large={true}
                disabled={isSubmitting}
                type="submit"
              >
                Resend Verification Code
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
      <ContainerOptions>
        <Link to="/sign_up">Don&apos;t have an account?</Link>
      </ContainerOptions>
    </>
  );
}

function SignUpResend(): JSX.Element {
  return (
    <Container>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerForm>
          <ErrorBoundary>
            <SignUpResendForm />
          </ErrorBoundary>
        </ContainerForm>
      </ContainerSidePane>
    </Container>
  );
}

export default SignUpResend;
