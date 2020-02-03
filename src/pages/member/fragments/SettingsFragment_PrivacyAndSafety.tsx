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
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";

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

const PrivacyAndSafetyUpdateSchema = Yup.object().shape({
  workPreferences: Yup.array()
    .ensure()
    .required("Work preference is required"),
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

function PrivacyAndSafety(): JSX.Element {
  const title = "Privacy & Safety";
  const [isOpen, setIsOpen] = useState(false);
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
              action={<AnchorButton href="#" text="Reset" minimal={true} />}
            />
            <Row
              title="Password"
              sub={
                <Tag minimal={true} interactive={true} intent={Intent.SUCCESS}>
                  Secured
                </Tag>
              }
              action={<AnchorButton href="#" text="Change" minimal={true} />}
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
          validationSchema={PrivacyAndSafetyUpdateSchema}
          onSubmit={(_, { setSubmitting }): void => {
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }): JSX.Element => (
            <Form>
              <div className={Classes.DIALOG_BODY}></div>
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
    </>
  );
}

export { PrivacyAndSafety };
