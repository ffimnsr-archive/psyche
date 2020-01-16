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
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

function NoMatch() {
  const description = (
    <div>
      Is probably the most annoying thing to look at, on a screen.
      This is a page nobody wants to land into.
      For the longest time this page echoed the words "disappointment"
      and had always been notoriously referred to as the
      "last page of the internet".
    </div>
  );

  const action = (
    <HapButton
      to="/"
      intent={Intent.PRIMARY}
      large={true}
    >
      Go Back Home
    </HapButton>
  );

  return (
    <Container>
      <Helmet
        titleTemplate="%s | Open Sesame"
      >
        <title>Page Not Found</title>
      </Helmet>
      <NonIdealState
        icon={IconNames.PATH_SEARCH}
        title="Page Not Found"
        description={description}
        action={action}
      />
    </Container>
  );
}

export default NoMatch;
