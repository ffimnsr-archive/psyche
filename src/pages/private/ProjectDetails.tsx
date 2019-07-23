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
import { IconNames } from "@blueprintjs/icons";
import BarChart from "@/components/BarChart";

const BREADCRUMBS: BreadcrumbProps[] = [
  { href: "/", icon: IconNames.HOME, text: "Home" },
  { href: "/u/projects", icon: IconNames.LIST, text: "Projects" },
  { href: "/u/project/demo", icon: IconNames.LIST_DETAIL_VIEW, text: "Project: Demo" },
];

const renderCurrentBreadcrumb = ({ text, ...restProps }: BreadcrumbProps) => {
  return <Breadcrumb {...restProps}>{text}</Breadcrumb>;
};

const data = [
  { year: 1980, efficiency: 24.3, sales: 8949000 },
  { year: 1985, efficiency: 27.6, sales: 10979000 },
  { year: 1990, efficiency: 28, sales: 9303000 },
  { year: 1991, efficiency: 28.4, sales: 8185000 },
  { year: 1992, efficiency: 27.9, sales: 8213000 },
  { year: 1993, efficiency: 28.4, sales: 8518000 },
  { year: 1994, efficiency: 28.3, sales: 8991000 },
  { year: 1995, efficiency: 28.6, sales: 8620000 },
  { year: 1996, efficiency: 28.5, sales: 8479000 },
  { year: 1997, efficiency: 28.7, sales: 8217000 },
  { year: 1998, efficiency: 28.8, sales: 8085000 },
  { year: 1999, efficiency: 28.3, sales: 8638000 },
  { year: 2000, efficiency: 28.5, sales: 8778000 },
  { year: 2001, efficiency: 28.8, sales: 8352000 },
  { year: 2002, efficiency: 29, sales: 8042000 },
  { year: 2003, efficiency: 29.5, sales: 7556000 },
  { year: 2004, efficiency: 29.5, sales: 7483000 },
  { year: 2005, efficiency: 30.3, sales: 7660000 },
  { year: 2006, efficiency: 30.1, sales: 7762000 },
  { year: 2007, efficiency: 31.2, sales: 7562000 },
  { year: 2008, efficiency: 31.5, sales: 6769000 },
  { year: 2009, efficiency: 32.9, sales: 5402000 },
  { year: 2010, efficiency: 33.9, sales: 5636000 },
  { year: 2011, efficiency: 33.1, sales: 6093000 },
  { year: 2012, efficiency: 35.3, sales: 7245000 },
  { year: 2013, efficiency: 36.4, sales: 7586000 },
  { year: 2014, efficiency: 36.5, sales: 7708000 },
  { year: 2015, efficiency: 37.2, sales: 7517000 },
  { year: 2016, efficiency: 37.7, sales: 6873000 },
  { year: 2017, efficiency: 39.4, sales: 6081000 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProjectActivityCalendar({ data }: any) {
  return (
    <BarChart data={data} />
    // <ResponsiveCalendar
    //   data={data}
    //   from="2015-03-01"
    //   to="2016-07-12"
    //   emptyColor="#eeeeee"
    //   colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
    //   margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
    //   yearSpacing={40}
    //   monthBorderColor="#ffffff"
    //   dayBorderWidth={2}
    //   dayBorderColor="#ffffff"
    //   legends={[
    //     {
    //       anchor: "bottom-right",
    //       direction: "row",
    //       translateY: 36,
    //       itemCount: 4,
    //       itemWidth: 42,
    //       itemHeight: 36,
    //       itemsSpacing: 14,
    //       itemDirection: "right-to-left",
    //     },
    //   ]}
    // />
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
          <ProjectActivityCalendar data={data} />
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
        <title>Project: Demo</title>
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
