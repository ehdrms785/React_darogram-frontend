import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFullIcon, HeartEmptyIcon, CommentIcon } from "../Icons";
import TextareaAutosize from "react-autosize-textarea";
import { LeftArrowIcon, RightArrowIcon } from "../Icons";
import { Link } from "react-router-dom";
import Date from "../Date";
import Loader from "../Loader";
import CommentComponent from "../Comment";
const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
  user-select: none;
  a {
    color: inherit;
  }
`;
const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;
const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const SlideContainer = styled.div`
  overflow: hidden;
  position: relative;
`;
const FilesContainer = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;

  position: relative;
`;
const Files = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const File = styled.img`
  min-width: 100%;
  max-width: 100%;
  max-height: 600px;
  /* width: 100%;
  height: 600px;
  position: absolute;
  top: 0; */
  background-image: url(${(props) => props.src}});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;
const Button = styled.span`
  cursor: pointer;
`;

const SeeMoreButton = styled.button`
  outline: 0;
  background: none;
  border: none;
  color: ${(props) => props.theme.lightGreyClolor};
  font-size: 14px;
  font-weight: 550;
  padding: 0;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const DateContainer = styled.div`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin-top: 10px;
`;

const CommentContainer = styled.ul`
  margin-top: 10px;
  ${SeeMoreButton} {
    margin-bottom: 8px;
  }
`;
const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
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

const NewCommentSection = styled.section`
  max-height: 72px;
  min-height: 56px;
  border-top: 1px solid black;
  display: flex;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100% + 14px);
`;
const NewCommentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  resize: none;
  width: calc(100% - 14px);
  font-size: 14px;
  padding: 5px 10px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.25;
  }
`;

const CaptionColumn = styled.div`
  margin-top: 10px;
`;
const Caption = styled.span`
  /* font-size: 14px; */
  /* color: inherit; */
  /* font: 1em sans-serif; */
  font-weight: 200;
  display: inline-block;
  /* padding: 5px 0px; */
`;

const ProfileNameContainer = styled.h2`
  display: inline-block;
`;

const ProfileName = styled(FatText)`
  color: ${(props) => props.theme.blackColor};
  margin-right: 5px;
`;

export default ({
  postId,
  user: { username, avatar },
  files,
  location,
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
  caption,
  captionShowAll,
  setCaptionShowAll,
}) => {
  return (
    <>
      <Post>
        <Header>
          <Avatar size="sm" url={avatar} />
          <UserColumn>
            <Link to={`/profile/${username}`}>
              <FatText text={username}></FatText>
              <Location>{location}</Location>
            </Link>
          </UserColumn>
        </Header>
        <SlideContainer>
          <FilesContainer id={postId}>
            <Files>
              {files &&
                files.map((file, index) => (
                  <File
                    key={file.id}
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

        <Meta>
          <Buttons>
            <Button onClick={toggleLike}>
              {isLiked ? <HeartFullIcon /> : <HeartEmptyIcon />}
            </Button>
            <Button>
              <Link to={`/p/${postId}`}>
                <CommentIcon />
              </Link>
            </Button>
          </Buttons>
          <FatText text={`좋아요 ${likeCount}개`} />
          <CaptionColumn>
            <ProfileNameContainer>
              <Link to={`/profile/${username}`}>
                <ProfileName text={username}></ProfileName>
              </Link>
            </ProfileNameContainer>
            <Caption>
              {!captionShowAll ? (
                caption.length > 50 ? (
                  <span>
                    {caption.slice(0, 50)}...{" "}
                    <SeeMoreButton onClick={() => setCaptionShowAll(1)}>
                      더 보기
                    </SeeMoreButton>
                  </span>
                ) : (
                  <span>{caption}</span>
                )
              ) : (
                <span>{caption}</span>
              )}
            </Caption>
          </CaptionColumn>

          {comments && (
            <CommentContainer>
              {comments.length > 2 && (
                <Link to={`/p/${postId}`}>
                  <SeeMoreButton>
                    댓글 {comments.length}개 모두 보기{" "}
                  </SeeMoreButton>
                </Link>
              )}

              {comments.map((comment, index) => {
                if (index < 2) {
                  return (
                    <Comment key={comment.id}>
                      <FatText text={comment.user.username} />
                      {comment.text}
                      {/* {console.log(comment.text.length)} */}
                    </Comment>
                  );
                } else return null;
              })}
              {/* {selfComments.map((comment) => (
              <Comment>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))} */}
            </CommentContainer>
          )}
          <DateContainer>
            <time>
              <Date date={createdAt} />
            </time>
          </DateContainer>
        </Meta>
        <NewCommentSection>
          <NewCommentWrapper>
            <Textarea
              placeholder={"댓글 달기..."}
              value={comment_input.value}
              onChange={comment_input.onChange}
              onKeyDown={(e) => onKeyDown({ e })}
            />
          </NewCommentWrapper>
        </NewCommentSection>
      </Post>
    </>
  );
};
