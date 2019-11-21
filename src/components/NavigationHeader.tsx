import * as React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import {
  Alignment,
  AnchorButton,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  Position
} from "@blueprintjs/core";

const NoShadowNavbar = styled(Navbar)`
  box-shadow: none;
`;

export interface NavigationHeaderProps extends RouteComponentProps<any> {}

class NavigationHeaderImpl extends React.PureComponent<NavigationHeaderProps> {
  routeChange = (r: string) => () => this.props.history.push(r);

  render() {
    const userMenu = (
      <Menu>
        <MenuItem
          onClick={this.routeChange("/profile")}
          icon="person"
          text="My Profile"
        />
        <MenuItem icon="graph" text="Graph" />
        <MenuDivider />
        <MenuItem icon="settings" text="Settings" />
        <MenuDivider />
        <MenuItem icon="log-out" text="Logout" />
      </Menu>
    );

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
          <Popover content={userMenu} position={Position.BOTTOM}>
            <Button minimal={true} rightIcon="user" />
          </Popover>
        </NavbarGroup>
      </NoShadowNavbar>
    );
  }
}

export const NavigationHeader = withRouter(NavigationHeaderImpl);
