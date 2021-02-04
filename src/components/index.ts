export { ErrorBoundary } from "./ErrorBoundary";
export { HapButton } from "./HapButton";
export { NavigationHeader } from "./NavigationHeader";
export { Sidebar } from "./Sidebar";

import styled from "styled-components";

export const ContainerRoot = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

export const ContainerRootInner = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
`;

export const ImageAvatar = styled.img`
  border-radius: 50%;
  border: 1px dashed #000;
`;
