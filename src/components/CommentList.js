import React from "react";
import { useComments } from "../hooks/comments";
import CommentCard from "./CommentCard";

const CommentList = ({ posts }) => {
  console.log(posts, "postid");
  const { comments } = useComments(posts);
  console.log(comments, "comments");
  return (
    <div className="w-full flex justify-center">
      <div className="mx-auto">
        {comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
