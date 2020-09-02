import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFullIcon, HeartEmptyIcon, CommentIcon } from "../Icons";
import TextareaAutosize from "react-autosize-textarea";
import { LeftArrowIcon, RightArrowIcon } from "../Icons";
const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
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

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  border-top: 1px solid black;
  padding-top: 15px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.25;
  }
`;

const PrevButton = styled.button`
  position: absolute;
  border: 0;
  background: 0 0;
  border: 0;
  top: 50%;
  left: 0;
  display: ${(props) => (props.isFirst ? "none" : "")};
`;
const NextButton = styled.button`
  position: absolute;
  border: 0;
  background: 0 0;

  border: 0;
  top: 50%;
  right: 0;
  display: ${(props) => (props.isLastItem ? "none" : "")};
`;

export default ({
  user: { username, avatar },
  files,
  location,
  isLiked,
  likeCount,
  createdAt,
  comment_input,
  currentItem,
  prevSlide,
  nextSlide,
  totalFiles,
}) => {
  // console.log("Post Presenter");
  console.log(currentItem);
  return (
    <Post>
      <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
          <FatText text={username}></FatText>
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <SlideContainer>
        <FilesContainer id="FilesContainer">
          <Files>
            {files &&
              files.map((file, index) => (
                <File
                  id={file.id}
                  src={file.url}
                  showing={index === currentItem}
                />
              ))}
          </Files>
        </FilesContainer>
        <PrevButton isFirst={currentItem === 0} onClick={() => prevSlide()}>
          <LeftArrowIcon />
        </PrevButton>
        <NextButton
          isLastItem={currentItem === totalFiles - 1}
          onClick={() => nextSlide()}
        >
          <RightArrowIcon />
        </NextButton>
      </SlideContainer>

      <Meta>
        <Buttons>
          <Button>{isLiked ? <HeartFullIcon /> : <HeartEmptyIcon />}</Button>
          <Button>
            <CommentIcon />
          </Button>
        </Buttons>
        <FatText text={`좋아요 ${likeCount}개`} />
        <Timestamp>{createdAt}</Timestamp>
      </Meta>
      <Textarea placeholder={"댓글 달기..."} {...comment_input} />
    </Post>
  );
};
