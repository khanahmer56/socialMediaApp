import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl font-bold text-center">Welcome user</h1>
        <h1 className="text-2xl font-bold text-center">
          Please login to continue
        </h1>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Home;
