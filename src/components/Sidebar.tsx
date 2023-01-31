import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  Alignment,
  AnchorButton,
  Button,
  ButtonGroup,
  Colors,
  Menu,
  MenuItem,
  Position,
} from "@blueprintjs/core";
import { Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { IconName, IconNames } from "@blueprintjs/icons";
import logoIcon from "../assets/images/logo_icon.png";

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

const PaleWhiteAnchorButton = styled(AnchorButton)`
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

/**
 * This component is the sidebar displayed at the
 * left-hand side of the page.
 * @returns React component
 */
export function Sidebar(): JSX.Element {
  const navigate = useNavigate();

  const navs: SidebarNavigator[] = [
    { icon: IconNames.HOME, display: "Home", to: "/" },
    // { icon: IconNames.SATELLITE, display: "Feed", to: "/u/feed" },
    // { icon: IconNames.NOTIFICATIONS, display: "Notifications", to: "/u/notifications" },
    { icon: IconNames.PROJECTS, display: "Projects", to: "/user/projects" },
    { icon: IconNames.TIMELINE_EVENTS, display: "Schedules", to: "/user/schedules" },
    { icon: IconNames.BANK_ACCOUNT, display: "Wallet", to: "/user/wallet" },
  ];

  const navButtons = navs.map((v: SidebarNavigator, i: number) => (
    <Tooltip2 key={i} content={<span>{v.display}</span>} placement={Position.RIGHT}>
      <PaleWhiteAnchorButton
        onClick={() => navigate(v.to)}
        href="javascript:;"
        icon={v.icon}
      />
    </Tooltip2>
  ));

  const moreMenu = (
    <Menu>
      <MenuItem
        onClick={() => navigate("/user/stats")}
        icon={IconNames.CHART}
        text="Work Statistics"
      />
      <MenuItem
        onClick={() => navigate("/user/profile")}
        icon={IconNames.ID_NUMBER}
        text="My Profile"
      />
      <MenuItem
        onClick={() => navigate("/user/issues")}
        icon={IconNames.VIRUS}
        text="Project Issues"
      />
      <MenuItem onClick={() => navigate("/help")} icon={IconNames.HELP} text="Help" />
    </Menu>
  );

  const moreButton = (
    <Popover2 content={moreMenu} placement={Position.LEFT}>
      <PaleWhiteButton icon={IconNames.MORE} />
    </Popover2>
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
