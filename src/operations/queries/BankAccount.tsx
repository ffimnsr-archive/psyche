import { BankAccount } from "@/models";
import { gql } from "@apollo/client";

export interface BankAccountsQuery {
  public: {
    bankAccounts: BankAccount[];
  };
}

export const BANK_ACCOUNTS_QUERY = gql`
  query _BankAccountsQuery {
    internal {
      bankAccounts {
        id
        user
        accountName
        accountNo
        bankAddress
        bankBranch
        bankName
        bankSwiftCode
        bankRoutingNumber
      }
    }
  }
`;
