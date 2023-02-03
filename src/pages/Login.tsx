import React, { useEffect, useState } from "react";
import log from "loglevel";
import styled from "styled-components";
import { Colors, Button, Classes, Callout, Intent } from "@blueprintjs/core";
import classNames from "classnames";
import { useNavigate } from "react-router";
import bgPattern from "../assets/images/pattern.svg";
import logo from "../assets/images/logo.png";
import { getProvider, PhantomProvider } from "../utils/phantom";
import { authState, walletState } from "../utils/atom";
import { useRecoilState } from "recoil";

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
  const navigate = useNavigate();

  const [isAuthenticated, setUsAuthenticated] = useRecoilState(authState);
  const [walletKey, setWalletKey] = useRecoilState(walletState);

  const [provider, setProvider] = useState<PhantomProvider | undefined>(undefined);

  const connectWallet = async (): Promise<void> => {
    const solana = getProvider();
    if (!solana) {
      return;
    }

    try {
      const response = await solana.connect();
      setUsAuthenticated(true);
      setWalletKey(response.publicKey.toBase58());
    } catch (err) {
      log.error(err);
    }
  };

  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      setProvider(provider);
    }

    if (provider && isAuthenticated) {
      log.info("LoginDispatcherContent: redirecting to authenticated session");
      navigate("/");
    }
  }, [navigate, setProvider, isAuthenticated]);

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
        {provider && !walletKey && (
          <Button outlined={true} fill={true} onClick={connectWallet}>
            Login with Phantom Wallet
          </Button>
        )}
        {!provider && (
          <Callout intent={Intent.WARNING}>
            No provider found. Install <a href="https://phantom.app/">Phantom Browser</a>{" "}
            extension.
          </Callout>
        )}
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
