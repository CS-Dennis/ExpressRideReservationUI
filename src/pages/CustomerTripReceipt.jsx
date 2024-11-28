import { Box, Button, Divider, Grid2 as Grid, Paper } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { APP_TITLE } from '../constants';
import Title from '../components/Title';
import { getRideRequestByConfirmationCode } from '../services/apis';
import { AppContext } from '../App';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import moment from 'moment';

export default function CustomerTripReceipt() {
  const param = useParams();
  const appContext = useContext(AppContext);
  const [rideRequest, setRideRequest] = useState(null);
  useEffect(() => {
    getRideRequestByConfirmationCode(param.confirmationCode)
      .then((res) => {
        if (res.status === 200) {
          setRideRequest(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setRideRequest('error');
        appContext.setSnackbarFlag(true);
        appContext.setSnackbarType('error');
        appContext.setSnackbarMessage('Error');
      });
  }, []);

  return (
    <>
      <Box className="mx-10">
        <Grid container>
          <Grid item md={12} lg={1} />
          <Grid item md={12} lg={10} className="w-full">
            <Title title={APP_TITLE} />
            {rideRequest !== 'error' && rideRequest !== null && (
              <Paper
                className="font-bold mt-20 flex flex-col items-center py-10"
                elevation={10}
              >
                <Box className="p-4">
                  <b>Your Trip Info:</b>
                </Box>

                <Box>
                  <Box className="bg-slate-200 flex justify-center">
                    Reservation Status
                  </Box>
                  <Box className="bg-green-500 px-2 flex justify-center mt-1">
                    Driver has accepted your request
                  </Box>
                  {!rideRequest.customerConfirmed && (
                    <Box className="mt-1">
                      <Box className="flex justify-center bg-yellow-400 px-2">
                        Pending your confirmation
                      </Box>
                      <Box>Please check your email for confirmation link</Box>
                    </Box>
                  )}
                  {rideRequest.customerConfirmed && (
                    <Box className="bg-green-500 px-2 flex justify-center mt-1">
                      You have confirmed your trip
                    </Box>
                  )}
                </Box>
                <Box className="p-4">
                  <Box>
                    Route:{' '}
                    <Link
                      to={`https://www.google.com/maps/dir/${rideRequest?.pickupAddress}, ${rideRequest?.pickupCity}, ${rideRequest?.pickupState} ${rideRequest?.pickupZip}/${rideRequest?.dropoffAddress}, ${rideRequest?.dropoffCity}, ${rideRequest?.dropoffState} ${rideRequest?.dropoffZip}`}
                      target="_blank"
                    >
                      <LocationOnIcon />
                    </Link>
                  </Box>
                  <Divider className="pt-2" />
                  <Box className="pt-2">{`Vehicle type: ${rideRequest?.vehicleType}`}</Box>
                  <Box>{`Pickup time: ${moment(
                    new Date(rideRequest?.pickupDateTime),
                  ).format('YYYY-MM-DD hh:mm:ss A')}`}</Box>
                  <Box>{`Pickup Address: ${rideRequest?.pickupAddress}, ${rideRequest?.pickupCity}, ${rideRequest?.pickupState} ${rideRequest?.pickupZip}`}</Box>
                  <Box>{`Dropoff Address: ${rideRequest?.dropoffAddress}, ${rideRequest?.dropoffCity}, ${rideRequest?.dropoffState} ${rideRequest?.dropoffZip}`}</Box>
                  <Divider className="pt-2" />
                  <Box className="pt-2">{`# of passenger(s): ${rideRequest?.numOfPassengers}`}</Box>
                  <Box>{`# of checked bags: ${rideRequest?.numOfCheckedBags}`}</Box>
                  <Box>{`# of carry-on bags: ${rideRequest?.numOfCarryOnBags}`}</Box>
                  <Divider className="pt-2" />
                  <Box className="pt-2">{`Price: $${rideRequest.price}`}</Box>
                  <Box>{`Driver's notes: ${rideRequest.driverNotes}`}</Box>
                </Box>
              </Paper>
            )}

            {rideRequest === 'error' && (
              <Paper
                className="font-bold mt-20 flex justify-center py-10"
                elevation={10}
              >
                This ride request doesn't exist. Please check your link in your
                inbox again.
              </Paper>
            )}
          </Grid>
          <Grid item md={12} lg={1} />
        </Grid>
      </Box>
    </>
  );
}
