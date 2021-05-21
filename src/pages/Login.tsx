import React, { useCallback, useEffect } from "react";
import log from "loglevel";
import styled from "styled-components";
import { Colors, Button, Classes } from "@blueprintjs/core";
import { useKeycloak } from "@react-keycloak/web";
import bgPattern from "@/assets/images/pattern.svg";
import logo from "@/assets/images/logo.png";
import { useHistory } from "react-router";
import classNames from "classnames";

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

function LoginDispatcherContent(): JSX.Element | null {
  const { keycloak } = useKeycloak();
  const history = useHistory();
  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  useEffect(() => {
    if (keycloak?.authenticated) {
      log.trace("LoginDispatcherContent: redirecting to authenticated session");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      history.push("/");
    }
  }, [history, keycloak]);

  return (
    <>
      <img src={logo} alt="logo" width={286} className="mb-4 ml-1" />
      <p
        className={classNames(Classes.RUNNING_TEXT, "text-justify")}
        style={{ textJustify: "inter-word" }}
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

/**
 * Renders the main login view.
 * @returns React component
 */
function LoginView(): JSX.Element {
  log.trace("LoginView: rendering component");

  return (
    <ContainerRoot>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerDispatcher>
          <LoginDispatcherContent />
        </ContainerDispatcher>
      </ContainerSidePane>
    </ContainerRoot>
  );
}

export default LoginView;
