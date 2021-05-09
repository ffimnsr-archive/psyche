import { Rank } from "@/models/internals";
import { gql } from "@apollo/client";

export interface _RanksQuery {
  internal: {
    ranks: Rank[];
  };
}

export const RANKS_QUERY = gql`
  query _RanksQuery {
    internal {
      ranks {
        id
        name
        description
      }
    }
  }
`;
