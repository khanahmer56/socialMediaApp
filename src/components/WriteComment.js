import React from "react";
import LetterAvatars from "./Avatar";
import { useAuth } from "../hooks/auth";
import { useForm } from "react-hook-form";
import { useAddComment } from "../hooks/comments";

const WriteComment = ({ postid }) => {
  const { user } = useAuth();
  console.log(postid, "postid");
  const { register, handleSubmit, reset } = useForm();
  const { addComment } = useAddComment({ postID: postid, uid: user?.id });
  const onSubmit = (data) => {
    addComment(data.comment);
    reset();
  };
  return (
    <div className="w-full mt-10">
      <div className="flex items-center space-x-2 p-2 w-[50%] mx-auto">
        <LetterAvatars post={true} avatar={user?.username} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Write a comment"
            autoComplete="off"
            className="flex-grow outline-none bg-gray-100 p-2 px-4 rounded-full w-[400px] "
            {...register("comment", { required: true })}
          />
          <button
            type="submit"
            className="text-blue-400 ml-4 hover:text-blue-600"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteComment;
