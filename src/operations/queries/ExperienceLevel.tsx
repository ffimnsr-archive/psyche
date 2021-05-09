import { ExperienceLevel } from "@/models/internals";
import { gql } from "@apollo/client";

export interface ExperienceLevelsQuery {
  internal: {
    experienceLevels: ExperienceLevel[];
  };
}

export const EXPERIENCE_LEVELS_QUERY = gql`
  query _ExperienceLevelsQuery {
    internal {
      experienceLevels {
        id
        name
        description
      }
    }
  }
`;
