import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { RouterProps } from "react-router";
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
  Position,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useApolloClient } from "react-apollo";

const NoShadowNavbar = styled(Navbar)`
  box-shadow: none;
`;

function NavigationHeaderContent({ history }: RouterProps): JSX.Element {
  const client = useApolloClient();

  const userMenu = (
    <Menu>
      <MenuItem
        onClick={(): void => history.push("/profile")}
        icon={IconNames.PERSON}
        text="My Profile"
      />
      <MenuItem
        onClick={(): void => {
          history.push("/projects");
        }}
        icon={IconNames.GRAPH}
        text="Projects"
      />
      <MenuDivider />
      <MenuItem
        onClick={(): void => {
          history.push("/settings");
        }}
        icon={IconNames.SETTINGS}
        text="Settings"
      />
      <MenuDivider />
      <MenuItem
        onClick={(): void => {
          sessionStorage.removeItem("token");
          client.resetStore();
          history.replace("/");
        }}
        icon={IconNames.LOG_OUT}
        text="Sign out"
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
          rightIcon={IconNames.SHARE}
        />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Popover content={userMenu} position={Position.BOTTOM}>
          <Button minimal={true} rightIcon={IconNames.USER} />
        </Popover>
      </NavbarGroup>
    </NoShadowNavbar>
  );
}

export const NavigationHeader = withRouter(NavigationHeaderContent);
