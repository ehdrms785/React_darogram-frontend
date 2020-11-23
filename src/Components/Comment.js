import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar";
import Date from "./Date";
import FatText from "./FatText";

const UserColumn = styled.div`
  width: 100%;
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

const Caption = styled.span`
  /* font-size: 14px; */
  /* color: inherit; */
  /* font: 1em sans-serif; */
  font-weight: 200;
  display: inline-block;
  /* padding: 5px 0px; */
`;

const Comment = styled.ul`
  display: flex;
  padding: 16px;
  flex-direction: column;
`;
const CommentContent = styled.div`
  display: flex;
`;

const DateAndReply = styled.div``;
const DateContainer = styled.div`
  margin-top: 10px;

  display: inline-block;
  font-size: 12px;
  color: inherit;
  opacity: 0.7;
`;

// ------ Reply Parts

const ReplyContainer = styled.li``;
const ReplyWrapper = styled.ul`
  margin: 4px 0 0 35px;
`;
const ReplyButtonContainer = styled.li``;
const ReplyContent = styled.div``;
const Line = styled.div`
  border-bottom: 1px solid rgba(var(--f52, 142, 142, 142), 1);
  display: inline-block;
  width: 24px;
  vertical-align: middle;
  margin-right: 16px;
`;
const ReplyButton = styled.button`
  background: none;
  border: 0;
  color: ${(props) => props.theme.middleGreyColor};
  font-weight: 700;
`;
const ReplySpan = styled.span``;

const CommentComponent = ({
  avatar,
  username,
  comment,
  comment_input,
  setReply_parent,
  parentCommentId = comment.id,
}) => {
  const [seeReply, setSeeReply] = useState(false);
  const toggleSeeReply = () => {
    setSeeReply(!seeReply);
  };
  return (
    <Comment>
      <CommentContent>
        <AvatarContainer>
          <Avatar size="sm" url={avatar} />
        </AvatarContainer>
        <UserColumn>
          <ProfileNameContainer>
            <Link to={`/profile/${username}`}>
              <ProfileName text={username}></ProfileName>
            </Link>
          </ProfileNameContainer>
          <Caption>{comment.text}</Caption>
          <DateAndReply>
            <DateContainer>
              <time>
                <Date date={comment.createdAt} />
              </time>
            </DateContainer>
            <button
              onClick={() => {
                document.getElementsByTagName("textarea")[0].focus();
                comment_input.setValue("답글: ");
                setReply_parent(parentCommentId);
              }}
            >
              답글 달기
            </button>
          </DateAndReply>
        </UserColumn>
      </CommentContent>

      {comment.reply && comment.reply.length > 0 && (
        <ReplyContainer>
          <ReplyWrapper>
            <ReplyButtonContainer>
              <ReplyContent>
                <ReplyButton onClick={toggleSeeReply}>
                  <Line />

                  <ReplySpan>답글 보기({comment.reply.length}개)</ReplySpan>
                </ReplyButton>
              </ReplyContent>
            </ReplyButtonContainer>
            {seeReply &&
              comment.reply.map((reply) => (
                <CommentComponent
                  key={reply.id}
                  avatar={avatar}
                  username={reply.user.username}
                  comment={reply}
                  parentCommentId={reply.parentComment.id}
                  comment_input={comment_input}
                  setReply_parent={setReply_parent}
                />
              ))}
          </ReplyWrapper>
        </ReplyContainer>
      )}
    </Comment>
  );
};

export default CommentComponent;
