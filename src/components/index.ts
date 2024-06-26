export { ErrorBoundary } from "./ErrorBoundary";
export { NavigationHeader } from "./NavigationHeader";
export { Sidebar } from "./Sidebar";
export { GoBackHomeButton } from "./GoBackHomeButton";
export * from "./Loader";
export * from "./Empty";

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
