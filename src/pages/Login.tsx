import React, { useCallback } from "react";
import { useLocation } from "react-router";
import log from "loglevel";
import styled from "styled-components";
import { Colors, Button, Classes } from "@blueprintjs/core";
import { Redirect, withRouter } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import bgPattern from "@/assets/images/pattern.svg";
import logo from "@/assets/images/logo.png";

const ContainerRoot = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 350px;
  grid-gap: 0;
`;

const ContainerDesign = styled.div`
  background-size: auto !important;
  background-color: ${Colors.GRAY2};
  background-image: url(${bgPattern});
`;

const ContainerSidePane = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContainerDispatcher = styled.div`
  flex: 1 1 auto;
  align-self: center;
  padding: 0 2em;
`;

const ContainerOptions = styled.div`
  margin-top: 3em;
`;

function LoginDispatcherContent(): JSX.Element {
  const currentLocation = useLocation();

  const { keycloak } = useKeycloak();
  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  if (keycloak?.authenticated) {
    log.info("Redirecting to authenticated session");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Redirect to={(currentLocation.state as any)?.from as string} />;
  }

  return (
    <>
      <img
        src={logo}
        alt="logo"
        width={286}
        style={{
          marginLeft: "8px",
          marginBottom: "1rem",
        }}
      />
      <p
        className={Classes.RUNNING_TEXT}
        style={{
          textAlign: "justify",
          textJustify: "inter-word",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ullamcorper
        sapien ac dolor ultrices, eget convallis dui fermentum. Donec imperdiet iaculis
        elit quis placerat. Aliquam nec mattis urna. Sed egestas nunc vitae tellus rutrum
        aliquam.
      </p>
      <ContainerOptions>
        <Button large={false} fill={true} outlined={true} onClick={login}>
          Login
        </Button>
      </ContainerOptions>
    </>
  );
}

const LoginDispatcher = withRouter(LoginDispatcherContent);

function LoginView(): JSX.Element {
  log.trace("Rendering login view");

  return (
    <ContainerRoot>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerDispatcher>
          <LoginDispatcher />
        </ContainerDispatcher>
      </ContainerSidePane>
    </ContainerRoot>
  );
}

export default LoginView;
