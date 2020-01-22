import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  Switch,
  InputGroup,
  Classes,
  Drawer,
  Position
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik } from "formik";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "react-apollo";
import bgPattern from "@/assets/images/pattern.svg";


const SIGNUP_MUTATION = gql`
  mutation signUp($input: SignInInput!) {
    signUp(input: $input) @rest(
      type: "SignUp"
      method: "POST",
      path: "/sign_up",
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
  confirmPassword?: string;
  tncAgreement?: string[];
  optinMarketing?: string[];
}

function SignUpForm(props: any) {
  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted({ signUp }) {
      sessionStorage.setItem("token", signUp.token);
      client.writeData({ data: { isAuthenticated: true } });
    }
  });

  const agreement = (
    <span>
      I agree to the{" "}
      <a
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          props.setTncStatus(true);
        }}
      >
        Terms and Conditions
      </a>
      .
    </span>
  );

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validate={values => {
        let errors: FormState = {};

        if (!values.email) {
          errors.email = "Invalid email address";
        }

        if (values.password !== values.confirmPassword) {
          errors.password = "Password is not same";
        }

        return errors;
      }}
      onSubmit={({ email, password }, { setSubmitting }) => {
        setSubmitting(false);        
        signUp({ 
          variables: {
            input: {
              email,
              password,
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
          <FormGroup label="Password" labelFor="password">
            <InputGroup
              id="password"
              placeholder="Enter your password..."
              large={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              type="password"
            />
          </FormGroup>
          <FormGroup label="Confirm Password" labelFor="confirmPassword">
            <InputGroup
              id="confirmPassword"
              placeholder="Re-type your password..."
              large={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              type="password"                     
            />
          </FormGroup>
          <FormGroup>
            <Switch
              id="tncAgreement"
              labelElement={agreement}
              onChange={handleChange}
              onBlur={handleBlur}
              defaultChecked={false} />
            <Switch
              id="optinMarketing"
              label="Opt-in to notifications and promotions."
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
              Sign Up
            </Button>
          </FormGroup>
        </form>              
      )}
    </Formik>
  );
}

function SignUp() {
  const [isTncOpen, setIsTncOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <Container>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerForm>
          <SignUpForm setTncStatus={setIsTncOpen} />
          <ContainerOptions>
            <Link to="/sign_in">Already have an account?</Link>
            <br/>
            <Link to="/recover_account">Forgot your password?</Link>
          </ContainerOptions>
          <Drawer
            icon={IconNames.INFO_SIGN}
            title="Terms and Conditions"
            position={Position.RIGHT}
            isOpen={isTncOpen}
            onClose={() => setIsTncOpen(false)}
            hasBackdrop={true}
            autoFocus={true}
            enforceFocus={true}
            canEscapeKeyClose={true}
            canOutsideClickClose={false}
            usePortal={true}
            size={Drawer.SIZE_STANDARD}
          >
            <div className={Classes.DRAWER_BODY}>
              <div className={Classes.DIALOG_BODY}>
                <p>
                  <strong>
                    Data integration is the seminal problem of the digital age. For over
                    ten years, we’ve helped the world’s premier organizations rise to
                    the challenge.
                  </strong>
                </p>
                <p>
                  Palantir Foundry radically reimagines the way enterprises interact
                  with data by amplifying and extending the power of data integration.
                  With Foundry, anyone can source, fuse, and transform data into any
                  shape they desire. Business analysts become data engineers — and
                  leaders in their organization’s data revolution.
                </p>
                <p>
                  Foundry’s back end includes a suite of best-in-class data integration
                  capabilities: data provenance, git-style versioning semantics,
                  granular access controls, branching, transformation authoring, and
                  more. But these powers are not limited to the back-end IT shop.
                </p>
                <p>
                  In Foundry, tables, applications, reports, presentations, and
                  spreadsheets operate as data integrations in their own right. Access
                  controls, transformation logic, and data quality flow from original
                  data source to intermediate analysis to presentation in real time.
                  Every end product created in Foundry becomes a new data source that
                  other users can build upon. And the enterprise data foundation goes
                  where the business drives it.
                </p>
                <p>
                  Start the revolution. Unleash the power of data integration with
                  Palantir Foundry.
                </p>
              </div>
            </div>
            <div className={Classes.DRAWER_FOOTER}>Open Sesame {year}</div>
          </Drawer>
        </ContainerForm>
      </ContainerSidePane>
    </Container>
  );
}

export default SignUp;
