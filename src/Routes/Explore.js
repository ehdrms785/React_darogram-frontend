import React from "react";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import FatText from "../Components/FatText";
import UserPost from "../Components/UserPost";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";

const EXPLORE_QUERY = gql`
  {
    explore {
      id
      files {
        url
      }
      likeCount
      commentCount
      user {
        id
        avatar
        username
        isFollowing
        isSelf
      }
    }
  }
`;

const ExploreContainer = styled.div`
  height: 70vh;
  text-align: center;
`;
const Section = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 290px);
  grid-template-rows: 290px;
  grid-auto-rows: 290px;
  margin-bottom: 50px;
`;
const Explore = () => {
  const { data, loading } = useQuery(EXPLORE_QUERY);
  if (!loading) {
    console.log("Explore");
    console.log(data);
    return (
      <ExploreContainer>
        <Section>
          {data && data.explore && data.explore.length === 0 ?  (
            <FatText text={"There are no posts!"} />
          ) : (
            data?.explore?.map((post, index) => (
              <Link key={index} to={`/p/${post.id}`}>
                <UserPost
                  key={index}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  file={post.files[0]}
                />
              </Link>
            ))
          )}
        </Section>
      </ExploreContainer>
    );
  } else {
    return (
      <ExploreContainer>
        <Loader />
      </ExploreContainer>
    );
  }
};

export default Explore;
