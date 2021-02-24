import { gql } from "@apollo/client";

export const WORK_FUNCTIONS_QUERY = gql`
  query _WorkFunctionsQuery {
    workFunction {
      workFunctions {
        id
        name
        description
      }
    }
  }
`;
