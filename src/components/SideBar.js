import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { Button, Stack, Typography } from "@mui/material";
import LetterAvatars from "./Avatar";

export const ActiveUser = () => {
  const { user, isLoading } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  return (
    <Stack
      alignItems={"center"}
      sx={{
        borderBottom: "1px solid lightgray",
        pb: 4,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <LetterAvatars avatar={user?.username} />
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", my: 2 }}>
        {user?.username}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate(`/protected/profile/${user?.id}`)}
      >
        View Profile
      </Button>
    </Stack>
  );
};

const SideBar = () => {
  // const { pathname } = useLocation();
  // const navigate = useNavigate();
  // const { user, isLoading } = useAuth();
  // useEffect(() => {
  //   if (pathname.startsWith("/protected") && !user && !isLoading) {
  //     navigate("/login");
  //   }
  // }, [pathname]);
  return (
    <div>
      <div className="h-auto max-w-[400px] p-4 flex-1">
        <ActiveUser />
        <Button variant="outlined" fullWidth sx={{ mt: 5 }}>
          All Users
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
