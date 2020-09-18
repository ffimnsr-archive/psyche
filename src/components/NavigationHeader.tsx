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

const REST_URI = process.env.REACT_APP_RS_URI;
const AUTH_URI = process.env.REACT_APP_AS_URI;

const NoShadowNavbar = styled(Navbar)`
  box-shadow: none;
`;

function NavigationHeaderContent({ history }: RouterProps): JSX.Element {
  const client = useApolloClient();

  const userMenu = (
    <Menu>
      <MenuItem
        onClick={(): void => {
          window.location.href = `${AUTH_URI}/account/`;
        }}
        icon={IconNames.PERSON}
        text="Account Settings"
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
          sessionStorage.removeItem("osslocal-token");
          client.resetStore();
          window.location.replace(`${REST_URI}/logout`);
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
          href="http://docs.se-same.com/"
          text="Docs"
          target="_blank"
          minimal={true}
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
