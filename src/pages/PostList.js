import React from "react";
import Post from "../components/Post";
import { Typography } from "@mui/material";

const PostList = ({ posts }) => {
  return (
    <div className="mt-5 flex flex-col gap-4">
      {posts?.length === 0 ? (
        <Typography>No Posts..</Typography>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
