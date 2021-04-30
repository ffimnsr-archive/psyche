import { gql } from "@apollo/client";

export const INDUSTRIES_QUERY = gql`
  query _IndustriesQuery {
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
