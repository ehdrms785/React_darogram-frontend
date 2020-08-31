import React, { useState } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  caption,
  location,
  createdAt,
}) => {
  const [likeCount_clone, setLikeCount] = useState(likeCount);
  const [isLiked_clone, setIsLiked] = useState(isLiked);
  const comment_input = useInput("");
  console.log("PostContainer");
  console.log(user.avatar);

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCount_clone}
      isLiked={isLiked_clone}
      comments={comments}
      caption={caption}
      location={location}
      createdAt={createdAt}
      comment_input={comment_input}
      setLikeCount={setLikeCount}
      setIsLiked={setIsLiked}
    />
  );
};
PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired,
    }),
  }),
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default PostContainer;
