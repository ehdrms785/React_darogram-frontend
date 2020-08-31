import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFullIcon, HeartEmptyIcon, CommentIcon } from "../Icons";

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
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

const Files = styled.div`
  display: flex;
  justify-content: center;
`;
const File = styled.img`
  min-width: 100%;
  max-width: 100%;
`;
const Button = styled.span`
  cursor: pointer;
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

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
`;
export default ({
  user: { username, avatar },
  files,
  location,
  isLiked,
  likeCount,
  createdAt,
}) => {
  console.log("Post Presenter");
  console.log(avatar);
  return (
    <Post>
      <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
          <FatText text={username}></FatText>
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <Files>
        {files && files.map((file) => <File id={file.id} src={file.url} />)}
      </Files>
      <Meta>
        <Buttons>
          <Button>{isLiked ? <HeartFullIcon /> : <HeartEmptyIcon />}</Button>
          <Button>
            <CommentIcon />
          </Button>
        </Buttons>
        <FatText text={`${likeCount} likes`} />
        <Timestamp>{createdAt}</Timestamp>
      </Meta>
    </Post>
  );
};
