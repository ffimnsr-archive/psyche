import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  InputGroup
} from "@blueprintjs/core";
import { Formik } from "formik";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
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

function RecoverAccountForm() {
  const [recoverAccount, { loading, error }] = useMutation(RECOVER_ACCOUNT_MUTATION);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <Formik
      initialValues={{ email: "" }}
      validate={values => {
        let errors: FormState = {};

        if (!values.email) {
          errors.email = "Invalid email address";
        }

        return errors;
      }}
      onSubmit={({ email }, { setSubmitting }) => {
        setSubmitting(false);
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
  );
}

function RecoverAccount() {
  return (
    <Container>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerForm>
          <RecoverAccountForm />
          <ContainerOptions>
            <Link to="/register">Don't have an account?</Link>
          </ContainerOptions>
        </ContainerForm>
      </ContainerSidePane>
    </Container>
  );
}

export default RecoverAccount;
