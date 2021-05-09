import { ProjectCategory } from "@/models/internals";
import { gql } from "@apollo/client";

export interface ProjectCategoriesQuery {
  internal: {
    projectCategories: ProjectCategory[];
  };
}

export const PROJECT_CATEGORIES_QUERY = gql`
  query _ProjectCategoriesQuery {
    internal {
      projectCategories {
        id
        name
        description
      }
    }
  }
`;
