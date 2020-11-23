import { gql } from "apollo-boost";

export const FOLLOW = gql`
  mutation followUser($id: String!) {
    followUser(id: $id)
  }
`;

export const UNFOLLOW = gql`
  mutation unFollowUser($id: String!) {
    unFollowUser(id: $id)
  }
`;
