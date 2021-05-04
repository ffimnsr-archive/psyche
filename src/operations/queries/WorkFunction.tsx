import { gql } from "@apollo/client";

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
