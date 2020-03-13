import React, { useState, useEffect } from "react";
import log from "loglevel";
import styled from "styled-components";
import _ from "lodash";
import {
  Card,
  Elevation,
  H5,
  HTMLTable,
  Dialog,
  Classes,
  Button,
  Intent,
  FormGroup,
  InputGroup,
  HTMLSelect,
  TextArea,
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

const ACCOUNT_UPDATE_MUTATION = gql`
  mutation _accountUpdate(
    $firstName: String!
    $lastName: String!
    $gender: String!
    $birthDate: Date!
    $bio: String!
    $phoneNumber: String!
    $countryId: Int!
  ) {
    syncMyProfile(
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      birthDate: $birthDate
      bio: $bio
      phoneNumber: $phoneNumber
      countryId: $countryId
    ) {
      id
      email
      publicId
      socialSecurityNumber
      clue {
        id
        firstName
        lastName
        birthDate
        gender
        bio
        phoneNumber
        country {
          id
          name
        }
      }
    }
  }
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

const EditButton = styled.a`
  float: right;
`;

const ModifiedTextArea = styled(TextArea)`
  resize: vertical;
  min-height: 100px;
`;

const AccountUpdateSchema = Yup.object().shape({
  firstName: Yup.string().required("First and middle name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  birthDate: Yup.string().required("Birth date is required"),
  countryId: Yup.string().required("Country is required"),
});

const defaultDialogOptions = {
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: false,
  enforceFocus: true,
  usePortal: true,
};

function format(value: string): string {
  return value.replace(/^(\w{4})(\w{4})(\w{4})(\w{4})$/, "$1-$2-$3-$4");
}

function Row({ title, sub }: { title: string; sub: string }): JSX.Element {
  return (
    <tr>
      <td>{title}</td>
      <td>{sub}</td>
    </tr>
  );
}

interface MyProfile {
  email: string;
  socialSecurityNumber: string;
  clue?: {
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    image: string;
    bio: string;
    phoneNumber: string;
    country?: {
      id: string;
      name: string;
    };
  };
}

function AccountUpdateOk({
  title,
  profile,
  setIsOpen = (): void => {
    log.warn("unimplemented");
  },
}: {
  title: string;
  profile?: MyProfile;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { socialSecurityNumber, clue } =
    profile ??
    ({
      socialSecurityNumber: "",
      clue: undefined,
    } as MyProfile);
  return (
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
          <Row title="Social No." sub={format(socialSecurityNumber)} />
          <Row title="First &amp; Middle Name" sub={_.startCase(clue?.firstName) ?? ""} />
          <Row title="Last Name" sub={_.startCase(clue?.lastName) ?? ""} />
          <Row title="Gender" sub={_.capitalize(clue?.gender) ?? ""} />
          <Row title="Birth Date" sub={clue?.birthDate ?? ""} />
          <Row title="Phone Number" sub={clue?.phoneNumber ?? ""} />
          <Row title="Bio" sub={_.capitalize(clue?.bio) ?? ""} />
          <Row title="Country" sub={_.capitalize(clue?.country?.name) ?? ""} />
        </tbody>
      </ResponsiveTable>
    </Card>
  );
}

const toasterProps: IToasterProps = {
  autoFocus: true,
  canEscapeKeyClear: true,
  position: Position.TOP,
};

const toaster: IToaster = Toaster.create(toasterProps);

function Account({
  data,
}: {
  data: {
    profile: MyProfile;
    countries: { id: string; name: string }[];
  };
}): JSX.Element {
  const title = "Account";
  const [isOpen, setIsOpen] = useState(false);
  const [accountUpdate, { error }] = useMutation(ACCOUNT_UPDATE_MUTATION);

  useEffect(() => {
    const toastProps: IToastProps = {
      intent: Intent.DANGER,
      timeout: 5000,
      message:
        "An error occurred while updating your profile. \
          The system already notified the system administrator about the error.",
    };

    if (error) {
      log.error(error);
      toaster.show(toastProps);
    }
  }, [error]);

  const { clue } = data.profile;

  return (
    <>
      <AccountUpdateOk title={title} profile={data.profile} setIsOpen={setIsOpen} />
      <Dialog
        icon={IconNames.INFO_SIGN}
        title={title}
        onClose={(): void => setIsOpen(!isOpen)}
        isOpen={isOpen}
        {...defaultDialogOptions}
      >
        <Formik
          initialValues={{
            firstName: clue?.firstName ?? "",
            lastName: clue?.lastName ?? "",
            gender: clue?.gender ?? "",
            birthDate: clue?.birthDate ?? "",
            phoneNumber: clue?.phoneNumber ?? "",
            bio: clue?.bio ?? "",
            countryId: clue?.country?.id ?? "",
          }}
          validationSchema={AccountUpdateSchema}
          onSubmit={(
            { firstName, lastName, gender, birthDate, phoneNumber, bio, countryId },
            { setSubmitting },
          ): void => {
            setSubmitting(false);
            accountUpdate({
              variables: {
                firstName,
                lastName,
                gender,
                birthDate,
                bio,
                phoneNumber,
                countryId: _.parseInt(countryId),
              },
            });
            setIsOpen(false);
          }}
        >
          {({ values, handleChange, handleBlur, isSubmitting }): JSX.Element => (
            <Form>
              <div className={Classes.DIALOG_BODY}>
                <FormGroup
                  label="First &amp; Middle Name"
                  labelFor="firstName"
                  labelInfo="(required)"
                >
                  <InputGroup
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    type="text"
                  />
                </FormGroup>
                <FormGroup label="Last Name" labelFor="lastName" labelInfo="(required)">
                  <InputGroup
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    type="text"
                  />
                </FormGroup>
                <FormGroup label="Gender" labelFor="gender" labelInfo="(required)">
                  <HTMLSelect
                    id="gender"
                    name="gender"
                    large={true}
                    fill={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    options={[
                      { label: "Don't Specify", value: "unspecified" },
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                  />
                </FormGroup>
                <FormGroup label="Birth Date" labelFor="birthDate" labelInfo="(required)">
                  <InputGroup
                    id="birthDate"
                    name="birthDate"
                    placeholder="Enter your birth date..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.birthDate}
                    type="text"
                  />
                </FormGroup>
                <FormGroup label="Phone Number" labelFor="phoneNumber">
                  <InputGroup
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number..."
                    large={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    type="text"
                  />
                </FormGroup>
                <FormGroup label="Tell us more about you?" labelFor="bio">
                  <ModifiedTextArea
                    id="bio"
                    name="bio"
                    placeholder="Enter your bio..."
                    large={true}
                    fill={true}
                    growVertically={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bio}
                  />
                </FormGroup>
                <FormGroup label="Country" labelFor="countryId" labelInfo="(required)">
                  <HTMLSelect
                    id="countryId"
                    name="countryId"
                    large={true}
                    fill={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.countryId}
                    options={data.countries.map(
                      ({ id, name }: { id: string; name: string }, index: number) => ({
                        key: index,
                        label: name,
                        value: id,
                      }),
                    )}
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

export { Account };
