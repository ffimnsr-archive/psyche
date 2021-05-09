import React from "react";
import log from "loglevel";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  Breadcrumbs,
  Card,
  Elevation,
  H5,
  BreadcrumbProps,
} from "@blueprintjs/core";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";
import { ResponsiveCalendar } from "@nivo/calendar";
import { DemoCalendarData } from "@/seeds";
import { IconNames } from "@blueprintjs/icons";

const BREADCRUMBS: BreadcrumbProps[] = [
  { href: "/", icon: IconNames.HOME, text: "Home" },
  { href: "/u/projects", icon: IconNames.LIST, text: "Projects" },
  { href: "/u/project/demo", icon: IconNames.LIST_DETAIL_VIEW, text: "Project Details" },
];

const renderCurrentBreadcrumb = ({ text, ...restProps }: BreadcrumbProps) => {
  return <Breadcrumb {...restProps}>{text}</Breadcrumb>;
};

function ProjectActivityCalendar({ data }: any) {
  return (
    <ResponsiveCalendar
      data={data}
      from="2015-03-01"
      to="2016-07-12"
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
}

function ProjectDetailsContent(): JSX.Element {
  return (
    <div style={{ margin: "20px" }}>
      <Breadcrumbs
        currentBreadcrumbRenderer={renderCurrentBreadcrumb}
        items={BREADCRUMBS}
      />
      <div style={{ marginBottom: "1rem" }} />
      <Card elevation={Elevation.ONE}>
        <H5>Project Activity</H5>
        <div style={{ height: "400px" }}>
          <ProjectActivityCalendar data={DemoCalendarData} />
        </div>
        <H5>Project Issues</H5>
      </Card>
    </div>
  );
}

function ProjectDetailsView(): JSX.Element {
  log.trace("ProjectDetailsView: rendering component");

  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Project Details</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ProjectDetailsContent />
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default ProjectDetailsView;
