/* eslint-disable no-undef */
import { Box, Button, Chip, Modal, Paper, Grid2 as Grid } from '@mui/material';
import moment from 'moment';
import { useContext, useState } from 'react';
import {
  DATETIME_FORMATS,
  TRIP_REQUEST_STATUS,
  TRIP_REQUEST_STATUS_CHIP_LABELS,
} from '../constants';
import TripDetail from './TripDetail';
import { AppContext, env, supabase_client } from '../App';

// used on CustomerTrips screen
export default function TripCard({ trip, selectedYear, getUserTrips }) {
  const context = useContext(AppContext);
  const [showTripDetailModal, setShowTripDetailModal] = useState(false);
  const [showConfirmPriceModal, setShowConfirmPriceModal] = useState(false);
  const [showRejectRequestModal, setShowRejectRequestModal] = useState(false);

  const acceptPrice = async () => {
    console.log(trip);
    const { data, error } = await supabase_client
      .from('ride_request')
      .update({ status_id: TRIP_REQUEST_STATUS.confirmedByCustomer })
      .eq('id', trip.id)
      .select();

    if (data) {
      if (env === 'dev') {
        console.log('dev', 'accepted price', data);
      }

      context.setSnackbarFlag(true);
      context.setSnackbarType('success');
      context.setSnackbarMessage(
        'You have accepted the price successfully. Your ride reservation is set!',
      );
      setShowConfirmPriceModal(false);
      getUserTrips(selectedYear);
    }

    if (error) {
      console.log(error);
    }
  };

  const rejectRequest = async () => {
    const { data, error } = await supabase_client
      .from('ride_request')
      .update({ status_id: TRIP_REQUEST_STATUS.priceRejected })
      .eq('id', trip.id)
      .select();

    if (data) {
      if (env === 'dev') {
        console.log('dev', 'rejected price', data);
      }

      context.setSnackbarFlag(true);
      context.setSnackbarType('success');
      context.setSnackbarMessage('You have rejected the request successfully.');
      setShowRejectRequestModal(false);
      getUserTrips(selectedYear);
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* trip card */}
      <Paper className="mb-5 p-5">
        {/* first row */}
        <Grid container>
          {/* md or larger screen */}
          <Grid
            size={{ md: 4 }}
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
            className="font-bold"
          >{`Pick-up Date: ${moment(new Date(trip.pickup_datetime)).format(
            DATETIME_FORMATS.american,
          )}`}</Grid>

          <Grid
            size={{ md: 8 }}
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
            className="flex justify-end"
          >
            <Button variant="contained" sx={{ marginRight: '4px' }} disabled>
              Request This Trip Again
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowTripDetailModal(true)}
            >
              Trip Detail
            </Button>
          </Grid>

          {/* sm or smaller screen */}
          <Grid
            size={{ xs: 12, sm: 12 }}
            sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}
            className="flex justify-center font-bold"
          >{`Pick-up Date: ${moment(new Date(trip.pickup_datetime)).format(
            DATETIME_FORMATS.american,
          )}`}</Grid>

          <Grid
            size={{ xs: 12, sm: 12 }}
            sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}
            className="flex justify-center"
          >
            <Button variant="contained" sx={{ marginRight: '4px' }}>
              Request This Trip Again
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowTripDetailModal(true)}
            >
              Trip Detail
            </Button>
          </Grid>
        </Grid>

        {/* second row */}
        <Grid container className="flex justify-between mt-4">
          <Grid
            size={{ xs: 12, sm: 4, md: 4 }}
            className="flex flex-col justify-center items-center mb-2"
          >
            <Box className="flex justify-center">
              <img src="/assets/icons/location.png" className="h-5 w-5" />
            </Box>
            <Box className="font-bold">Pickup Address</Box>
            <Box>{trip.pickup_address}</Box>
            <Box>{`${trip.pickup_city}, ${trip.pickup_state} ${trip.pickup_zip}`}</Box>
          </Grid>

          {/* middle status column for sm and larger screen  */}
          <Grid
            size={{ sm: 4, md: 4 }}
            sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }}
            className="flex flex-col justify-center items-center"
          >
            {/* current trip status */}
            <Box className="flex justify-center mb-6">
              <Box className="flex flex-col">
                <Box className="flex justify-center">
                  <Chip
                    sx={() =>
                      trip.status_id === TRIP_REQUEST_STATUS.tripCompleted
                        ? {
                            backgroundColor: '#19ae47',
                            color: '#fff',
                          }
                        : trip.status_id === TRIP_REQUEST_STATUS.requestRejected
                        ? { backgroundColor: '#e7334a', color: '#fff' }
                        : trip.status_id === TRIP_REQUEST_STATUS.priceRejected
                        ? { backgroundColor: '#e77733', color: '#fff' }
                        : {
                            backgroundColor: '#273238',
                            color: '#fff',
                          }
                    }
                    label={
                      trip.status_id === TRIP_REQUEST_STATUS.tripRequested
                        ? `1. ${TRIP_REQUEST_STATUS_CHIP_LABELS[0]}`
                        : trip.status_id ===
                          TRIP_REQUEST_STATUS.confirmedByDriver
                        ? `2. ${TRIP_REQUEST_STATUS_CHIP_LABELS[1]}`
                        : trip.status_id ===
                          TRIP_REQUEST_STATUS.confirmedByCustomer
                        ? `3. ${TRIP_REQUEST_STATUS_CHIP_LABELS[2]}`
                        : trip.status_id === TRIP_REQUEST_STATUS.tripCompleted
                        ? `4. ${TRIP_REQUEST_STATUS_CHIP_LABELS[3]}`
                        : trip.status_id === 5
                        ? `${TRIP_REQUEST_STATUS_CHIP_LABELS[4]}`
                        : trip.status_id === 6 &&
                          `${TRIP_REQUEST_STATUS_CHIP_LABELS[5]}`
                    }
                  />
                </Box>
                {trip.status_id === TRIP_REQUEST_STATUS.confirmedByDriver && (
                  <Box className="mt-2">
                    <Box className="flex justify-center">
                      <Chip label={`$${trip.trip_charge?.price}`} />
                    </Box>
                    <Box className="flex justify-evenly mt-2 w-64">
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#19ae47' }}
                        onClick={() => setShowConfirmPriceModal(true)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#e7334a' }}
                        onClick={() => setShowRejectRequestModal(true)}
                      >
                        Reject
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 4, md: 4 }}
            className="flex flex-col justify-center items-center  mb-2"
          >
            <Box className="flex justify-center">
              <img src="/assets/icons/location.png" className="h-5 w-5" />
            </Box>
            <Box className="font-bold">Dropoff Address</Box>
            <Box>{trip.dropoff_address}</Box>
            <Box>{`${trip.dropoff_city}, ${trip.dropoff_state} ${trip.dropoff_zip}`}</Box>
          </Grid>

          {/* bottom status column for xs screen */}
          <Grid
            size={{ xs: 12 }}
            sx={{ display: { xs: 'block', sm: 'none' } }}
            className="flex flex-col justify-center items-center"
          >
            {/* current trip status */}
            <Box className="flex justify-center mb-6">
              <Box className="flex flex-col">
                <Box className="flex justify-center">
                  <Chip
                    sx={() =>
                      trip.status_id === TRIP_REQUEST_STATUS.tripCompleted
                        ? {
                            backgroundColor: '#19ae47',
                            color: '#fff',
                          }
                        : trip.status_id === TRIP_REQUEST_STATUS.requestRejected
                        ? { backgroundColor: '#e7334a', color: '#fff' }
                        : trip.status_id === TRIP_REQUEST_STATUS.priceRejected
                        ? { backgroundColor: '#e77733', color: '#fff' }
                        : {
                            backgroundColor: '#273238',
                            color: '#fff',
                          }
                    }
                    label={
                      trip.status_id === TRIP_REQUEST_STATUS.tripRequested
                        ? `1. ${TRIP_REQUEST_STATUS_CHIP_LABELS[0]}`
                        : trip.status_id ===
                          TRIP_REQUEST_STATUS.confirmedByDriver
                        ? `2. ${TRIP_REQUEST_STATUS_CHIP_LABELS[1]}`
                        : trip.status_id ===
                          TRIP_REQUEST_STATUS.confirmedByCustomer
                        ? `3. ${TRIP_REQUEST_STATUS_CHIP_LABELS[2]}`
                        : trip.status_id === TRIP_REQUEST_STATUS.tripCompleted
                        ? `4. ${TRIP_REQUEST_STATUS_CHIP_LABELS[3]}`
                        : trip.status_id === 5
                        ? `${TRIP_REQUEST_STATUS_CHIP_LABELS[4]}`
                        : trip.status_id === 6 &&
                          `${TRIP_REQUEST_STATUS_CHIP_LABELS[5]}`
                    }
                  />
                </Box>
                {trip.status_id === TRIP_REQUEST_STATUS.confirmedByDriver && (
                  <Box className="mt-2">
                    <Box className="flex justify-center">
                      <Chip label={`$${trip.trip_charge?.price}`} />
                    </Box>
                    <Box className="flex justify-evenly mt-2 w-64">
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#19ae47' }}
                        onClick={() => setShowConfirmPriceModal(true)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#e7334a' }}
                        onClick={() => setShowRejectRequestModal(true)}
                      >
                        Reject
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Trip detail modal */}
      <Modal open={showTripDetailModal}>
        <Box
          className="absolute m-auto top-0 bottom-0 left-0 right-0 
        h-5/6 bg-white p-4 rounded-md border-navyBlue 
        border-t-8 overflow-y-auto "
          sx={{ width: '600px', maxWidth: '100%' }}
        >
          <Box>
            <TripDetail trip={trip} />
          </Box>
          <Box className="flex justify-center mt-4">
            <Button
              variant="contained"
              onClick={() => {
                setShowTripDetailModal(false);
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* confirm price modal */}
      <Modal
        open={showConfirmPriceModal}
        className="absolute m-auto left-0 right-0 top-0 bottom-0 h-fit w-64"
      >
        <Box className="bg-white p-4 rounded-md border-navyBlue border-t-8">
          <Box className="flex justify-center font-bold">
            Confirm the Trip Price
          </Box>
          <Box className="flex justify-center font-bold">{`$${trip.trip_charge?.price}`}</Box>
          <Box className="flex justify-evenly mt-4">
            <Button
              variant="contained"
              sx={{ backgroundColor: '#19ae47' }}
              onClick={acceptPrice}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setShowConfirmPriceModal(false);
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* cancel ride request modal */}
      <Modal
        open={showRejectRequestModal}
        className="absolute m-auto left-0 right-0 top-0 bottom-0 h-fit w-64"
      >
        <Box className="bg-white p-4 rounded-md border-navyBlue border-t-8">
          <Box className="flex justify-center font-bold">
            Cancel This Ride Request
          </Box>

          <Box className="flex justify-evenly mt-4">
            <Button
              variant="contained"
              sx={{ backgroundColor: '#e7334a' }}
              onClick={rejectRequest}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowRejectRequestModal(false)}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
