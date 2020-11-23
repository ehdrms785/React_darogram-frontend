import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "./FatText";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import Button from "./Button";
const Card = styled.div`
  ${(props) => props.theme.whiteBox};
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  padding: 20px;
`;
// For styling to Avatar Component
const ExtendAvatar = styled(Avatar)`
  margin: 15px 0px;
`;

const ExtendLink = styled(Link)`
  color: inherit;
  margin-bottom: 15px;
`;
const UserCard = ({ id, username, url, isFollowing, isSelf }) => (
  <Card>
    <ExtendAvatar url={url} size={"md"} />
    <ExtendLink to={`/profile/${username}`}>
      <FatText text={username} />
    </ExtendLink>
    {isSelf ? (
      <Link to={`profile/${username}`}>
        <Button text={"내 프로필"} />
      </Link>
    ) : (
      <FollowButton id={id} isFollowing={isFollowing} />
    )}
  </Card>
);

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired,
};

export default UserCard;
