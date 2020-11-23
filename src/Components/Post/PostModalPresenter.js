import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import Date from "../Date";
import FatText from "../FatText";
import FollowButton from "../FollowButton";
import TextareaAutosize from "react-autosize-textarea";
import CommentComponent from "../Comment";

import {
  CommentIcon,
  HeartEmptyIcon,
  HeartFullIcon,
  LeftArrowIcon,
  PaperPlaneIcon,
  RightArrowIcon,
} from "../Icons";
import Loader from "../Loader";

const PostContainer = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
`;

const SlideContainer = styled.div`
  position: relative;
  overflow: hidden;
  min-width: 598px;
  max-width: 598px;
`;
const FilesContainer = styled.div`
  /* width: 100%; */
  height: 100%;
  min-width: 598px;
  max-width: 598px;
`;
const Files = styled.div`
  display: flex;
  max-height: 598px;
`;
const File = styled.img`
  min-width: 598px;
  max-width: 598px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;
const PrevButton = styled.button`
  position: absolute;
  background: 0 0;
  border: 0;
  outline: none;
  top: 50%;
  left: 0;
  display: ${(props) => (props.isFirst ? "none" : "")};
`;
const NextButton = styled.button`
  position: absolute;
  border: 0;
  background: 0 0;

  outline: none;
  top: 50%;
  right: 0;
  display: ${(props) => (props.isLastItem ? "none" : "")};
`;

const MetaWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const MetaContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: ${(props) => props.theme.thinBorder};
`;
const UserColumn = styled.div`
  margin-left: 10px;
`;
const AvatarContainer = styled.div`
  display: "block";
`;

const ProfileNameContainer = styled.h2`
  display: inline-block;
`;
const ProfileName = styled(FatText)`
  color: ${(props) => props.theme.blackColor};
  margin-right: 5px;
`;

const FOLLOW_BUTTON = styled(FollowButton)`
  background-color: white;
  /* For Text Lining */
  color: ${(props) => props.theme.blueColor};
  margin-top: 5px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 63px);
`;
const ContentList = styled.ul`
  width: calc(100% + 15px);
  height: calc(100% - 160px);
  overflow-y: scroll;
  padding: 16px 12px;
  order: 1;
`;
const CommentShowAllButton = styled.button`
  border: 0;
  width: 100%;
  background-color: ${(props) => props.theme.lightGreyColor};
  padding: 2.5px;
`;
const PostContent = styled.div`
  display: flex;
  padding: 16px;
`;
const Caption = styled.span`
  /* font-size: 14px; */
  /* color: inherit; */
  /* font: 1em sans-serif; */
  font-weight: 200;
  display: inline-block;
  /* padding: 5px 0px; */
`;

const DateAndReply = styled.div``;
const DateContainer = styled.div`
  margin-top: 10px;

  display: inline-block;
  font-size: 12px;
  color: inherit;
  opacity: 0.7;
`;

const IconSection = styled.section`
  border-top: ${(props) => props.theme.thinBorder};
  padding-left: 16px;
  padding-top: 4px;
  order: 2;
`;
const IconSpan = styled.span`
  display: inline-block;
`;
const IconButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  background: 0;
  outline: none;
  border: 0;
`;
const LikeSection = styled.section`
  order: 3;
  padding-left: 20px;
`;

const LikeContainer = styled.div`
  strong {
    font-weight: 700;
  }
`;
const DateSection = styled.section`
  padding-left: 20px;
  order: 4;
  margin-bottom: 10px;
`;
const NewCommentSection = styled.section`
  ${(props) => (props.networkStatus ? "pointer-events:none" : "")};
  max-height: 72px;
  min-height: 67px;
  border-top: 1px solid black;
  display: flex;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100% + 14px);
  order: 5;
  &:disabled {
    /* background-color: ${(props) => props.theme.darkGreyColor}; */
    background-color: red;
  }
`;
const NewCommentWrapper = styled.div`
  width: calc(100% - 14px);
  position: relative;
`;

const MyLoader = styled(Loader)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
`;
const Textarea = styled(TextareaAutosize)`
  border: none;
  resize: none;
  width: 100%;
  font-size: 14px;
  padding: 5px 10px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.25;
  }
