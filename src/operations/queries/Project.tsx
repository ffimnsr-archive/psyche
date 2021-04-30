import { gql } from "@apollo/client";

export const PROJECTS_QUERY = gql`
  query _ProjectsQuery {
    internals {
      countries {
        id
        name
        alpha2
        alpha3
        phoneCode
        currencyCode
      }
    }
  }
`;
