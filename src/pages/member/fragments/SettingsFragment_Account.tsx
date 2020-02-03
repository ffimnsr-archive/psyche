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
  HTMLSelect,
  TextArea,
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

const ModifiedTextArea = styled(TextArea)`
  resize: vertical;
  min-height: 100px;
`;

const AccountUpdateSchema = Yup.object().shape({
  firstMidName: Yup.string().required("First and middle name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  birthDate: Yup.string().required("Birth date is required"),
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
  const description = (
    <div>
      An error occurred while trying to update your account. Kindly try to submit again
      after several minutes.
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
      title="Account Update Error!"
      description={description}
      action={action}
    />
  );
}

function Row({ title, sub }: { title: string; sub: string }): JSX.Element {
  return (
    <tr>
      <td>{title}</td>
      <td>{sub}</td>
    </tr>
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
            <Row title="Social No." sub={format(socialSecurityNumber)} />
            <Row title="First &amp; Middle Name" sub={""} />
            <Row title="Last Name" sub={""} />
            <Row title="Gender" sub={""} />
            <Row title="Birth Date" sub={""} />
            <Row title="Phone Number" sub={""} />
            <Row title="Bio" sub={""} />
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
            firstMidName: "",
            lastName: "",
            gender: "",
            birthDate: "",
            phoneNumber: "",
            bio: "",
          }}
          validationSchema={AccountUpdateSchema}
          onSubmit={(
            { firstMidName, lastName, gender, birthDate, phoneNumber, bio },
            { setSubmitting },
          ): void => {
            setSubmitting(false);
            accountUpdate({
              variables: {
                input: {
                  firstMidName,
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
                <FormGroup
                  label="First &amp; Middle Name"
                  labelFor="firstMidName"
                  labelInfo="(required)"
                >
                  <InputGroup
                    id="firstMidName"
                    name="firstMidName"
                    placeholder="Enter your first name..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstMidName}
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
                <FormGroup label="Gender" labelFor="gender" labelInfo="(required)">
                  <HTMLSelect
                    id="gender"
                    name="gender"
                    large={true}
                    fill={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    options={[
                      { label: "Unknown", value: "unknown" },
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
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
                <FormGroup label="Tell us more about you?" labelFor="bio">
                  <ModifiedTextArea
                    id="bio"
                    name="bio"
                    placeholder="Enter your bio..."
                    large={true}
                    fill={true}
                    growVertically={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bio}
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
