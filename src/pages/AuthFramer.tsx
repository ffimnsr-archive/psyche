import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { NonIdealState, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { HapButton } from "@/components/HapButton";

const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
`;

function AuthFramer(): JSX.Element {
  // FZ_TODO: update the description
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

  return (
    <Container>
      <Helmet>
        <title>Open Sesame</title>
      </Helmet>
      <NonIdealState
        icon={IconNames.PATH_SEARCH}
        title="Connecting to SSO"
        description={description}
        action={action}
      />
    </Container>
  );
}

export default AuthFramer;
