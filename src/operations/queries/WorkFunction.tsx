import { WorkFunction } from "@/models/internals";
import { gql } from "@apollo/client";

export interface WorkFunctionsQuery {
  internals: {
    workFunctions: WorkFunction[];
  };
}

export const WORK_FUNCTIONS_QUERY = gql`
  query _WorkFunctionsQuery {
    internals {
      workFunctions {
        id
        name
        description
      }
    }
  }
`;
