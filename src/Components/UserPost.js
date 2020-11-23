import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HeartFullIcon, FullCommentIcon } from "./Icons";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s linear;
  svg {
    fill: white;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Count = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;

const CountText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;
const UserPost = ({ likeCount, commentCount, file }) => (
  <Container bg={file.url}>
    <Overlay>
      <Count>
        <CountText>
          <HeartFullIcon />
          {likeCount}
        </CountText>
      </Count>
      <Count>
        <CountText>
          <FullCommentIcon />
          {commentCount}
        </CountText>
      </Count>
    </Overlay>
  </Container>
);

UserPost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};

export default UserPost;
