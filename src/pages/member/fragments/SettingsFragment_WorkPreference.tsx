import React, { useState } from "react";
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
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik, Form, FieldArray, FieldArrayRenderProps } from "formik";
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

const WorkPreferencesUpdateSchema = Yup.object().shape({
  workPreferences: Yup.array()
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

function WorkPreference({
  data,
}: {
  data: { wf: { id: string; name: string }[] };
}): JSX.Element {
  const title = "Work Preference";
  const [isOpen, setIsOpen] = useState(false);
  const workFunctionsDisabled = data.wf.map(
    ({ id, name }: { id: string; name: string }) => (
      <li key={id}>
        <CheckboxContainer>
          <Checkbox label={name} defaultIndeterminate={false} disabled={true} />
        </CheckboxContainer>
      </li>
    ),
  );

  const initialValues: { workPreferences: string[] } = {
    workPreferences: [],
  };

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
          onSubmit={({ workPreferences }, { setSubmitting }): void => {
            setSubmitting(false);
            setTimeout(() => {
              console.log(JSON.stringify(workPreferences, null, 2));
            }, 500);
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
                    name="workPreferences"
                    render={(arrayHelpers: FieldArrayRenderProps): JSX.Element[] =>
                      data.wf.map(
                        ({ id, name }: { id: string; name: string }, index: number) => (
                          <Checkbox
                            key={id}
                            label={name}
                            name={`wf.${index}`}
                            defaultIndeterminate={false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                              if (e.target.checked) arrayHelpers.push(id);
                              else {
                                const idx = values.workPreferences.indexOf(id);
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
