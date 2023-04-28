import React from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import Post2 from "./Post2";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/post";
import WriteComment from "./WriteComment";
import CommentList from "./CommentList";

const Comments = () => {
  const { id } = useParams();
  const { post } = usePost(id);
  console.log(post, "post");

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row  w-full flex-1 ">
        <div className="h-screen max-w-[400px] flex-auto p-4 ">
          <SideBar />
        </div>
        <div className="flex-grow mt-10 px-5">
          <Post2 post={post} />
          <WriteComment postid={post?.id} />
          <CommentList posts={post?.id} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
