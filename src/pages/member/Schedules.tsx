import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Card, H5, Button, Elevation } from "@blueprintjs/core";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";

const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerMain = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerNewsFeed = styled.div`
  flex: 1 1 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const NewsFeed = styled.div`
  min-width: 600px;
  background-color: #fff;

  & > div.bp3-card:not(:last-child) {
    margin-bottom: 10px;
  }
`;

function Schedules() {
  return (
    <Container>
      <Helmet
        titleTemplate="%s | Open Sesame"
      >
        <title>Schedules</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ContainerNewsFeed>
          <NewsFeed>
            <Card elevation={Elevation.ONE}>
              <H5>Hello</H5>
              <p>Hello</p>
              <Button text="Explore" />
            </Card>
            <Card elevation={Elevation.ONE}>
              <H5>Hello</H5>
              <p>Hello</p>
              <Button text="Explore" />
            </Card>
          </NewsFeed>
        </ContainerNewsFeed>
      </ContainerMain>
    </Container>
  );
}  

export default Schedules;
