import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  Tooltip,
  Switch,
  InputGroup
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik } from "formik";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "react-apollo";
import bgPattern from "@/assets/images/pattern.svg";

const SIGNIN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) @rest(
      type: "SignIn"
      method: "POST",
      path: "/sign_in",
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

interface FormState {
  email?: string;
  password?: string;
  rememberMe?: string[];
}

function LoginForm() {
  const client = useApolloClient();
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    onCompleted({ signIn }) {
      sessionStorage.setItem("token", signIn.token);
      client.writeData({ data: { isAuthenticated: true } });
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

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <Formik
      initialValues={{ email: "", password: "", rememberMe: [] }}
      validate={values => {
        let errors: FormState = {};

        if (!values.email) {
          errors.email = "Invalid email address";
        }

        return errors;
      }}
      onSubmit={({ email, password, rememberMe }, { setSubmitting }) => {
        setSubmitting(false);
        signIn({
          variables: {
            input: {
              email,
              password,
              remeber: rememberMe,
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
              Login
            </Button>
          </FormGroup>
        </form>
      )}
    </Formik>
  );
}

function Login() {
  return (
    <Container>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerForm>
          <LoginForm />
          <ContainerOptions>
            <Link to="/register">Don't have an account?</Link>
            <br/>
            <Link to="/recover_account">Forgot your password?</Link>
          </ContainerOptions>
        </ContainerForm>
      </ContainerSidePane>
    </Container>
  );
}

export default Login;
