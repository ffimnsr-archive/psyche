import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  Elevation,
  H5,
  Dialog,
  UL,
  Classes,
  Button,
  Intent,
  Checkbox,
  Divider,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CheckboxContainer = styled.div`
  & > label.${Classes.CONTROL}.${Classes.DISABLED} {
    margin-bottom: 0;
    cursor: pointer;
    color: #182026;
  }
`;

const ResponsiveList = styled(UL)`
  column-count: 2;
  margin-top: 0;
  padding-left: 11px;

  & > li {
    list-style-type: none;
  }
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

const NotificationsUpdateSchema = Yup.object().shape({
  workPreferences: Yup.array()
    .ensure()
    .required("Work preference is required"),
});

function Notifications(): JSX.Element {
  const title = "Site Preference & Notifications";
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
        <Divider />
        <ResponsiveList>
          <li>
            <CheckboxContainer>
              <Checkbox
                label="Opt&#8208;in anonymous usage statistics"
                defaultIndeterminate={false}
                disabled={true}
              />
            </CheckboxContainer>
          </li>
          <li>
            <CheckboxContainer>
              <Checkbox
                label="Opt&#8208;in marketing and promotions"
                defaultIndeterminate={false}
                disabled={true}
              />
            </CheckboxContainer>
          </li>
          <li>
            <CheckboxContainer>
              <Checkbox
                label="Enable experimental features"
                defaultIndeterminate={false}
                disabled={true}
              />
            </CheckboxContainer>
          </li>
        </ResponsiveList>
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
          validationSchema={NotificationsUpdateSchema}
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

export { Notifications };
