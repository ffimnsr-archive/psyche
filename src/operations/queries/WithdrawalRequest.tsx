import { gql } from "@apollo/client";

export const WITHDRAWAL_REQUESTS_QUERY = gql`
  query _WithdrawalRequestsQuery {
    withdrawalRequest {
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
