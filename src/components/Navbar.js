import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../hooks/auth";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { logout } = useLogout();
  React.useEffect(() => {
    if (pathname.startsWith("/protected") && !user && !isLoading) {
      navigate("/login");
    }
  }, [pathname]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Social Media App
          </Typography>
          <Button color="inherit" onClick={() => logout()}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
