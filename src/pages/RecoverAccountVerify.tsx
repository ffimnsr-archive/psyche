import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  Spinner,
  NonIdealState,
  InputGroup,
  Colors,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import gql from "graphql-tag";
import _ from "lodash";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo";
import { HapButton } from "@/components/HapButton";
import bgPattern from "@/assets/images/pattern.svg";

const RECOVER_ACCOUNT_VERIFY_CODE_QUERY = gql`
  query recoverAccountVerifyCode($code: String!) {
    recoverAccountVerifyCode(code: $code)
      @rest(
        type: "RecoverAccountVerifyCode"
        method: "GET"
        path: "/recover_account/verify?code={args.code}&type=recover"
      ) {
      success
    }
  }
`;

const RECOVER_ACCOUNT_VERIFY_MUTATION = gql`
  mutation recoverAccountVerify($input: RecoverAccountVerifyInput!) {
    recoverAccountVerify(input: $input)
      @rest(
        type: "RecoverAccountVerify"
        method: "POST"
        path: "/recover_account/verify"
      ) {
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

const RecoverAccountVerifySchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});

function RecoverAccountVerifyLoading(): JSX.Element {
  return <Spinner size={Spinner.SIZE_LARGE} />;
}

function RecoverAccountVerifyError(): JSX.Element {
  const description = (
    <div>
      There was an error recovering your account. Its possible that your recovery token is
      expired or not valid.
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
      title="Account Recovery Error!"
      description={description}
      action={action}
    />
  );
}

function RecoverAccountVerifyForm(): JSX.Element {
  const { code } = useParams();

  const { loading, error, data } = useQuery(RECOVER_ACCOUNT_VERIFY_CODE_QUERY, {
    variables: { code },
  });

  const [recoverAccountVerify, mutationProps] = useMutation(
    RECOVER_ACCOUNT_VERIFY_MUTATION,
  );

  if (mutationProps.loading || loading) return <RecoverAccountVerifyLoading />;
  if (mutationProps.error || error) return <RecoverAccountVerifyError />;

  const { success } = !_.isNil(data) ? data.recoverAccountVerifyCode : { success: false };

  if (!success) return <RecoverAccountVerifyError />;

  return (
    <>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={RecoverAccountVerifySchema}
        onSubmit={({ password }, { setSubmitting }): void => {
          setSubmitting(false);
          recoverAccountVerify({
            variables: {
              input: {
                code,
                password,
              },
            },
          });
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }): JSX.Element => (
          <Form>
            <FormGroup label="New Password" labelFor="password">
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
            <FormGroup label="Confirm New Password" labelFor="confirmPassword">
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
              <Button
                intent={Intent.PRIMARY}
                large={true}
                disabled={isSubmitting}
                type="submit"
              >
                Change Password
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
          <RecoverAccountVerifyForm />
        </ContainerForm>
      </ContainerSidePane>
    </Container>
  );
}

export default RecoverAccount;
