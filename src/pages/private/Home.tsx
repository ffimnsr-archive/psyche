import React, { useEffect, useState } from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import {
  Card,
  Button,
  Elevation,
  Callout,
  Intent,
  NonIdealState,
  Colors,
  Alert,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
  FullPageLoader,
} from "../../components";
import { useAuth0, User } from "@auth0/auth0-react";
import { PrivRoute } from "../../Router";

const ContainerHome = styled.div`
  flex: 0 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ContainerContent = styled.div`
  background-color: ${Colors.WHITE};
`;

const ContainerCallout = styled.div`
  margin-bottom: 10px;
`;

interface JoinConfirmationAlertProps {
  isOpen: boolean;
  onCloseCb: (arg0: boolean) => void;
}

const JoinConfirmationAlert = ({ isOpen, onCloseCb }: JoinConfirmationAlertProps) => (
  <Alert
    confirmButtonText="Join"
    cancelButtonText="Cancel"
    loading={false}
    icon={IconNames.MOUNTAIN}
    intent={Intent.SUCCESS}
    isOpen={isOpen}
    onClose={() => onCloseCb(false)}
  >
    <p>
      By joining the talent pool you agree to the talent terms, conditions and
      non-disclosure agreement. Are you sure you want to join the talent pool?
    </p>
  </Alert>
);

function ProfileStillEmpty(): JSX.Element {
  const [isOpenJoinConfirmation, setIsOpenJoinConfirmation] = useState<boolean>(false);
  const { user } = useAuth0();
  const [userProfile, setUserProfile] = useState<User>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setUserProfile(user);
    };

    fetchUserProfile();
  }, [user]);

  const action = (
    <>
      <Button
        intent={Intent.SUCCESS}
        fill={true}
        large={true}
        text="Join"
        onClick={() => setIsOpenJoinConfirmation(true)}
      />
      <small>
        We will notify you immediately through SMS and email once a project gets assigned
        to you.
      </small>
    </>
  );

  const description = (
    <p>
      Once you&apos;ve joined the search pool you&apos;ll be able to get projects that you
      would work on. Those projects were based on things that you&apos;ve indicated on
      your profile. You can either accept or reject the project that&apos;s been assigned
      to you.
    </p>
  );

  return (
    <ContainerHome>
      <ContainerCallout>
        <Callout
          intent={Intent.WARNING}
          title={`Hey ${userProfile?.firstName ?? ""}, fill up your profile!`}
        >
          In order to use our services you need to complete your initial private profile.
          Your profile will not be shared with any of the clients nor other third party
          services.
        </Callout>
      </ContainerCallout>
      <ContainerContent>
        <Card elevation={Elevation.ONE}>
          <NonIdealState
            icon={IconNames.MOUNTAIN}
            title="Join Search Pool"
            description={description}
            action={action}
          />
        </Card>
      </ContainerContent>
      <JoinConfirmationAlert
        isOpen={isOpenJoinConfirmation}
        onCloseCb={setIsOpenJoinConfirmation}
      />
    </ContainerHome>
  );
}

function ProfileContent(): JSX.Element {
  const { loading, error, data } = {} as any;

  if (loading) return <FullPageLoader />;
  if (error) {
    log.error("ProfileContent: failed call to my profile query =", error);
    return <ProfileStillEmpty />;
  }

  log.debug("ProfileContent: profile call result =", data);
  if (!data || !data.public.profile) {
    return <ProfileStillEmpty />;
  }

  return <ProfileStillEmpty />;
}

function HomeView(): JSX.Element {
  log.trace("HomeView: rendering component");

  return (
    <PrivRoute>
      <ContainerRoot>
        <Helmet titleTemplate="%s | Open Sesame">
          <title>Home</title>
        </Helmet>
        <Sidebar />
        <ContainerRootInner>
          <NavigationHeader />
          <ProfileContent />
        </ContainerRootInner>
      </ContainerRoot>
    </PrivRoute>
  );
}

export default HomeView;
