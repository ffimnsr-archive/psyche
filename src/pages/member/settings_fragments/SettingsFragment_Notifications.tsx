import React, { useState, useEffect } from "react";
import log from "loglevel";
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
  mutation _notificationsUpdate(
    $optInUsageStat: Boolean!
    $optInMarketing: Boolean!
    $experimentalFeatures: Boolean!
  ) {
    syncMySitePrefs(
      optInUsageStat: $optInUsageStat
      optInMarketing: $optInMarketing
      experimentalFeatures: $experimentalFeatures
    ) {
      id
      email
      publicId
      sitePreference {
        optInUsageStat
        optInMarketing
        experimentalFeatures
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
        experimentalFeatures: boolean;
      };
    };
  };
}): JSX.Element {
  const title = "Site Preference & Notifications";
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsUpdate, { error }] = useMutation(NOTIFICATIONS_UPDATE_MUTATION, {
    onCompleted({ syncMySitePrefs }) {
      log.trace(syncMySitePrefs);
    },
  });

  useEffect(() => {
    const toastProps: IToastProps = {
      intent: Intent.DANGER,
      timeout: 5000,
      message:
        "An error occurred while updating your site preference. \
          The system already notified the system administrator about the error.",
    };

    if (error) {
      log.error(error);
      toaster.show(toastProps);
    }
  }, [error]);

  const optInUsageStat = data.profile.sitePreference?.optInUsageStat ?? false;
  const optInMarketing = data.profile.sitePreference?.optInMarketing ?? false;
  const experimentalFeatures = data.profile.sitePreference?.experimentalFeatures ?? false;

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
                checked={optInUsageStat}
                disabled={true}
              />
            </CheckboxContainer>
          </li>
          <li>
            <CheckboxContainer>
              <Checkbox
                label="Opt&#8208;in marketing and promotions (through email)"
                checked={optInMarketing}
                disabled={true}
              />
            </CheckboxContainer>
          </li>
          <li>
            <CheckboxContainer>
              <Checkbox
                label="Enable experimental features"
                checked={experimentalFeatures}
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
            optInUsageStat,
            optInMarketing,
            experimentalFeatures,
          }}
          validationSchema={NotificationsUpdateSchema}
          onSubmit={(
            { optInUsageStat, optInMarketing, experimentalFeatures },
            { setSubmitting },
          ): void => {
            setSubmitting(false);
            notificationsUpdate({
              variables: {
                optInUsageStat,
                optInMarketing,
                experimentalFeatures,
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
                    name="optInUsageStat"
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
                    name="optInMarketing"
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
                    name="experimentalFeatures"
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
