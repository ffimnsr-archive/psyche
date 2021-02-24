import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
  query _MyProfileQuery {
    userClue {
      myProfile {
        id
        globalId
        publicCode
        username
        avatar
      }
    }
  }
`;
