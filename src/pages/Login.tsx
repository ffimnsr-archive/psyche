import React, { useEffect } from "react";
import log from "loglevel";
import styled from "styled-components";
import { Colors, Button, Classes } from "@blueprintjs/core";
import { useAuth0 } from "@auth0/auth0-react";
import bgPattern from "../assets/images/pattern.svg";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router";
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
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      log.info("LoginDispatcherContent: redirecting to authenticated session");
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      <img src={logo} alt="logo" width={286} className="mb-4 ml-1" />
      <p
        className={classNames(Classes.RUNNING_TEXT, "text-justify")}
        style={{ textJustify: "inter-word" }}
      >
        By logging in, you agree to this platform <a href="#">terms of service</a> and
        user <a href="#">privacy policy</a>.
      </p>
      <ContainerOptions>
        <Button
          large={false}
          fill={true}
          outlined={true}
          onClick={() =>
            loginWithRedirect({
              authorizationParams: { redirect_uri: "http://localhost:8080" },
            })
          }
        >
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
