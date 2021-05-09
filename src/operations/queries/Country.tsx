import { Country } from "@/models/internals";
import { gql } from "@apollo/client";

export interface CountriesQuery {
  internal: {
    countries: Country[];
  };
}

export const COUNTRIES_QUERY = gql`
  query _CountriesQuery {
    internal {
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
