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
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

const EditButton = styled.a`
  float: right;
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

function PrivacyAndSafety(): JSX.Element {
  const title = "Privacy and Safety";
  const [isOpen, setIsOpen] = useState(false);
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
