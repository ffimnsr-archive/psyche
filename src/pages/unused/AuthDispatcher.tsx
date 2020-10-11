import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApolloClient } from "react-apollo";
import qs from "qs";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { NonIdealState, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { HapButton } from "@/components";

const REST_URI = process.env.REACT_APP_RS_URI;

const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
`;

function AuthDispatcher(): JSX.Element {
  const description = (
    <div>
      Is probably the most annoying thing to look at, on a screen. This is a page nobody
      wants to land into. For the longest time this page echoed the words
      &quot;disappointment&quot; and had always been notoriously referred to as the
      &quot;last page of the internet&quot;.
    </div>
  );

  const action = (
    <HapButton to="/" intent={Intent.PRIMARY} large={true}>
      Go Back Home
    </HapButton>
  );

  const client = useApolloClient();
  const location = useLocation();
  const query = qs.parse(location.search.substr(1));

  useEffect(() => {
    log.info(
      `code: ${query["code"]}, state: ${query["state"]}, session: ${query["session_state"]}`,
    );

    fetch(
      `${REST_URI}/auth/callback?code=${query["code"]}&state=${query["state"]}&session_state=${query["session_state"]}`,
      {
        credentials: "include",
      },
    )
      .then((res) => res.json())
      .then(
        (result) => {
          log.info(result.data);

          // OLD WAY
          // sessionStorage.setItem("osslocal-token", result.data.id_token);
          // if (window.opener !== null) {
          //   window.opener.sessionStorage.setItem("osslocal-token", result.data.id_token);
          // }
          client.writeData({ data: { isAuthenticated: true } });

          setTimeout(() => {
            if (window.opener !== null) {
              window.opener.location.reload();
              window.close();
            }
          }, 2000);
        },
        (error) => {
          log.error(error);

          if (window.opener !== null) {
            window.close();
          }
        },
      );
  }, [client, query]);

  return (
    <Container>
      <Helmet>
        <title>Open Sesame</title>
      </Helmet>
      <NonIdealState
        icon={IconNames.PATH_SEARCH}
        title="Resolving Identity"
        description={description}
        action={action}
      />
    </Container>
  );
}

export default AuthDispatcher;
