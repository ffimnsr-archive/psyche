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
  Checkbox,
  FormGroup,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik } from "formik";

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
  usePortal: true
};

function PrivacyAndSafety({ data }) {
  const title = "Privacy and Safety"
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <div className="clearfixr" style={{marginBottom: "10px"}}>
          <H5 style={{display: "inline"}}>{title}</H5>
          <EditButton
            href="#"
            onClick={(e) => {
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
              <td>

              </td>
            </tr>
          </tbody>
        </ResponsiveTable>
      </Card>
      <Dialog
        icon={IconNames.INFO_SIGN}
        title={title}
        onClose={() => setIsOpen(!isOpen)}
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
            bio: ""
          }}
          validate={(values: any) => {
            let errors: any = {};

            if (!values.email) {
              errors.email = "Invalid email address";
            }

            return errors;
          }}
          onSubmit={({
            firstName,
            lastName,
            gender,
            birthDate,
            phoneNumber,
            bio
          }, { setSubmitting }) => {
            setSubmitting(false);
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
              <div className={Classes.DIALOG_BODY}>
              </div>
              <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                  <Button
                    intent={Intent.PRIMARY}
                    disabled={isSubmitting}
                    type="submit"
                  >
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

export { PrivacyAndSafety };