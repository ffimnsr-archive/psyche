import { gql } from "@apollo/client";

export const BANK_ACCOUNTS_QUERY = gql`
  query _BankAccountsQuery {
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
