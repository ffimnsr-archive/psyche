import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  Tooltip,
  Switch,
  Spinner,
  NonIdealState,
  InputGroup
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import _ from "lodash";
import { useApolloClient, useMutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { HapButton } from "@/components/HapButton";
import bgPattern from "@/assets/images/pattern.svg";

const SIGNIN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) @rest(
      type: "SignIn",
      method: "POST",
      path: "/sign_in"
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

const ContainerOptions = styled.div`
  margin-top: 3em;
`;

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

function SignInLoading() {
  return (
    <Spinner
      size={Spinner.SIZE_LARGE}
    />
  );
}

function SignInError() {
  const description = (
    <div>
      An error was encountered while authenticating your account.
      Please check if your sign-in credentials are valid.
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

function SignInFormContent(props: any) {
  const client = useApolloClient();
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    onCompleted({ signIn }) {
      sessionStorage.setItem("token", signIn.token);
      client.writeData({ data: { isAuthenticated: true } });
      props.history.replace("/");
    }
  });

  const lockButton = (
    <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
      <Button
        icon={showPassword ? IconNames.UNLOCK : IconNames.LOCK}
        intent={Intent.WARNING}
        minimal={true}
        onClick={() => setShowPassword(!showPassword)}
      />
    </Tooltip>
  );

  if (loading) return <SignInLoading />;
  if (error) return <SignInError />;

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: [] }}
        validationSchema={SignInSchema}
        onSubmit={({ email, password, rememberMe }, { setSubmitting }) => {
          setSubmitting(false);
          signIn({
            variables: {
              input: {
                email,
                password,
                remember: _.isEmpty(rememberMe),
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
                name="email"
                placeholder="Enter your email..."
                large={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="email"
              />
            </FormGroup>
            <FormGroup
              label="Password"
              labelFor="password"
            >
              <InputGroup
                id="password"
                name="password"
                placeholder="Enter your password..."
                rightElement={lockButton}
                large={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type={showPassword ? "text" : "password"}
              />
            </FormGroup>
            <FormGroup>
              <Switch
                id="rememberMe"
                label="Remember Me?"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultChecked={false}
              />
            </FormGroup>
            <FormGroup>
              <Button
                intent={Intent.PRIMARY}
                large={true}
                disabled={isSubmitting}
                type="submit"
              >
                Sign In
              </Button>
            </FormGroup>
          </form>
        )}
      </Formik>
      <ContainerOptions>
        <Link to="/sign_up">Don't have an account?</Link>
        <br/>
        <Link to="/recover_account">Forgot your password?</Link>
      </ContainerOptions>
    </>
  );
}

const SignInForm = withRouter(SignInFormContent);

function SignIn() {
  return (
    <Container>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerForm>
          <SignInForm />
        </ContainerForm>
      </ContainerSidePane>
    </Container>
  );
}

export default SignIn;
