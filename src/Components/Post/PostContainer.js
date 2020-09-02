import React, { useState, useEffect } from "react";
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
  const [currentItem, setCurrentItem] = useState(0);
  const comment_input = useInput("");
  let slideInterval;

  const prevSlide = (e) => {
    if (currentItem <= 0) return;
    const slideContainer = document.querySelector("#FilesContainer");
    const size = slideContainer.clientWidth;
    slideContainer.style.transition = "transform 0.45s ease-in-out";
    slideContainer.style.transform =
      "translateX(" + -size * (currentItem - 1) + "px";
    setCurrentItem(currentItem - 1);
  };
  const nextSlide = (e) => {
    if (currentItem >= files.length - 1) return;
    const slideContainer = document.querySelector("#FilesContainer");
    const size = slideContainer.clientWidth;
    slideContainer.style.transition = "transform 0.45s ease-in-out";
    slideContainer.style.transform =
      "translateX(" + -size * (currentItem + 1) + "px";

    setCurrentItem(currentItem + 1);

    // if (currentItem === totalFiles - 1) {

    //   setTimeout(() => setCurrentItem(0), 3000);
    // } else {
    //   setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    // }
  };
  // useEffect(() => {
  //   nextSlide();
  //   console.log("current:" + currentItem);
  // }, [currentItem]);

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
      currentItem={currentItem}
      prevSlide={prevSlide}
      nextSlide={nextSlide}
      totalFiles={files.length}
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
