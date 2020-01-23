import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  InputGroup,
  Spinner,
  NonIdealState
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import _ from "lodash";
import { Formik } from "formik";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { HapButton } from "@/components/HapButton";
import bgPattern from "@/assets/images/pattern.svg";

const RECOVER_ACCOUNT_MUTATION = gql`
  mutation recoverAccount($input: RecoverAccountInput!) {
    recoverAccount(input: $input) @rest(
      type: "RecoverAccount",
      method: "POST",
      path: "/recover_account",
    ) {
      success
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

const ContainerOptions = styled.div`
  margin-top: 3em;
`;

interface FormState {
  email?: string;
}

function RecoverNonTrivialResponse(props: any) {
  const description = (
    <div>
      An email has been sent to <b>{props.email}</b>.
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
      icon={IconNames.ENVELOPE}
      title="Recovery Email Sent!"
      description={description}
      action={action}
    />
  );
}

function RecoverAccountLoading() {
  return (
    <Spinner
      size={Spinner.SIZE_LARGE}
    />
  );
}

function RecoverAccountForm() {
  const [capturedEmail, setCapturedEmail] = useState("undefined");
  const [recoverAccount, { loading, error, data }] = useMutation(RECOVER_ACCOUNT_MUTATION);

  if (loading) return <RecoverAccountLoading />;
  if (error) return <RecoverNonTrivialResponse email={capturedEmail} />;

  const { success } = !_.isNil(data) ? data.recoverAccount : { success: false };

  if (success) return <RecoverNonTrivialResponse email={capturedEmail} />;

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validate={(values: FormState) => {
          let errors: any = {};

          if (!values.email) {
            errors.email = "Invalid email address";
          }

          return errors;
        }}
        onSubmit={({ email }, { setSubmitting }) => {
          setSubmitting(false);
          setCapturedEmail(email);
          recoverAccount({
            variables: {
              input: {
                email,
              }
            }
          });
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormGroup
              label="Email"
              labelFor="email"
            >
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
          </form>
        )}
      </Formik>
      <ContainerOptions>
        <Link to="/sign_up">Don't have an account?</Link>
      </ContainerOptions>
    </>
  );
}

function RecoverAccount() {
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
