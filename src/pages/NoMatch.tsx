import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { GoBackHomeButton } from "@/components";

const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
`;

function NoMatchView(): JSX.Element {
  log.trace("NoMatchView: rendering component");

  const description = (
    <div>
      Is probably the most annoying thing to look at, on a screen. This is a page nobody
      wants to land into. For the longest time this page echoed the words
      &quot;disappointment&quot; and had always been notoriously referred to as the
      &quot;last page of the internet&quot;.
    </div>
  );

  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Page Not Found</title>
      </Helmet>
      <NonIdealState
        icon={IconNames.PATH_SEARCH}
        title="Page Not Found"
        description={description}
        action={<GoBackHomeButton />}
      />
    </Container>
  );
}

export default NoMatchView;
