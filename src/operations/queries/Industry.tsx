import { Industry } from "@/models/internals";
import { gql } from "@apollo/client";

export interface IndustriesQuery {
  internal: {
    industries: Industry[];
  };
}

export const INDUSTRIES_QUERY = gql`
  query _IndustriesQuery {
    internals {
      industries {
        id
        name
        description
      }
    }
  }
`;
