import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Helmet } from "react-helmet-async";
// import { Card, H5, Button, Elevation } from "@blueprintjs/core";
import { Calendar, momentLocalizer } from "react-big-calendar";
import {
  ContainerRoot,
  ContainerRootInner,
  Sidebar,
  NavigationHeader,
} from "@/components";

const localizer = momentLocalizer(moment);

const ContainerSchedule = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const events = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },
];

function Schedules(): JSX.Element {
  return (
    <ContainerRoot>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Schedules</title>
      </Helmet>
      <Sidebar />
      <ContainerRootInner>
        <NavigationHeader />
        <ContainerSchedule>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
          />
        </ContainerSchedule>
      </ContainerRootInner>
    </ContainerRoot>
  );
}

export default Schedules;
