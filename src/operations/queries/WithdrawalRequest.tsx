import { WithdrawalRequest } from "@/models";
import { gql } from "@apollo/client";

export interface WithdrawalRequestsQuery {
  public: {
    withdrawalRequests: WithdrawalRequest[];
  };
}

export const WITHDRAWAL_REQUESTS_QUERY = gql`
  query _WithdrawalRequestsQuery {
    public {
      withdrawalRequests {
        id
        userId
        amount
        referenceNo
        remarks
        approvedById
        approvedAt
        status
      }
    }
  }
`;
