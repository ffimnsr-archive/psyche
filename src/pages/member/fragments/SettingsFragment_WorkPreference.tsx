import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  Elevation,
  H5,
  Dialog,
  Classes,
  HTMLTable,
  Button,
  Intent,
  Checkbox,
  FormGroup,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik } from "formik";

const CheckboxContainer = styled.td`
  & > label.bp3-control.bp3-disabled {
    margin-bottom: 0;
    cursor: pointer;
    color: #182026;
  }
`;

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

function WorkPreference({ data }: any): JSX.Element {
  const title = "Work Preference";
  const [isOpen, setIsOpen] = useState(false);
  const workFunctions = data.wf.map(({ id, name }: any) => (
    <tr key={id}>
      <CheckboxContainer>
        <Checkbox label={name} defaultIndeterminate={false} disabled={true} />
      </CheckboxContainer>
    </tr>
  ));

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
          <tbody>{workFunctions}</tbody>
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
          validate={(values: any) => {
            const errors: any = {};

            if (!values.email) {
              errors.email = "Invalid email address";
            }

            return errors;
          }}
          onSubmit={(
            { firstName, lastName, gender, birthDate, phoneNumber, bio },
            { setSubmitting },
          ): void => {
            setSubmitting(false);
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
              <div className={Classes.DIALOG_BODY}></div>
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

export { WorkPreference };
