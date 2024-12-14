import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { AppContext, env, supabase_client } from '../App';

export default function Title({ title }) {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const loginPage = () => {
    navigate('/');
  };

  const homePage = () => {
    navigate('/home');
  };

  const dashboardPage = () => {
    navigate('/dashboard');
  };

  const profilePage = () => {
    handleClose();
    navigate('/profile');
  };
  const tripsPage = () => {
    handleClose();
    navigate('/trips');
  };

  const logout = async () => {
    handleClose();
    await supabase_client.auth.signOut();
    context.setUserProfile(null);
    context.setNewUser(null);
    navigate('/');
  };

  useEffect(() => {
    if (context.session && context.newUser) {
      if (env === 'dev') {
        console.log("User registered but have'n provided name and phone yet.");
      }
      navigate('/profile');
    }
  }, [context.session, context.newUser]);

  useEffect(() => {
    if (env === 'dev') {
      console.log('dev', 'context.userProfile', context.userProfile);
    }
  }, [context.userProfile]);

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
            {context.session && !context.newUser && (
              <>
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ marginRight: '1em' }}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(e) => handleClick(e)}
                >
                  {`${context.userProfile?.first_name} ${context.userProfile?.last_name}`}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  {/* for customer */}
                  {context.userProfile?.role?.id === 3 && (
                    <Box>
                      <MenuItem sx={{ minWidth: '110px' }} onClick={homePage}>
                        Request A Ride
                      </MenuItem>
                      <MenuItem onClick={() => tripsPage()}>My Trips</MenuItem>
                    </Box>
                  )}

                  {/* for driver */}
                  {context.userProfile?.role?.id === 2 && (
                    <Box>
                      <MenuItem
                        sx={{ minWidth: '110px' }}
                        onClick={dashboardPage}
                      >
                        Dashboard
                      </MenuItem>
                      <MenuItem onClick={() => {}} disabled>
                        Stats
                      </MenuItem>
                    </Box>
                  )}

                  <MenuItem onClick={profilePage}>Profile</MenuItem>
                  <MenuItem onClick={logout}>Sign out</MenuItem>
                </Menu>
              </>
            )}

            {context.session && context.newUser && (
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
