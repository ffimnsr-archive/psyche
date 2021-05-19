import { UserClue } from "@/models";
import { gql } from "@apollo/client";

export interface UserClueExt1 extends UserClue {
  socialLinkedIn: string;
  socialFacebook: string;
  socialGithub: string;
  socialDribble: string;
  socialBlog: string;
}

export interface MyProfileQuery {
  public: {
    profile: UserClueExt1;
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

export interface UserClueExt2 extends UserClue {
  email: string;
  givenName: string;
  familyName: string;
  emailVerified: boolean;
}

export interface RequestProfileQuery {
  public: {
    profile: UserClueExt2;
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
