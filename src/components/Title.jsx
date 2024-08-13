import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Title({ title }) {
  const navigate = useNavigate();
  const login = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Box className="text-3xl ">
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
            <Typography component="div" sx={{ flexGrow: 1, fontSize: "1.2em" }}>
              {title}
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => login()}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
