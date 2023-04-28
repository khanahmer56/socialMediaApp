import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Profile from "./Profile";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAddPost, useGetPost } from "../hooks/post";
import PostList from "./PostList";
const Dashboard = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { addPost } = useAddPost();
  const { posts, isLoading: isPostsLoading } = useGetPost();
  console.log(posts, "hello");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    if (pathname.startsWith("/protected") && !user && !isLoading) {
      navigate("/login");
    }
  }, [pathname]);
  const onSubmit = (data) => {
    console.log(data);
    addPost({
      uid: user.id,
      text: data.post,
    });
    reset();
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row  w-full flex-1 ">
        <div className="h-screen max-w-[400px] flex-auto p-4  ">
          <SideBar />
        </div>
        <div className="p-8 flex-grow ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between">
              <Typography variant="h5">New Post</Typography>
              <Button type="submit" variant="contained">
                Post
              </Button>
            </div>
            <textarea
              {...register("post", { required: true })}
              placeholder="Create a new post.."
              className="w-full h-40 p-4 mt-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </form>
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
