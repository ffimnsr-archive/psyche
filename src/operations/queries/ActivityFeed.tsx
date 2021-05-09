import { UserClue } from "@/models";
import { gql } from "@apollo/client";

export interface ActivityFeedsQuery {
  public: {
    activityFeeds: UserClue[];
  };
}

export const ACTIVITY_FEEDS_QUERY = gql`
  query _ActivityFeedsQuery {
    public {
      activityFeeds {
        id
      }
    }
  }
`;
