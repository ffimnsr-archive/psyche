import * as React from "react";
import styled from "styled-components";
import {
  Alignment,
  AnchorButton,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider
} from "@blueprintjs/core";

const NoShadowNavbar = styled(Navbar)`
  box-shadow: none;
`;

export interface NavigationHeaderProps {}

export class NavigationHeader extends React.PureComponent<NavigationHeaderProps> {
  render() {
    return (
      <NoShadowNavbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Open Sesame</NavbarHeading>
          <NavbarDivider />
          <AnchorButton
            href="/"
            text="Docs"
            target="_blank"
            minimal={true}
            rightIcon="share"
          />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <AnchorButton
            href="/"
            minimal={true}
            rightIcon="user"
          />
        </NavbarGroup>
      </NoShadowNavbar>
    );
  }
}
