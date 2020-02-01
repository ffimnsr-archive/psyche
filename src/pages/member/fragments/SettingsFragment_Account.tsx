import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  Elevation,
  H5,
  HTMLTable,
  Dialog,
  Classes,
  Button,
  Intent,
  FormGroup,
  InputGroup,
  Spinner,
  NonIdealState,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { HapButton } from "@/components/HapButton";

const ACCOUNT_UPDATE_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) @rest(type: "SignIn", method: "POST", path: "/sign_in") {
      success
      token
    }
  }
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

const EditButton = styled.a`
  float: right;
`;

const AccountUpdateSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

const defaultDialogOptions = {
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: false,
  enforceFocus: true,
  usePortal: true,
};

function format(value: string): string {
  return value.replace(/^(\w{4})(\w{4})(\w{4})(\w{4})$/, "$1-$2-$3-$4");
}

function AccountUpdateLoading(): JSX.Element {
  return <Spinner size={Spinner.SIZE_LARGE} />;
}

function AccountUpdateError(): JSX.Element {
  // TODO: update data
  const description = (
    <div>
      An email has been sent to. Please check your inbox for a recovery email otherwise,
      if you have not received it your email may not be registered to our platform.
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
      title="Account Verification Error!"
      description={description}
      action={action}
    />
  );
}

function Account({
  data,
}: {
  data: { profile: { socialSecurityNumber: string } };
}): JSX.Element {
  const title = "Account";
  const [isOpen, setIsOpen] = useState(false);
  const [accountUpdate, { loading, error }] = useMutation(ACCOUNT_UPDATE_MUTATION);

  if (loading) return <AccountUpdateLoading />;
  if (error) return <AccountUpdateError />;

  const { socialSecurityNumber } = data.profile;
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <div className="clearfixr" style={{ marginBottom: "10px" }}>
          <H5 style={{ display: "inline" }}>{title}</H5>
          <EditButton
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            EDIT
          </EditButton>
        </div>
        <ResponsiveTable condensed={true}>
          <tbody>
            <tr>
              <td>Social No.</td>
              <td>{format(socialSecurityNumber)}</td>
            </tr>
            <tr>
              <td>First Name</td>
              <td></td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td></td>
            </tr>
            <tr>
              <td>Gender</td>
              <td></td>
            </tr>
            <tr>
              <td>Birth Date</td>
              <td></td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td></td>
            </tr>
            <tr>
              <td>Bio</td>
              <td></td>
            </tr>
          </tbody>
        </ResponsiveTable>
      </Card>
      <Dialog
        icon={IconNames.INFO_SIGN}
        title={title}
        onClose={(): void => setIsOpen(!isOpen)}
        isOpen={isOpen}
        {...defaultDialogOptions}
      >
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            gender: "",
            birthDate: "",
            phoneNumber: "",
            bio: "",
          }}
          validationSchema={AccountUpdateSchema}
          onSubmit={(
            { firstName, lastName, gender, birthDate, phoneNumber, bio },
            { setSubmitting },
          ): void => {
            setSubmitting(false);
            accountUpdate({
              variables: {
                input: {
                  firstName,
                  lastName,
                  gender,
                  birthDate,
                  phoneNumber,
                  bio,
                },
              },
            });
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }): JSX.Element => (
            <form onSubmit={handleSubmit}>
              <div className={Classes.DIALOG_BODY}>
                <FormGroup label="First Name" labelFor="firstName" labelInfo="(required)">
                  <InputGroup
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    type="text"
                  />
                </FormGroup>
                <FormGroup label="Last Name" labelFor="lastName" labelInfo="(required)">
                  <InputGroup
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    type="text"
                  />
                </FormGroup>
                <FormGroup label="Gender" labelFor="gender">
                  <InputGroup
                    id="gender"
                    name="gender"
                    placeholder="Enter your gender..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    type="text"
                  />
                </FormGroup>
                <FormGroup label="Birth Date" labelFor="birthDate" labelInfo="(required)">
                  <InputGroup
                    id="birthDate"
                    name="birthDate"
                    placeholder="Enter your birth date..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.birthDate}
                    type="text"
                  />
                </FormGroup>
                <FormGroup label="Phone Number" labelFor="phoneNumber">
                  <InputGroup
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    type="text"
                  />
                </FormGroup>
                <FormGroup label="Bio" labelFor="bio">
                  <InputGroup
                    id="bio"
                    name="bio"
                    placeholder="Enter your bio..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bio}
                    type="text"
                  />
                </FormGroup>
              </div>
              <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                  <Button intent={Intent.PRIMARY} disabled={isSubmitting} type="submit">
                    Update
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export { Account };
