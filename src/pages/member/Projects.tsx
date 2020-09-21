import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar, NavigationHeader } from "@/components";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

const PROJECTS_QUERY = gql`
  query _projects {
    profile: myProfile {
      id
      email
      publicId
      socialSecurityNumber
      workPreference {
        id
        interests
        projectLimit
      }
      sitePreference {
        id
        optInMarketing
        optInUsageStat
        experimentalFeatures
        supportPin
      }
      clue {
        id
        firstName
        lastName
        gender
        birthDate
        image
        bio
        phoneNumber
        isReady
        country {
          id
          name
        }
      }
    }
  }
`;

const Container = styled.main`
  min-height: 100vh;
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

const ContainerProjects = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function JoinedProjects(): JSX.Element {
  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>JOINED PROJECTS</H5>
        <ResponsiveTable condensed={true} bordered={true}>
          <tbody>
            <tr>
              <td>Hello</td>
            </tr>
          </tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

// function MyProjects(): JSX.Element {
//   return (
//     <>
//       <Card elevation={Elevation.ONE}>
//         <H5>My Hosted Projects</H5>
//         <ResponsiveTable condensed={true} bordered={true}>
//           <tbody>
//             <tr>
//               <td>Hello</td>
//             </tr>
//           </tbody>
//         </ResponsiveTable>
//       </Card>
//     </>
//   );
// }

function ProjectsContent(): JSX.Element {
  // FZ_TODO: process results
  useQuery(PROJECTS_QUERY);

  return (
    <ContainerProjects>
      <JoinedProjects />
      {/* <MyProjects /> */}
    </ContainerProjects>
  );
}

function Projects(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Projects</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <ProjectsContent />
      </ContainerMain>
    </Container>
  );
}

export default Projects;
