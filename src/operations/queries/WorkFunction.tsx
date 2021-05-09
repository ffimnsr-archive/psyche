import { WorkFunction } from "@/models/internals";
import { gql } from "@apollo/client";

export interface WorkFunctionsQuery {
  internal: {
    workFunctions: WorkFunction[];
  };
}

export const WORK_FUNCTIONS_QUERY = gql`
  query _WorkFunctionsQuery {
    internal {
      workFunctions {
        id
        name
        description
      }
    }
  }
`;
