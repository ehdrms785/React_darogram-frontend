import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";

import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import UserPost from "../../Components/UserPost";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  width: 80%;
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
  margin-bottom: 40px;
`;

const HeaderColum = styled.div`
  &:first-child {
    margin-right: 30px;
    flex-grow: 1;
  }
  &:last-child {
    flex-grow: 2;
  }
`;
const ProfileAvatar = styled(Avatar)`
  margin: 0 auto;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;
const Username = styled.span`
  font-size: 26px;
  margin-bottom: 10px;
  display: block;
`;
const FullName = styled(FatText)`
  font-size: 14px;
`;
const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Bio = styled.p`
  margin: 10px 0px;
  /* white-space: pre/pre-line/pre-wrap; */
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export default ({ data, loading, logOut }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;

    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColum>
            <ProfileAvatar size="xl" url={avatar} />
          </HeaderColum>
          <HeaderColum>
            <UsernameRow>
              <Username>{username}</Username>
              {isSelf ? (
                <Button onClick={logOut} text={"로그아웃"} />
              ) : (
                <FollowButton id={id} isFollowing={isFollowing} />
              )}
            </UsernameRow>
            <Counts>
              <Count>
                게시물 <FatText text={postsCount.toString()} />
              </Count>
              <Count>
                팔로워 <FatText text={followersCount.toString()} />
              </Count>
              <Count>
                팔로우 <FatText text={followingCount.toString()} />
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>
              {bio.split("\\n").map((line) => {
                return (
                  <span key={id}>
                    {line} <br />
                  </span>
                );
              })}
            </Bio>
            {/* <span dangerouslySetInnerHTML={{ __html: new_bio }}></span> */}
          </HeaderColum>
        </Header>
        <Posts>
          {posts &&
            posts.map((post, index) => (
              <Link key={index} to={`/p/${post.id}`}>
                <UserPost
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  file={post.files[0]}
                />
              </Link>
            ))}
        </Posts>
      </Wrapper>
    );
  }
};
