import { gql } from "@apollo/client";

export const MY_PROFILE_QUERY = gql`
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
