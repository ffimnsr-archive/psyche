import * as React from "react";
import styled, { css } from "styled-components";
import {
  Alignment,
  Button,
  ButtonGroup,
  Colors,
  Menu,
  MenuItem,
  Popover,
  Position,
  Tooltip,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { IconName } from "@blueprintjs/icons";
import { HapButton } from "@/components/HapButton";
import logoIcon from "@/assets/images/logo_icon.png";

const ContainerSidebar = styled.div`
  min-width: 60px;
  background-color: ${Colors.VIOLET1};
`;

const ContainerLogo = styled.div`
  height: 50px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spacer = styled.div`
  height: 20px;
`;

const SharedCss = css`
  & > span > svg {
    fill: ${Colors.WHITE} !important;
  }
`;

const PaleWhiteHapButton = styled(HapButton)`
  ${SharedCss}
`;

const PaleWhiteButton = styled(Button)`
  ${SharedCss};
`;

interface SidebarNavigator {
  icon: IconName | JSX.Element | false | null | undefined;
  display: string;
  to: string;
}

export function Sidebar(): JSX.Element {
  const navs: SidebarNavigator[] = [
    { icon: IconNames.HOME, display: "Home", to: "/" },
    { icon: IconNames.NOTIFICATIONS, display: "Notifications", to: "/notifications" },
    { icon: IconNames.PEOPLE, display: "People", to: "/users" },
    { icon: IconNames.PROJECTS, display: "Projects", to: "/projects" },
    { icon: IconNames.PROJECTS, display: "Projects", to: "/projects" },
    { icon: IconNames.TIMELINE_EVENTS, display: "Schedules", to: "/schedules" },
  ];

  const navButtons = navs.map((v: SidebarNavigator, i: number) => (
    <Tooltip key={i} content={<span>{v.display}</span>} position={Position.RIGHT}>
      <PaleWhiteHapButton to={v.to} icon={v.icon} />
    </Tooltip>
  ));

  const moreMenu = (
    <Menu>
      <MenuItem icon={IconNames.GRAPH} text="Work Statistics" />
    </Menu>
  );

  const moreButton = (
    <Popover content={moreMenu} position={Position.LEFT}>
      <PaleWhiteButton icon={IconNames.MORE} />
    </Popover>
  );

  return (
    <ContainerSidebar>
      <ContainerLogo>
        <img src={logoIcon} alt="logo" width="40" />
      </ContainerLogo>
      <Spacer />
      <ContainerNav>
        <ButtonGroup
          alignText={Alignment.CENTER}
          minimal={true}
          vertical={true}
          large={true}
        >
          {navButtons}
          {moreButton}
        </ButtonGroup>
      </ContainerNav>
    </ContainerSidebar>
  );
}
