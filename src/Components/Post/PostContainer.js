import React, { useState } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { TOGGLE_LIKE, ADD_COMMENT, ADD_RECOMMENT } from "./PostQueries";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import PostModalPresenter from "./PostModalPresenter";
let toggleLike_Interval = 0;
const TYPE = {
  DEFAULT: 1,
  POPUP: 2,
};

const PostContainer = ({
  type = TYPE.DEFAULT,
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
  const [captionShowAll, setCaptionShowAll] = useState(0);
  const [commentShowAll, setCommentShowAll] = useState(0);
  const [reply_parent, setReply_parent] = useState(0);
  const [textarea_Interval, setTextarea_Interval] = useState(0);

  const comment_input = useInput("");
  const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });
  const addCommentMutation = useMutation(ADD_COMMENT, {
    variables: {
      postId: id,
      text: comment_input.value,
    },
  });
  const addRecommentMutation = useMutation(ADD_RECOMMENT);

  const prevSlide = (id) => {
    if (currentItem <= 0) return;
    // Search FileContainer with postId (I put postId for id of FileContainer)
    const slideContainer = document.getElementById(id);
    const size = slideContainer.clientWidth;
    slideContainer.style.transition = "transform 0.45s ease-in-out";
    slideContainer.style.transform =
      "translateX(" + -size * (currentItem - 1) + "px";
    setCurrentItem(currentItem - 1);
  };
  const nextSlide = (id) => {
    if (currentItem >= files.length - 1) return;
    const slideContainer = document.getElementById(id);
    const size = slideContainer.clientWidth;
    slideContainer.style.transition = "transform 0.45s ease-in-out";
    slideContainer.style.transform =
      "translateX(" + -size * (currentItem + 1) + "px";

    setCurrentItem(currentItem + 1);
  };

  const toggleLike = () => {
    if (toggleLike_Interval === 1) {
      toast.error("좋아요 버튼은 연속해서 누를 수 없습니다.");
      return;
    }
    toggleLike_Interval = 1;
    setTimeout(() => {
      toggleLike_Interval = 0;
    }, 2000);
    toggleLikeMutation();

    if (isLiked_clone === true) {
      setIsLiked(false);
      setLikeCount(likeCount_clone - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount_clone + 1);
    }
  };

  const onKeyDown = async ({ e, commentId = 0 }) => {
    const { keyCode, shiftKey } = e;
    let position = 0;
    // let commentId = 0;
    //13: Enter
    // console.log(comment_input);
    if (comment_input.value === "") {
      return false;
    }
    if (keyCode === 13 && !shiftKey) {
      e.preventDefault();
      if (textarea_Interval === 1) {
        return false;
      }
      setTextarea_Interval(1);
      // document.getElementById("commentBox").setAttribute("disabled", true);
      try {
        if (!commentId) {
          const {
            data: { addComment },
          } = await addCommentMutation({
            update(cache, { data }) {
              // let original = cache.readQuery({
              //   query: FULLPOST_QUERY,
              //   variables: {
              //     postId: id,
              //   },
              // });
              // let clone = original.seeFullPost;
              // clone.comments = [...clone.comments, data.addComment];
              comments.push(data.addComment);

              cache.writeData({
                data: {
                  seeFullPost: {
                    comments,
                    __typename: "Post",
                  },
                },
              });
            },
          });
          if (type === TYPE.POPUP)
            document.getElementById("contentList").scrollTo({
              top: position,
              // behavior: "smooth",
            });
        } else {
          console.log("\nAdd Recomment Start");

          const {
            data: { addRecomment },
          } = await addRecommentMutation({
            variables: { commentId, text: comment_input.value },
            update(cache, { data }) {
              // let original = cache.readQuery({
              //   query: FULLPOST_QUERY,
              //   variables: {
              //     postId: id,
              //   },
              // });

              // console.log(original.seeFullPost.comments);
              // original.seeFullPost.comments
              //   .filter((element) => element.id === commentId)[0]
              //   .reply.push(data.addRecomment);
              comments
                .filter((element) => element.id === commentId)[0]
                .reply.push(data.addRecomment);
              cache.writeData({
                data: {
                  seeFullPost: {
                    comments,
                  },
                },
              });
            },
          });

          setReply_parent(0);
        }
        console.log("\nAdd Recomment End");
        comment_input.setValue("");
      } catch {
        toast.error("Can't send comment!");
      } finally {
        setTextarea_Interval(0);
      }
    }
  };
  if (type === TYPE.DEFAULT) {
    return (
      <PostPresenter
        key={id}
        postId={id}
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
        toggleLike={toggleLike}
        onKeyDown={onKeyDown}
        reply_parent={reply_parent}
        setReply_parent={setReply_parent}
        captionShowAll={captionShowAll}
        setCaptionShowAll={setCaptionShowAll}
      />
    );
  } else if (type === TYPE.POPUP) {
    return (
      <PostModalPresenter
        key={id}
        postId={id}
        caption={caption}
        user={user}
        files={files}
        isLiked={isLiked_clone}
        likeCount={likeCount_clone}
        setLikeCount={setLikeCount}
        setIsLiked={setIsLiked}
        comments={comments}
        createdAt={createdAt}
        comment_input={comment_input}
        currentItem={currentItem}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        totalFiles={files.length}
        toggleLike={toggleLike}
        onKeyDown={onKeyDown}
        reply_parent={reply_parent}
        setReply_parent={setReply_parent}
        textarea_Interval={textarea_Interval}
        commentShowAll={commentShowAll}
        setCommentShowAll={setCommentShowAll}
      />
    );
  }
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
  caption: PropTypes.string,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default PostContainer;
