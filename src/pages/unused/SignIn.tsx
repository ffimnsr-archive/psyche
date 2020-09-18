import React, { useState } from "react";
import log from "loglevel";
import { Link } from "react-router-dom";
import { RouterProps } from "react-router";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  Tooltip,
  Switch,
  Spinner,
  NonIdealState,
  InputGroup,
  Colors,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { HapButton } from "@/components/HapButton";
import bgPattern from "@/assets/images/pattern.svg";

const SIGNIN_MUTATION = gql`
  mutation _signIn($input: SignInInput!) {
    signIn(input: $input) @rest(type: "SignIn", method: "POST", path: "/sign_in") {
      success
      token
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

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .max(42, "Password too long")
    .required("Password is required"),
});

function SignInLoading(): JSX.Element {
  return <Spinner size={Spinner.SIZE_LARGE} />;
}

function SignInError(): JSX.Element {
  const description = (
    <div>
      An error was encountered while authenticating your account. Please check if your
      sign-in credentials are valid.
    </div>
  );

  const action = (
    <HapButton to="/" intent={Intent.PRIMARY} large={true}>
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

function SignInFormContent({ history }: RouterProps): JSX.Element {
  const client = useApolloClient();
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    onCompleted({ signIn }) {
      sessionStorage.setItem("osslocal-token", signIn.token);
      client.writeData({ data: { isAuthenticated: true } });
      history.replace("/");
    },
  });

  const lockButton = (
    <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
      <Button
        icon={showPassword ? IconNames.UNLOCK : IconNames.LOCK}
        intent={Intent.WARNING}
        minimal={true}
        onClick={(): void => setShowPassword(!showPassword)}
      />
    </Tooltip>
  );

  if (loading) return <SignInLoading />;
  if (error) {
    log.error(error);
    return <SignInError />;
  }

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", remember: false }}
        validationSchema={SignInSchema}
        onSubmit={({ email, password, remember }, { setSubmitting }): void => {
          setSubmitting(false);
          signIn({
            variables: {
              input: {
                email,
                password,
                remember,
              },
            },
          });
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }): JSX.Element => (
          <Form>
            <FormGroup label="Email" labelFor="email">
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
            <FormGroup label="Password" labelFor="password">
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
                id="remember"
                name="remember"
                label="Remember Me?"
                onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                  const target = e.target as HTMLInputElement;
                  setFieldValue(target.id, target.checked);
                }}
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
          </Form>
        )}
      </Formik>
      <ContainerOptions>
        <Link to="/sign_up">Don&apos;t have an account?</Link>
        <br />
        <Link to="/recover_account">Forgot your password?</Link>
      </ContainerOptions>
    </>
  );
}

const SignInForm = withRouter(SignInFormContent);

function SignIn(): JSX.Element {
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