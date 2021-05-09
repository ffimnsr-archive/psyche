import { UserClue } from "@/models";
import { gql } from "@apollo/client";

export interface NotificationsQuery {
  public: {
    notifications: UserClue[];
  };
}

export const NOTIFICATIONS_QUERY = gql`
  query _NotificationsQuery {
    public {
      notifications {
        id
      }
    }
  }
`;
