import { gql } from "@apollo/client"
import { apolloClient } from "../utils/apolloClient"
import type {
    Profile,
    ProfileQueryRequest,
} from "../generated/types";

const GET_PROFILES = `
query($request: ProfileQueryRequest!) {
  profiles(request: $request) {
    items {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`;

export const getProfileByAddressRequest = (address: string) => {
    return getProfile({ ownedBy: [address], limit: 10 });
};

const getProfilesRequest = (request: ProfileQueryRequest) => {
  return apolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request,
    },
  });
};

const getProfile = async (request: ProfileQueryRequest): Promise<Profile> => {
  const response = await getProfilesRequest(request);
  const profile = response.data.profiles.items[0];
  console.log('profiles: result', profile);
  return profile;
};