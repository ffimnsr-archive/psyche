import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  Elevation,
  H5,
  Dialog,
  HTMLTable,
  Classes,
  Button,
  Intent,
  AnchorButton,
  Tag,
  Tooltip,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

const PASSWORD_UPDATE_MUTATION = gql`
  mutation _passwordUpdate($oldPassword: String!, $newPassword: String!) {
    updateMyPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
      email
      publicId
      sitePreference {
        optInUsageStat
        optInMarketing
      }
    }
  }
`;

const EMAIL_UPDATE_MUTATION = gql`
  mutation _emailUpdate($email: String!, $password: String!) {
    updateMyEmail(email: $email, password: $password) {
      id
      email
      publicId
      sitePreference {
        optInUsageStat
        optInMarketing
      }
    }
  }
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

const RowContainer = styled.tr`
  & > td {
    vertical-align: middle !important;
  }
`;

const defaultDialogOptions = {
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: false,
  enforceFocus: true,
  usePortal: true,
};

const ChangeEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "New password too short")
    .required("Password is required"),
});

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, "Old password too short")
    .required("Old password is required"),
  mewPassword: Yup.string()
    .min(6, "New password too short")
    .max(42, "New password too long")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    //   "Must contain 6 characters, one uppercase, one lowercase, one number",
    // )
    .required("New password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
    .required("Confirm new password is required"),
});

function Row({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: JSX.Element | string;
  action?: JSX.Element;
}): JSX.Element {
  return (
    <RowContainer>
      <td>{title}</td>
      <td>{sub}</td>
      <td>{action}</td>
    </RowContainer>
  );
}

function ChangeEmailDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Function;
}): JSX.Element {
  return (
    <Dialog
      icon={IconNames.INFO_SIGN}
      title="Change Email"
      onClose={(): void => setIsOpen(!isOpen)}
      isOpen={isOpen}
      {...defaultDialogOptions}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={ChangeEmailSchema}
        onSubmit={(_, { setSubmitting }): void => {
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }): JSX.Element => (
          <Form>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup label="New Email" labelFor="email">
                <InputGroup
                  id="email"
                  name="email"
                  placeholder="Enter your new email..."
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
              <FormGroup
                label="Verify Password"
                helperText="Input password to verify email change."
                labelFor="password"
              >
                <InputGroup
                  id="password"
                  name="password"
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
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.PRIMARY} disabled={isSubmitting} type="submit">
                  Update
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

function ChangePasswordDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Function;
}): JSX.Element {
  return (
    <Dialog
      icon={IconNames.INFO_SIGN}
      title="Change Password"
      onClose={(): void => setIsOpen(!isOpen)}
      isOpen={isOpen}
      {...defaultDialogOptions}
    >
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={(_, { setSubmitting }): void => {
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }): JSX.Element => (
          <Form>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup label="Old Password" labelFor="oldPassword">
                <InputGroup
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="Enter your old password..."
                  large={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.oldPassword}
                  type="password"
                />
                <small>
                  <ErrorMessage name="oldPassword" />
                </small>
              </FormGroup>
              <FormGroup label="New Password" labelFor="newPassword">
                <InputGroup
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your new password..."
                  large={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newPassword}
                  type="password"
                />
                <small>
                  <ErrorMessage name="newPassword" />
                </small>
              </FormGroup>
              <FormGroup label="Confirm New Password" labelFor="confirmNewPassword">
                <InputGroup
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  placeholder="Re-type your new password..."
                  large={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmNewPassword}
                  type="password"
                />
                <small>
                  <ErrorMessage name="confirmNewPassword" />
                </small>
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button intent={Intent.PRIMARY} disabled={isSubmitting} type="submit">
                  Update
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

function PrivacyAndSafety(): JSX.Element {
  const title = "Privacy & Safety";
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);
  // const [isChangeSecurityQuestionsOpen, setIsChangeSecurityQuestionsOpen] = useState(false);
  // const [isChangeMFAOpen, setIsChangeMFAOpen] = useState(false);
  // const [isViewSessionsOpen, setIsViewSessionsOpen] = useState(false);

  return (
    <>
      <Card elevation={Elevation.ONE}>
        <div className="clearfixr" style={{ marginBottom: "10px" }}>
          <H5 style={{ display: "inline" }}>{title}</H5>
        </div>
        <ResponsiveTable condensed={true}>
          <tbody>
            <Row
              title="Support PIN"
              sub={
                <Tooltip content={"Your support PIN is: 000000"}>
                  <Tag minimal={true} interactive={true}>
                    Hover To View
                  </Tag>
                </Tooltip>
              }
              action={<Button text="Reroll PIN" minimal={true} />}
            />
            <Row
              title="Password"
              sub={
                <Tag minimal={true} interactive={true} intent={Intent.SUCCESS}>
                  Secured
                </Tag>
              }
              action={
                <Button
                  text="Change Password"
                  onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                    e.preventDefault();
                    setIsChangeEmailOpen(false);
                    setIsChangePasswordOpen(true);
                  }}
                  minimal={true}
                />
              }
            />
            <Row
              title="Email"
              sub={
                <Tag minimal={true} interactive={true} intent={Intent.SUCCESS}>
                  Confirmed
                </Tag>
              }
              action={
                <Button
                  text="Change Email"
                  onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                    e.preventDefault();
                    setIsChangePasswordOpen(false);
                    setIsChangeEmailOpen(true);
                  }}
                  minimal={true}
                />
              }
            />
            <Row
              title="Active Sessions"
              action={<Button text="View Sessions" minimal={true} />}
            />
            <Row
              title="Security Questions"
              sub={
                <Tag minimal={true} interactive={true}>
                  Not Yet Available
                </Tag>
              }
              action={
                <AnchorButton href="#" text="Setup" minimal={true} disabled={true} />
              }
            />
            <Row
              title="Multi-factor Authentication"
              sub={
                <Tag minimal={true} interactive={true}>
                  Not Yet Available
                </Tag>
              }
              action={
                <AnchorButton href="#" text="Setup" minimal={true} disabled={true} />
              }
            />
          </tbody>
        </ResponsiveTable>
      </Card>
      <ChangePasswordDialog
        isOpen={isChangePasswordOpen}
        setIsOpen={setIsChangePasswordOpen}
      />
      <ChangeEmailDialog isOpen={isChangeEmailOpen} setIsOpen={setIsChangeEmailOpen} />
    </>
  );
}

export { PrivacyAndSafety };
