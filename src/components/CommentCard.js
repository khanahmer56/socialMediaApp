import React from "react";
import LetterAvatars from "./Avatar";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "../hooks/user";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteComment } from "../hooks/comments";
import { useAuth } from "../hooks/auth";

const CommentCard = ({ comment }) => {
  const { users, isLoading } = useUser(comment?.uid);
  const { deleteComment } = useDeleteComment(comment?.id);
  const { user } = useAuth();
  console.log(users, "user");
  return (
    <div className="flex justify-between w-[300px] border-b-2  border-blue-200 my-5 relative">
      <div>
        <LetterAvatars post={true} avatar={users?.username} />
        <h1 className="text-gray-500">{formatDistanceToNow(comment.date)}</h1>
      </div>
      <div className="flex flex-col ">
        <Typography variant="subtitle1" fontWeight={"bold"}>
          {users?.username}
        </Typography>
        <div className="flex items-center gap-2">
          <h1>{comment.text}</h1>
          {users?.id === user?.id && (
            <IconButton onClick={() => deleteComment()}>
              <DeleteIcon
                sx={{ position: "absolute", right: 1, color: "red" }}
              />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
