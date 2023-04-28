import { IconButton, Typography } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useUser } from "../hooks/user";
import LetterAvatars from "./Avatar";
import { formatDistanceToNow } from "date-fns";
import { useDeletePost, useToggleLike } from "../hooks/post";
import { useAuth } from "../hooks/auth";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useComments } from "../hooks/comments";

const Post2 = ({ post }) => {
  const { user } = useAuth();
  const { deletePost } = useDeletePost(post?.id);
  const navigate = useNavigate();
  const isliked = post?.likes?.includes(user?.id);
  const config = {
    id: post?.id,
    isLiked: isliked,
    uid: user?.id,
  };
  const { toggleLike } = useToggleLike(config);
  const { comments } = useComments(post?.id);

  return (
    <div className="w-[70%] border-2 border-gray-300 mx-auto rounded-lg relative">
      <div className="flex items-center gap-4 border-b-2 border-gray-200 p-4">
        <Typography variant="h6">Comments</Typography>
      </div>
      <div className="h-[150px] p-4 flex flex-col justify-between">
        <Typography variant="body1">{post?.text}</Typography>
        <div>
          <IconButton onClick={() => toggleLike()}>
            {" "}
            {isliked ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "red" }} />
            )}{" "}
            <Typography variant="body2" marginLeft={1}>
              {post?.likes?.length}
            </Typography>
          </IconButton>
          <IconButton
            onClick={() => navigate(`/protected/comment/${post?.id}`)}
          >
            <ChatBubbleOutlineIcon />{" "}
            <Typography variant="body2" marginLeft={1}>
              {comments?.length}
            </Typography>
          </IconButton>
          <IconButton
            sx={{ position: "absolute", right: 1 }}
            onClick={() => deletePost()}
          >
            <DeleteIcon sx={{ color: "red" }} />{" "}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Post2;
