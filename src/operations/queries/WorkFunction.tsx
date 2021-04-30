import { gql } from "@apollo/client";

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
