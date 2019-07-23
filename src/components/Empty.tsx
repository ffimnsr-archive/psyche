import React from "react";
import styled from "styled-components";
import { Card, Elevation, NonIdealState, Colors } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

const ContainerEmpty = styled.div`
  flex: 0 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ContainerContent = styled.div`
  background-color: ${Colors.WHITE};
`;

/**
 * This renders an empty placeholder component.
 * @returns React component
 */
export function EmptyPlaceholder(): JSX.Element {
  const description = (
    <p>
      Once you&apos;ve joined the search pool you&apos;ll be able to get projects that you
      would work on. Those projects were based on things that you&apos;ve indicated on
      your profile. You can either accept or reject the project that&apos;s been assigned
      to you.
    </p>
  );

  return (
    <ContainerEmpty>
      <ContainerContent>
        <Card elevation={Elevation.ONE}>
          <NonIdealState
            icon={IconNames.MOUNTAIN}
            title="Nothing Here"
            description={description}
          />
        </Card>
      </ContainerContent>
    </ContainerEmpty>
  );
}
