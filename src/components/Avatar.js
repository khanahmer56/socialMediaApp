import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";

export default function LetterAvatars({ avatar, post }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        sx={{
          bgcolor: deepOrange[500],
          width: post ? "40px" : "60px",
          height: post ? "40px" : "60px",
          cursor: "pointer",
        }}
      >
        {avatar ? avatar[0].toUpperCase() : ""}
      </Avatar>
    </Stack>
  );
}
