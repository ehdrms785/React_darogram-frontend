import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import UserPost from "../../Components/UserPost";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  height: 70vh;
  text-align: center;
`;

const Section = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  margin-bottom: 50px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  if (searchTerm === undefined) {
    return <Wrapper>{<FatText text={"Search for something"} />}</Wrapper>;
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if ((data && data.searchUser) || data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text={"No user found"} />
          ) : (
            data.searchUser.map((user, index) => (
              <UserCard
                key={index}
                id={user.id}
                username={user.username}
                url={user.avatar}
                isFollowing={user.isFollowing}
                isSelf={user.isSelf}
              />
            ))
          )}
        </Section>
        <Section>
          {data.searchPost.length === 0 ? (
            <FatText text={"No Posts found"} />
          ) : (
            data.searchPost.map((post, index) => (
              <Link to={`/p/${post.id}`}>
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
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
};
export default SearchPresenter;
