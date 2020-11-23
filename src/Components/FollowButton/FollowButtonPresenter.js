import React from "react";
import Button from "../Button";
export default ({ isFollowing, followButton_onClick, className }) => (
  <Button
    className={className}
    onClick={followButton_onClick}
    text={isFollowing ? "언팔로우" : "팔로우"}
  />
);
