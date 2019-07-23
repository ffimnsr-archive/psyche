import React from "react";
import styled from "styled-components";
import { Spinner, SpinnerSize } from "@blueprintjs/core";

const ContainerNonTrivial = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
`;

export function FullPageLoader(): JSX.Element {
  return (
    <ContainerNonTrivial>
      <Spinner size={SpinnerSize.LARGE} />
    </ContainerNonTrivial>
  );
}
