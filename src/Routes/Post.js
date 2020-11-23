import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import Helmet from "react-helmet";
import { FULLPOST_QUERY } from "../Components/Post/PostQueries";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 69vh;
  max-height: 90vh;
  max-width: 935px;
`;

export default ({
  match: {
    params: { postId },
  },
}) => {
  const { data, loading } = useQuery(FULLPOST_QUERY, {
    variables: { postId },
    // notifyOnNetworkStatusChange: true,
    // partialRefetch: true,
  });

  // console.log(data, loading);
  // console.log("Feed Checking ~~");
  if (!loading) {
    const { seeFullPost: post } = data;
    return (
      <Wrapper>
        <Helmet>
          <title> POST | Prismagram</title>
        </Helmet>
        {loading && <Loader />}

        {!loading && data && data.seeFullPost && (
          <Post
            key={post.id}
            type={2}
            id={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            location={post.location}
            caption={post.caption}
            createdAt={post.createdAt}
          />
        )}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
};
