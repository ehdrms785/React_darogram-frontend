import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import Helmet from "react-helmet";
import useInfiniteScroll from "../Hooks/useInfiniteScroll";

const FEED_QUERY = gql`
  query seeFeed($startPoint: Int) {
    seeFeed(startPoint: $startPoint) {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
  const target = useRef(null);
  const [startPoint, setStartPoint] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // const { data, loading, onLoadMore } = useInfiniteScroll();
  const { data, loading, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      startPoint: 0,
    },
  });
  // Checking first query data and then set startPoint
  if (!loading && data && startPoint === 0) {
    setStartPoint(data.seeFeed.length);
  }
  useEffect(() => {
    if (!loading) {
      const observer = useInfiniteScroll({
        target: target.current,
        threshold: 0,
        rootMargin: "0px 0px 1200px 0px",
        onIntersect: async ([{ isIntersecting }]) => {
          if (isScroll) return;
          if (isIntersecting && hasMore) {
            // console.log("StartPoint : " + startPoint);
            try {
              setIsScroll(true);
              await fetchMore({
                variables: {
                  startPoint,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (fetchMoreResult?.seeFeed?.length <= 0) {
                    setHasMore(false);
                    return prev;
                  }

                  setStartPoint(startPoint + fetchMoreResult.seeFeed.length);
                  return Object.assign({}, prev, {
                    seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed],
                  });
                },
              });
              setIsScroll(false);
            } catch {
              console.log("에러발생 발생 발생");
            }
          }
        },
      });
      return () => {
        console.log("옵저브해제!");
        observer.unobserve(target.current);
      };
    }
  }, [startPoint, isScroll, loading]);

  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && <Loader />}

      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            location={post.location}
            caption={post.caption}
            createdAt={post.createdAt}
            isScroll={isScroll}
          />
        ))}
      <div>{isScroll && <Loader />}</div>
      <div ref={target} id="endPoint" style={{ height: "100px" }}></div>
    </Wrapper>
  );
};
