import React, { useState, useEffect } from "react";
import log from "loglevel";
import styled from "styled-components";
import {
  Card,
  Elevation,
  H5,
  Dialog,
  Classes,
  UL,
  Button,
  Intent,
  Checkbox,
  FormGroup,
  Divider,
  IToasterProps,
  IToaster,
  IToastProps,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik, Form, FieldArray, FieldArrayRenderProps } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

const WORK_PREFERENCE_UPDATE_MUTATION = gql`
  mutation _workPreferenceUpdate($interests: [Int!]!) {
    syncMyWorkPrefs(interests: $interests) {
      id
      email
      publicId
      workPreference {
        interests
        projectLimit
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

const WorkPreferencesUpdateSchema = Yup.object().shape({
  interests: Yup.array()
    .ensure()
    .required("Work preference is required"),
});

const defaultDialogOptions = {
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: false,
  enforceFocus: true,
  usePortal: true,
};

const toasterProps: IToasterProps = {
  autoFocus: true,
  canEscapeKeyClear: true,
  position: Position.TOP,
};

const toaster: IToaster = Toaster.create(toasterProps);

function WorkPreference({
  data,
}: {
  data: {
    profile: {
      workPreference?: {
        interests: number[];
        projectLimit: number;
      };
    };
    workFunctions: { id: string; name: string }[];
  };
}): JSX.Element {
  const title = "Work Preference";
  const [isOpen, setIsOpen] = useState(false);
  const [workPreferenceUpdate, { error }] = useMutation(WORK_PREFERENCE_UPDATE_MUTATION);

  useEffect(() => {
    const toastProps: IToastProps = {
      intent: Intent.DANGER,
      timeout: 5000,
      message:
        "An error occurred while updating your project preference. \
          The system already notified the system administrator about the error.",
    };

    if (error) {
      log.error(error);
      toaster.show(toastProps);
    }
  }, [error]);

  const initialValues: { interests: string[] } = {
    interests: data.profile.workPreference?.interests.map(String) ?? [],
  };

  const workFunctionsDisabled = data.workFunctions.map(
    ({ id, name }: { id: string; name: string }) => (
      <li key={id}>
        <CheckboxContainer>
          <Checkbox
            label={name}
            checked={initialValues.interests.includes(id)}
            defaultIndeterminate={false}
            disabled={true}
          />
        </CheckboxContainer>
      </li>
    ),
  );

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
        <ResponsiveList>{workFunctionsDisabled}</ResponsiveList>
      </Card>
      <Dialog
        icon={IconNames.INFO_SIGN}
        title={title}
        onClose={(): void => setIsOpen(!isOpen)}
        isOpen={isOpen}
        {...defaultDialogOptions}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={WorkPreferencesUpdateSchema}
          onSubmit={({ interests }, { setSubmitting }): void => {
            setSubmitting(false);
            workPreferenceUpdate({
              variables: {
                interests: interests.map(Number),
              },
            });
            setIsOpen(false);
          }}
        >
          {({ values, isSubmitting }): JSX.Element => (
            <Form>
              <div className={Classes.DIALOG_BODY}>
                <FormGroup
                  helperText="This will determine what role in projects you'll be put on."
                  label="Select your work preference"
                  labelInfo="(required)"
                >
                  <FieldArray
                    name="interests"
                    render={(arrayHelpers: FieldArrayRenderProps): JSX.Element[] =>
                      data.workFunctions.map(
                        ({ id, name }: { id: string; name: string }, index: number) => (
                          <Checkbox
                            key={id}
                            label={name}
                            name={`workFunctions.${index}`}
                            checked={values.interests.includes(id)}
                            defaultIndeterminate={false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                              if (e.target.checked) arrayHelpers.push(id);
                              else {
                                const idx = values.interests.indexOf(id);
                                arrayHelpers.remove(idx);
                              }
                            }}
                          />
                        ),
                      )
                    }
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

export { WorkPreference };
