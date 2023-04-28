import React from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { formatDistanceToNow } from "date-fns";
import { usePosts } from "../hooks/post";
import { useUser } from "../hooks/user";
import Post from "../components/Post";
const Profile = () => {
  const { id } = useParams();
  const { posts } = usePosts(id);
  const { users } = useUser(id);

  console.log(posts, "posts");
  return (
    <div>
      <Navbar />
      <div className="flex  w-full flex-1 ">
        <div className="h-screen max-w-[400px] flex-auto p-4 ">
          <SideBar />
        </div>
        <div className="p-5 flex-grow gap-2 flex flex-col   justify-center  items-center  ">
          <div className="flex flex-col bg-black/50 text-white p-4 rounded-lg gap-8 items-center">
            <h1>Profile Name : {users?.username}</h1>
            <h1>No of Posts:{posts?.length}</h1>
            <h1>Likes : {posts?.likes?.length || 0}</h1>
            <h1>
              Joining Date : {users?.date && formatDistanceToNow(users?.date)}
              &nbsp; ago
            </h1>
          </div>
          <div>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {posts?.map((post) => (
                <Post post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
