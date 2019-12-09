import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
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
import { useApolloClient } from "react-apollo";

const NoShadowNavbar = styled(Navbar)`
  box-shadow: none;
`;

function NavigationHeaderContent(props) {
  const client = useApolloClient();

  const userMenu = (
    <Menu>
      <MenuItem
        onClick={() => props.history.push("/profile")}
        icon="person"
        text="My Profile"
      />
      <MenuItem icon="graph" text="Graph" />
      <MenuDivider />
      <MenuItem icon="settings" text="Settings" />
      <MenuDivider />
      <MenuItem
        onClick={() => {
          sessionStorage.removeItem("token");
          client.resetStore();
          props.history.push("/");  
        }}
        icon="log-out" 
        text="Logout"
      />
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

export const NavigationHeader = withRouter(NavigationHeaderContent);
