import React, { useState } from "react";
import log from "loglevel";
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
  Spinner,
  NonIdealState,
  Position,
  Colors,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import _ from "lodash";
import { useMutation } from "react-apollo";
import { HapButton } from "@/components/HapButton";
import bgPattern from "@/assets/images/pattern.svg";

const SIGNUP_MUTATION = gql`
  mutation _signUp($input: SignInInput!) {
    signUp(input: $input) @rest(type: "SignUp", method: "POST", path: "/sign_up") {
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

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .max(42, "Password too long")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    //   "Must contain 6 characters, one uppercase, one lowercase, one number",
    // )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
  tncAgreement: Yup.boolean()
    .oneOf([true], "Must accept terms and conditions")
    .required("Terms and condition is required"),
  optInMarketing: Yup.boolean().required("Opt-in marketing is required"),
});

function SignUpLoading(): JSX.Element {
  return <Spinner size={Spinner.SIZE_LARGE} />;
}

function SignUpError(): JSX.Element {
  const description = (
    <div>
      There are some errors in your sign-up. Please double check your password if its less
      than 8 letter alphanumeric. And check if your email is already registered to our
      platform.
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
      title="Sign-Up Error!"
      description={description}
      action={action}
    />
  );
}

function SignUpSuccess(): JSX.Element {
  const description = (
    <div>
      Please check your inbox. Follow the instruction indicated on it to verify your
      account.
    </div>
  );

  const action = (
    <HapButton to="/" intent={Intent.PRIMARY} large={true}>
      Go Back Home
    </HapButton>
  );

  return (
    <NonIdealState
      icon={IconNames.TICK_CIRCLE}
      title="Sign-Up Success!"
      description={description}
      action={action}
    />
  );
}

function SignUpForm({
  setTncStatus,
}: {
  setTncStatus: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [signUp, { loading, error, data }] = useMutation(SIGNUP_MUTATION);

  const agreement = (
    <span>
      I agree to the{" "}
      <a
        href="#"
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
          e.preventDefault();
          setTncStatus(true);
        }}
      >
        Terms and Conditions
      </a>
      .
    </span>
  );

  if (loading) return <SignUpLoading />;
  if (error) {
    log.error(error);
    return <SignUpError />;
  }

  const { success } = !_.isNil(data) ? data.signUp : { success: false };

  if (success) return <SignUpSuccess />;

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          tncAgreement: false,
          optInMarketing: false,
        }}
        validationSchema={SignUpSchema}
        onSubmit={({ email, password }, { setSubmitting }): void => {
          setSubmitting(false);
          signUp({
            variables: {
              input: {
                email,
                password,
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
                placeholder="Enter your email..."
                large={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="text"
              />
              <small>
                <ErrorMessage name="email" />
              </small>
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
              <small>
                <ErrorMessage name="password" />
              </small>
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
              <small>
                <ErrorMessage name="confirmPassword" />
              </small>
            </FormGroup>
            <FormGroup>
              <Switch
                id="tncAgreement"
                labelElement={agreement}
                onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                  const target = e.target as HTMLInputElement;
                  setFieldValue(target.id, target.checked);
                }}
                onBlur={handleBlur}
                defaultChecked={false}
              />
              <small>
                <ErrorMessage name="tncAgreement" />
              </small>
              <Switch
                id="optInMarketing"
                label="Opt&#8208;in to notifications and promotions."
                onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                  const target = e.target as HTMLInputElement;
                  setFieldValue(target.id, target.checked);
                }}
                onBlur={handleBlur}
                defaultChecked={false}
              />
              <small>
                <ErrorMessage name="optInMarketing" />
              </small>
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
          </Form>
        )}
      </Formik>
      <ContainerOptions>
        <Link to="/sign_in">Already have an account?</Link>
        <br />
        <Link to="/sign_up/resend">Didn&apos;t get your verification code?</Link>
        <br />
        <Link to="/recover_account">Forgot your password?</Link>
      </ContainerOptions>
    </>
  );
}

function SignUp(): JSX.Element {
  const [isTncOpen, setIsTncOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <Container>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerForm>
          <SignUpForm setTncStatus={setIsTncOpen} />
          <Drawer
            icon={IconNames.INFO_SIGN}
            title="Terms and Conditions"
            position={Position.RIGHT}
            isOpen={isTncOpen}
            onClose={(): void => setIsTncOpen(false)}
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
                    ten years, we’ve helped the world’s premier organizations rise to the
                    challenge.
                  </strong>
                </p>
                <p>
                  Palantir Foundry radically reimagines the way enterprises interact with
                  data by amplifying and extending the power of data integration. With
                  Foundry, anyone can source, fuse, and transform data into any shape they
                  desire. Business analysts become data engineers — and leaders in their
                  organization’s data revolution.
                </p>
                <p>
                  Foundry’s back end includes a suite of best-in-class data integration
                  capabilities: data provenance, git-style versioning semantics, granular
                  access controls, branching, transformation authoring, and more. But
                  these powers are not limited to the back-end IT shop.
                </p>
                <p>
                  In Foundry, tables, applications, reports, presentations, and
                  spreadsheets operate as data integrations in their own right. Access
                  controls, transformation logic, and data quality flow from original data
                  source to intermediate analysis to presentation in real time. Every end
                  product created in Foundry becomes a new data source that other users
                  can build upon. And the enterprise data foundation goes where the
                  business drives it.
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
