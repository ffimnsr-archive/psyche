import React, { useState, useEffect } from "react";
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
  FormGroup,
  IToasterProps,
  IToaster,
  IToastProps,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

const NOTIFICATIONS_UPDATE_MUTATION = gql`
  mutation _notificationsUpdate($optInUsageStat: Boolean!, $optInMarketing: Boolean!) {
    syncMySitePrefs(optInUsageStat: $optInUsageStat, optInMarketing: $optInMarketing) {
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

const CustomDivider = styled(Divider)`
  margin: 5px 0;
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
  optInUsageStat: Yup.boolean().required(),
  optInMarketing: Yup.boolean().required(),
  experimentalFeatures: Yup.boolean().required(),
});

const toasterProps: IToasterProps = {
  autoFocus: true,
  canEscapeKeyClear: true,
  position: Position.TOP,
};

const toaster: IToaster = Toaster.create(toasterProps);

function Notifications({
  data,
}: {
  data: {
    profile: {
      sitePreference?: {
        optInMarketing: boolean;
        optInUsageStat: boolean;
      };
    };
  };
}): JSX.Element {
  const title = "Site Preference & Notifications";
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsUpdate, { error }] = useMutation(NOTIFICATIONS_UPDATE_MUTATION);

  useEffect(() => {
    const toastProps: IToastProps = {
      intent: Intent.DANGER,
      timeout: 5000,
      message:
        "An error occurred while updating your site preference. \
          The system already notified the system administrator about the error.",
    };

    if (error) toaster.show(toastProps);
  }, [error]);

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
        <CustomDivider />
        <ResponsiveList>
          <li>
            <CheckboxContainer>
              <Checkbox
                label="Opt&#8208;in anonymous usage statistics"
                checked={data.profile.sitePreference?.optInUsageStat ?? false}
                disabled={true}
              />
            </CheckboxContainer>
          </li>
          <li>
            <CheckboxContainer>
              <Checkbox
                label="Opt&#8208;in marketing and promotions (through email)"
                checked={data.profile.sitePreference?.optInMarketing ?? false}
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
            optInUsageStat: data.profile.sitePreference?.optInUsageStat ?? false,
            optInMarketing: data.profile.sitePreference?.optInMarketing ?? false,
            experimentalFeatures: false,
          }}
          validationSchema={NotificationsUpdateSchema}
          onSubmit={({ optInUsageStat, optInMarketing }, { setSubmitting }): void => {
            setSubmitting(false);
            notificationsUpdate({
              variables: {
                optInUsageStat,
                optInMarketing,
              },
            });
            setIsOpen(false);
          }}
        >
          {({ values, handleBlur, isSubmitting, setFieldValue }): JSX.Element => (
            <Form>
              <div className={Classes.DIALOG_BODY}>
                <FormGroup label="Select your site and notification preference">
                  <Checkbox
                    id="optInUsageStat"
                    label="Opt&#8208;in anonymous usage statistics"
                    checked={values.optInUsageStat}
                    onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                      const target = e.target as HTMLInputElement;
                      setFieldValue(target.id, target.checked);
                    }}
                    onBlur={handleBlur}
                  />
                  <Checkbox
                    id="optInMarketing"
                    label="Opt&#8208;in marketing and promotions (through email)"
                    checked={values.optInMarketing}
                    onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                      const target = e.target as HTMLInputElement;
                      setFieldValue(target.id, target.checked);
                    }}
                    onBlur={handleBlur}
                  />
                  <Checkbox
                    id="experimentalFeatures"
                    label="Enable experimental features"
                    checked={values.experimentalFeatures}
                    onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                      const target = e.target as HTMLInputElement;
                      setFieldValue(target.id, target.checked);
                    }}
                    onBlur={handleBlur}
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
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export { Notifications };
