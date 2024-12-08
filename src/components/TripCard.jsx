/* eslint-disable no-undef */
import { Box, Button, Chip, Modal, Paper } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  DATETIME_FORMATS,
  TRIP_REQUEST_STATUS,
  TRIP_REQUEST_STATUS_CHIP_LABELS,
} from '../constants';
import TripDetail from './TripDetail';
import RequestStatusDemo from './RequestStatusDemo';

export default function TripCard({ trip }) {
  const [showTripDetailModal, setShowTripDetailModal] = useState(false);
  useEffect(() => {
    console.log(moment(new Date(trip.pickup_datetime)));
  }, []);

  return (
    <>
      <Paper className="mb-5 p-5">
        <Box className="flex justify-between">
          <Box>{`Pick-up Date: ${moment(new Date(trip.pickup_datetime)).format(
            DATETIME_FORMATS.american,
          )}`}</Box>

          <Box>
            <Button variant="contained" sx={{ marginRight: '4px' }}>
              Request This Trip Again
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowTripDetailModal(true)}
            >
              Trip Detail
            </Button>
          </Box>
        </Box>

        <Box className="flex justify-between mt-4">
          <Box>
            <Box className="flex justify-center">
              <img
                src="../../public/assets/icons/location.png"
                className="h-5 w-5"
              />
            </Box>
            <Box className="font-bold">Pickup Address</Box>
            <Box>{trip.pickup_address}</Box>
            <Box>{`${trip.pickup_city}, ${trip.pickup_state} ${trip.pickup_zip}`}</Box>
          </Box>
          <Box>
            {/* current trip status */}
            <Box className="flex justify-center mb-6">
              <Chip
                sx={() =>
                  trip.status_id === TRIP_REQUEST_STATUS.tripCompleted
                    ? {
                        backgroundColor: '#00bfaf',
                        color: '#fff',
                      }
                    : {
                        backgroundColor: '#273238',
                        color: '#fff',
                      }
                }
                label={
                  trip.status_id === TRIP_REQUEST_STATUS.tripRequested
                    ? `1. ${TRIP_REQUEST_STATUS_CHIP_LABELS[0]}`
                    : trip.status_id === TRIP_REQUEST_STATUS.confirmedByDriver
                    ? `2. ${TRIP_REQUEST_STATUS_CHIP_LABELS[1]}`
                    : trip.status_id === TRIP_REQUEST_STATUS.confirmedByCustomer
                    ? `3. ${TRIP_REQUEST_STATUS_CHIP_LABELS[2]}`
                    : trip.status_id === TRIP_REQUEST_STATUS.tripCompleted &&
                      `4. ${TRIP_REQUEST_STATUS_CHIP_LABELS[3]}`
                }
              />
            </Box>
            {/* status demo */}
            <RequestStatusDemo trip={trip} />
          </Box>
          <Box>
            <Box className="flex justify-center">
              <img
                src="../../public/assets/icons/location.png"
                className="h-5 w-5"
              />
            </Box>
            <Box className="font-bold">Dropoff Address</Box>
            <Box>{trip.dropoff_address}</Box>
            <Box>{`${trip.dropoff_city}, ${trip.dropoff_state} ${trip.dropoff_zip}`}</Box>
          </Box>
        </Box>
      </Paper>

      {/* Trip detail modal */}
      <Modal
        open={showTripDetailModal}
        className="absolute m-auto left-0 right-0 top-0 bottom-0 h-fit w-fit"
      >
        <Box className="bg-white p-4 rounded-md border-navyBlue border-t-8">
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
    </>
  );
}
