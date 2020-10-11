import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { RouterProps } from "react-router";
import { useApolloClient } from "react-apollo";
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
import { useKeycloak } from "@react-keycloak/web";

const NoShadowNavbar = styled(Navbar)`
  box-shadow: none;
`;

function NavigationHeaderContent({ history }: RouterProps): JSX.Element {
  const client = useApolloClient();
  const { keycloak } = useKeycloak();

  const userMenu = (
    <Menu>
      <MenuItem
        onClick={(): void => {
          keycloak?.accountManagement();
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
          client.resetStore();
          keycloak?.logout();
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
