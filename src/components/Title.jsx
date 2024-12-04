import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { AppContext, supabase_client } from '../App';

export default function Title({ title }) {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const loginPage = () => {
    navigate('/');
  };

  const profilePage = () => {
    navigate('/profile');
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
              <Link to={'/'}>{title}</Link>
            </Typography>
            {!context.session && location.pathname !== '/' && (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => loginPage()}
              >
                Sign In
              </Button>
            )}
            {context.session && context.userProfile && (
              <Button
                color="secondary"
                variant="outlined"
                sx={{ marginRight: '1em' }}
                onClick={profilePage}
              >
                {`${context.userProfile.first_name} ${context.userProfile.last_name}`}
              </Button>
            )}

            {context.session && (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => logout()}
              >
                Sign out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
