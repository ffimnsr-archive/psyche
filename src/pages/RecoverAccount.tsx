import React, { useState } from "react";
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
import _ from "lodash";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { HapButton } from "@/components/HapButton";
import bgPattern from "@/assets/images/pattern.svg";

const RECOVER_ACCOUNT_MUTATION = gql`
  mutation recoverAccount($input: RecoverAccountInput!) {
    recoverAccount(input: $input)
      @rest(type: "RecoverAccount", method: "POST", path: "/recover_account") {
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

const RecoverAccountSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

function RecoverAccountNonTrivialResponse({ email }: { email: string }): JSX.Element {
  const description = (
    <div>
      An email has been sent to <b>{email}</b>. Please check your inbox for a recovery
      email, else you may not receive it if the email is not registered with platform.
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

function RecoverAccountLoading(): JSX.Element {
  return <Spinner size={Spinner.SIZE_LARGE} />;
}

function RecoverAccountForm(): JSX.Element {
  const [capturedEmail, setCapturedEmail] = useState("undefined");
  const [recoverAccount, { loading, error, data }] = useMutation(
    RECOVER_ACCOUNT_MUTATION,
  );

  if (loading) return <RecoverAccountLoading />;
  if (error) return <RecoverAccountNonTrivialResponse email={capturedEmail} />;

  const { success } = !_.isNil(data) ? data.recoverAccount : { success: false };

  if (success) return <RecoverAccountNonTrivialResponse email={capturedEmail} />;

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={RecoverAccountSchema}
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
                Recover Account
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

function RecoverAccount(): JSX.Element {
  return (
    <Container>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerForm>
          <RecoverAccountForm />
        </ContainerForm>
      </ContainerSidePane>
    </Container>
  );
}

export default RecoverAccount;
