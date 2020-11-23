import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        id
        username
        avatar
      }
      reply {
        id
        text
        user {
          username
        }
        parentComment {
          id
        }
        createdAt
      }
      createdAt
    }
  }
`;

export const ADD_RECOMMENT = gql`
  mutation addRecomment($commentId: String!, $text: String!) {
    addRecomment(commentId: $commentId, text: $text) {
      id
      text
      user {
        username
      }
      parentComment {
        id
      }
      createdAt
    }
  }
`;

export const FULLPOST_QUERY = gql`
  query seeFullPost($postId: String!) {
    seeFullPost(postId: $postId) {
      id
      user {
        id
        avatar
        username
        isFollowing
        isSelf
      }
      files {
        id
        url
      }
      caption
      likeCount
      isLiked

      comments {
        id
        text
        user {
          id
          username
        }
        reply {
          id
          text
          user {
            username
          }
          parentComment {
            id
          }
          createdAt
        }
        createdAt
      }
      createdAt
    }
  }
`;
