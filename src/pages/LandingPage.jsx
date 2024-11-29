/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid2 as Grid } from '@mui/material';
import { useContext, useEffect } from 'react';
import Title from '../components/Title';
import { APP_TITLE } from '../constants';
import { AppContext, env } from '../App';
import LoginForm from '../components/LoginForm';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const context = useContext(AppContext);
  const navigation = useNavigate();

  useEffect(() => {
    // if user not logged in
    if (!context.session) {
      if (env === 'dev') {
        console.log('dev', 'user not logged in');
      }
    }
    // if logged in, redirect to Home screen
    else {
      // if customer role
      navigation('/home');

      //if driver role -> driver's dashboard
    }
  }, [context.session]);

  return (
    <>
      <Grid container>
        <Grid size={{ md: 12, lg: 1 }} />
        <Grid size={{ md: 12, lg: 10 }} className="w-full">
          <Title title={APP_TITLE} />

          {!context.session && (
            <>
              <Box className="mx-10">
                <Box className="mt-20 font-bold">
                  New customer or already have an account?
                </Box>
                <LoginForm />
              </Box>

              <Box className="mt-10 mx-10 flex justify-center font-bold">
                <Link to={'/guest'} className="underline">
                  Or continue as a Guest
                </Link>
              </Box>
            </>
          )}
        </Grid>
        <Grid size={{ md: 12, lg: 1 }} />
      </Grid>
    </>
  );
}
