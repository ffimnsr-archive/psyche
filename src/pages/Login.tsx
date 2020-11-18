import React, { useCallback } from "react";
import log from "loglevel";
import styled from "styled-components";
import { Colors, Button } from "@blueprintjs/core";
import { Redirect, withRouter } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import bgPattern from "@/assets/images/pattern.svg";

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerDesign = styled.div`
  flex: 1 1 auto;
  background-size: auto !important;
  background-color: ${Colors.GRAY2};
  background-image: url(${bgPattern});
`;

const ContainerSidePane = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  width: 500px;

  @media (max-width: 512px) {
    width: 100vw;
  }
`;

const ContainerDispatcher = styled.div`
  flex: 1 1 auto;
  align-self: center;
  padding: 0 2em;
`;

const ContainerOptions = styled.div`
  margin-top: 3em;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LoginDispatcherContent({ location }: any): JSX.Element {
  const currentLocationState: { [key: string]: unknown } = location.state || {
    from: { pathname: "/" },
  };

  const { keycloak } = useKeycloak();
  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  if (keycloak?.authenticated) {
    log.info("Redirecting to authenticated session");
    return <Redirect to={currentLocationState?.from as string} />;
  }

  return (
    <>
      <ContainerOptions>
        <Button large={true} fill={true} outlined={true} onClick={login}>
          Login
        </Button>
      </ContainerOptions>
    </>
  );
}

const LoginDispatcher = withRouter(LoginDispatcherContent);

function Login(): JSX.Element {
  return (
    <Container>
      <ContainerDesign />
      <ContainerSidePane>
        <ContainerDispatcher>
          <LoginDispatcher />
        </ContainerDispatcher>
      </ContainerSidePane>
    </Container>
  );
}

export default Login;
