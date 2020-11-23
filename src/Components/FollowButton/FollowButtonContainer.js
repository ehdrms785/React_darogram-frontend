import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQuries";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { toast } from "react-toastify";

const FollowButtonContainer = ({ isFollowing, id, className }) => {
  const [isFollowing_clone, setIsFollowing] = useState(isFollowing);
  const followMutation = useMutation(FOLLOW, {
    variables: { id },
  });
  const unfollowMutation = useMutation(UNFOLLOW, {
    variables: { id },
  });
  const followButton_onClick = async () => {
    if (isFollowing_clone === true) {
      try {
        await unfollowMutation();

        setIsFollowing(false);
      } catch {
        toast.error("Can't unfollow");
      }
    } else {
      try {
        await followMutation();
        setIsFollowing(true);
      } catch {
        toast.error("Can't follow");
      }
    }
  };
  return (
    <FollowButtonPresenter
      isFollowing={isFollowing_clone}
      followButton_onClick={followButton_onClick}
      className={className}
    />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
export default FollowButtonContainer;
