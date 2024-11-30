import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { AppContext, supabase_client } from '../App';

export default function Title({ title }) {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const login = () => {
    navigate('/dashboard');
  };

  const logout = async () => {
    await supabase_client.auth.signOut();
    navigate('/');
  };

  return (
    <>
      <Box className="text-xl">
        <AppBar position="static">
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1, fontSize: '1em' }}>
              {title}
            </Typography>
            {!context.session && (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => login()}
              >
                Sign In
              </Button>
            )}
            {context.session && (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => logout()}
              >
                Log out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