`;

export default ({
  postId,
  caption,
  user: { id, isFollowing, username, avatar, isSelf },
  files,
  isLiked,
  likeCount,
  comments,
  createdAt,
  comment_input,
  currentItem,
  prevSlide,
  nextSlide,
  totalFiles,
  toggleLike,
  onKeyDown,
  reply_parent,
  setReply_parent,
  textarea_Interval,
  commentShowAll,
  setCommentShowAll,
}) => {
  return (
    <PostContainer>
      <SlideContainer>
        <FilesContainer id={postId}>
          <Files>
            {files &&
              files.map((file, index) => (
                <File
                  key={index}
                  id={file.id}
                  src={file.url}
                  showing={index === currentItem}
                />
              ))}
          </Files>
        </FilesContainer>
        <PrevButton
          isFirst={currentItem === 0}
          onClick={() => prevSlide(postId)}
        >
          <LeftArrowIcon />
        </PrevButton>

        <NextButton
          isLastItem={currentItem === totalFiles - 1}
          onClick={() => nextSlide(postId)}
        >
          <RightArrowIcon />
        </NextButton>
      </SlideContainer>
      <MetaWrapper>
        <MetaContainer>
          <Header>
            <Avatar size="sm" url={avatar} />
            <UserColumn>
              <Link to={`/profile/${username}`}>
                <ProfileName text={username}></ProfileName>
              </Link>
            </UserColumn>
            {!isSelf && <FOLLOW_BUTTON id={id} isFollowing={isFollowing} />}
          </Header>
          <ContentContainer>
            <ContentList id="contentList">
              <PostContent>
                <AvatarContainer>
                  <Avatar size="sm" url={avatar} />
                </AvatarContainer>
                <UserColumn>
                  <ProfileNameContainer>
                    <Link to={`/profile/${username}`}>
                      <ProfileName text={username}></ProfileName>
                    </Link>
                  </ProfileNameContainer>
                  <Caption>{caption}</Caption>
                  <DateAndReply>
                    <DateContainer>
                      <time>
                        <Date date={createdAt} />
                      </time>
                    </DateContainer>
                  </DateAndReply>
                </UserColumn>
              </PostContent>

              {/* Comment Lists */}
              {comments &&
                comments.map((comment, index) => {
                  if (!commentShowAll && index > 11) return;
                  return (
                    <CommentComponent
                      key={comment.id}
                      avatar={avatar}
                      username={comment.user.username}
                      comment={comment}
                      comment_input={comment_input}
                      setReply_parent={setReply_parent}
                    />
                  );
                })}
              {!commentShowAll && comments && comments.length > 11 && (
                <CommentShowAllButton onClick={() => setCommentShowAll(1)}>
                  댓글 모두 보기
                </CommentShowAllButton>
              )}
            </ContentList>
            <IconSection>
              <IconSpan>
                <IconButton onClick={toggleLike}>
                  {isLiked ? <HeartFullIcon /> : <HeartEmptyIcon />}
                </IconButton>
              </IconSpan>
              <IconSpan>
                <IconButton
                  onClick={() =>
                    document.getElementsByTagName("textarea")[0].focus()
                  }
                >
                  <CommentIcon />
                </IconButton>
              </IconSpan>
              <IconSpan>
                <IconButton>
                  <PaperPlaneIcon />
                </IconButton>
              </IconSpan>
            </IconSection>
            <LikeSection>
              <LikeContainer>
                <span>
                  <strong>{likeCount}명</strong>이 이 글을 좋아합니다
                </span>
              </LikeContainer>
            </LikeSection>
            <DateSection>
              <DateContainer>
                <time>
                  <Date date={createdAt} />
                </time>
              </DateContainer>
            </DateSection>

            <NewCommentSection id="commentBox">
              <NewCommentWrapper>
                {textarea_Interval === 1 && <MyLoader />}
                <Textarea
                  placeholder={"댓글 달기..."}
                  value={comment_input.value}
                  onChange={comment_input.onChange}
                  onKeyDown={(e) => onKeyDown({ e, commentId: reply_parent })}
                />
              </NewCommentWrapper>
            </NewCommentSection>
          </ContentContainer>
        </MetaContainer>
      </MetaWrapper>
    </PostContainer>
  );
};
