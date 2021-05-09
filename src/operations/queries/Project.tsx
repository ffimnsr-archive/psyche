import { Project } from "@/models";
import { gql } from "@apollo/client";

export interface ProjectsQuery {
  internal: {
    projects: Project[];
  };
}

export const PROJECTS_QUERY = gql`
  query _ProjectsQuery {
    public {
      projects {
        id
        publicCode
        name
        description
        parentOrganization
        managedBy {
          id
        }
        createdBy {
          id
        }
      }
    }
  }
`;
