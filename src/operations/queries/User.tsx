import { UserClue } from "@/models";
import { gql } from "@apollo/client";

export interface MyProfileQuery {
  public: {
    profile: UserClue;
  };
}

export const MY_PROFILE_QUERY = gql`
  query _MyProfileQuery {
    public {
      profile: myProfile {
        id
        globalId
        publicCode
        username
        avatar
      }
    }
  }
`;

export interface RequestProfileQuery {
  public: {
    profile: {
      id: string;
      globalId: string;
      publicCode: string;
      username: string;
      avatar: string;
      email: string;
      givenName: string;
      familyName: string;
      emailVerified: boolean;
    };
  };
}

export const REQUEST_PROFILE_QUERY = gql`
  query _RequestProfileQuery($publicCode: String!) {
    public {
      profile(publicCode: $publicCode) {
        id
        globalId
        publicCode
        username
        avatar
        email
        givenName
        familyName
        emailVerified
      }
    }
  }
`;
