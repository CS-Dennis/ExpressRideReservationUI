import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Title({ title }) {
  const navigate = useNavigate();
  const login = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Box className="text-xl">
        <AppBar position="static">
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1, fontSize: '1em' }}>
              {title}
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => login()}
            >
              Driver Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
