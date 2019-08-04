import * as React from "react";
import styled from "styled-components";
import {
  Colors,
  Alignment,
  ButtonGroup,
  Button,
  Position,
  Tooltip
} from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
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

const PaleWhiteButton = styled(Button)`
  & > span > svg {
    fill: ${Colors.WHITE} !important;
  }
`;

interface ISidebarNavigator {
  icon: IconName | JSX.Element | false | null | undefined;
  display: string;
}

export const Sidebar = () => {
  let navs: ISidebarNavigator[] = [
    { icon: "home", display: "Home" },
    { icon: "notifications", display: "Notifications" },
    { icon: "envelope", display: "Messages" },
    { icon: "calendar", display: "Schedules" },
    { icon: "settings", display: "Settings" },
    { icon: "more", display: "More" }
  ];

  let navButtons = navs.map((v: ISidebarNavigator, i: number) => (
    <Tooltip
      key={i}
      content={<span>{v.display}</span>}
      position={Position.RIGHT}
    >
      <PaleWhiteButton icon={v.icon} />
    </Tooltip>
  ));

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
        </ButtonGroup>
      </ContainerNav>
    </ContainerSidebar>
  )
};
