import { Box, Grid2 as Grid, Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { APP_TITLE } from '../constants';
import Title from '../components/Title';
import { useLocation } from 'react-router-dom';
import { confirmTrip } from '../services/apis';
import { AppContext } from '../App';

export default function CustomerConfirmation() {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  useEffect(() => {
    const confirmationCode = location.search.split('confirmation_code=')[1];
    if (confirmationCode) {
      confirmTrip(confirmationCode)
        .then((res) => {
          if (res.status === 200) {
            setShowSuccessMsg(true);
            appContext.setSnackbarFlag(true);
            appContext.setSnackbarType('success');
            appContext.setSnackbarMessage(
              'You have confirmed the trip successfully.',
            );
          }
        })
        .catch((err) => {
          console.log(err);
          appContext.setSnackbarFlag(true);
          appContext.setSnackbarType('error');
          appContext.setSnackbarMessage('Error');
        });
    }
  }, []);

  return (
    <>
      <Box className="mx-10">
        <Grid container>
          <Grid size={{ md: 12, lg: 1 }} />
          <Grid size={{ md: 12, lg: 12 }} className="w-full">
            <Title title={APP_TITLE} />

            {showSuccessMsg && (
              <Paper
                className="fixed m-auto left-0 right-0 top-0 bottom-0 w-fit h-fit p-10"
                elevation={10}
              >
                <Box>You have confirmed the trip successfully.</Box>
                <Box>
                  The driver will pick you up at your schedule location and
                  time. Have a joyful and safe trip.
                </Box>
              </Paper>
            )}
          </Grid>
          <Grid size={{ md: 12, lg: 1 }} />
        </Grid>
      </Box>
    </>
  );
}
