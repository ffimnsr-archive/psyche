import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  Position,
} from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { IconName, IconNames } from "@blueprintjs/icons";
import { useAuth0 } from "@auth0/auth0-react";

const NoShadowNavbar = styled(Navbar)`
  box-shadow: none;
`;

const CustomNavbarHeading = styled(NavbarHeading)`
  margin-left: 8px;
  margin-right: 8px;
`;

interface MenuDetail {
  icon: IconName;
  text: string;
  handler: () => void;
}

function NavigationHeaderContent(): JSX.Element {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const menus: MenuDetail[] = [
    {
      icon: IconNames.PERSON,
      text: "Account Settings",
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handler: () => {},
    },
    {
      icon: IconNames.ID_NUMBER,
      text: "My Profile",
      handler: () => {
        navigate("/u/profile");
      },
    },
    {
      icon: IconNames.PROJECTS,
      text: "Projects",
      handler: () => {
        navigate("/u/projects");
      },
    },
    {
      icon: IconNames.SETTINGS,
      text: "Settings",
      handler: () => {
        navigate("/u/settings");
      },
    },
    {
      icon: IconNames.DELTA,
      text: "Divider",
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handler: () => {},
    },
    {
      icon: IconNames.LOG_OUT,
      text: "Sign out",
      handler: () => {
        logout({ returnTo: window.location.origin });
      },
    },
  ];

  const userMenu = (
    <Menu>
      {menus.map(({ icon, text, handler }: MenuDetail, index: number) => {
        if (text === "Divider") {
          return <MenuDivider key={index} />;
        }

        return <MenuItem key={index} onClick={handler} icon={icon} text={text} />;
      })}
    </Menu>
  );

  return (
    <NoShadowNavbar>
      <NavbarGroup align={Alignment.LEFT}>
        <CustomNavbarHeading>Open Sesame</CustomNavbarHeading>
        <NavbarDivider />
        <AnchorButton
          href="https://docs.se-same.com/"
          text="Docs"
          target="_blank"
          minimal={true}
        />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Popover2 content={userMenu} placement={Position.BOTTOM}>
          <Button minimal={true} rightIcon={IconNames.USER} />
        </Popover2>
      </NavbarGroup>
    </NoShadowNavbar>
  );
}

export const NavigationHeader = NavigationHeaderContent;
