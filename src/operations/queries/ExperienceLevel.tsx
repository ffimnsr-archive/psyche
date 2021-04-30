import { gql } from "@apollo/client";

export const EXPERIENCE_LEVELS_QUERY = gql`
  query _ExperienceLevelsQuery {
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
