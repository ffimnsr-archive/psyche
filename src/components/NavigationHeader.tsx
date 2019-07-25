import * as React from "react";
import {
  Alignment,
  AnchorButton,
  Classes,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider
} from "@blueprintjs/core";

export interface NavigationHeaderProps {}

export class NavigationHeader extends React.PureComponent<NavigationHeaderProps> {
  render() {
    return (
      <Navbar className={Classes.DARK}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Open Sesame</NavbarHeading>
          <NavbarDivider />
          <AnchorButton
            href="/"
            text="Docs"
            target="_blank"
            minimal
            rightIcon="share"
          />
        </NavbarGroup>
      </Navbar>
    );
  }
}
