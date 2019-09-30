import * as React from "react";
import styled, { css } from "styled-components";
import {
  Colors,
  Alignment,
  ButtonGroup,
  Position,
  Button,
  Menu,
  MenuItem,
  Popover,
  Tooltip
} from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons"
import { HapButton } from "@/components/HapButton";
import logoIcon from "@/assets/images/logo_icon.png";

const ContainerSidebar = styled.div`
  width: 60px;
  background-color: ${Colors.VIOLET1};
`;

const ContainerLogo = styled.div`
  height: 50px;
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

interface ISidebarNavigator {
  icon: IconName | JSX.Element | false | null | undefined;
  display: string;
  to: string;
}

export const Sidebar = () => {
  const navs: ISidebarNavigator[] = [
    { icon: "home", display: "Home", to: "/" },
    { icon: "notifications", display: "Notifications", to: "notifications" },
    { icon: "envelope", display: "Messages", to: "/messages" },
    { icon: "calendar", display: "Schedules", to: "/schedules" },
    { icon: "settings", display: "Settings", to: "/settings" }
  ];

  const navButtons = navs.map((v: ISidebarNavigator, i: number) => (
    <Tooltip
      key={i}
      content={<span>{v.display}</span>}
      position={Position.RIGHT}
    >
      <PaleWhiteHapButton to={v.to} icon={v.icon} />
    </Tooltip>
  ));

  const moreMenu = (
    <Menu>
      <MenuItem icon="graph" text="Graph" />
    </Menu>
  );

  const moreButton = (
    <Popover content={moreMenu} position={Position.LEFT}>
      <PaleWhiteButton icon="more" />
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
  )
};
