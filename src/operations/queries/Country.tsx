import { gql } from "@apollo/client";

export const COUNTRIES_QUERY = gql`
  query _CountriesQuery {
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
