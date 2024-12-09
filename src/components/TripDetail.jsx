import { Box, Chip } from '@mui/material';
import moment from 'moment';
import {
  DATETIME_FORMATS,
  TRIP_REQUEST_STATUS,
  TRIP_REQUEST_STATUS_CHIP_LABELS,
} from '../constants';
import { Link } from 'react-router-dom';

export default function TripDetail({ trip }) {
  return (
    <>
      <Box>
        <Box className="flex justify-center font-bold text-lg">Trip Detail</Box>
        <Box className="mt-4">
          <Box className="flex justify-center font-bold border-b border-gray-500">
            Trip Info
          </Box>
          <Box className="mt-4">
            <Box className="font-bold mr-2">Pick-up datetime:</Box>
            <Box>
              {moment(trip.pickup_datetime).format(DATETIME_FORMATS.american)}
            </Box>
          </Box>
          <Box className="mt-4">
            <Box className="font-bold mr-2">Pick-up location:</Box>
            <Box>{`${trip.pickup_address}, ${trip.pickup_city}, ${trip.pickup_state} ${trip.pickup_zip}`}</Box>
          </Box>
          <Box className="mt-4">
            <Box className="font-bold mr-2">Drop-off location:</Box>
            <Box>{`${trip.dropoff_address}, ${trip.dropoff_city}, ${trip.dropoff_state} ${trip.dropoff_zip}`}</Box>
          </Box>
          <Box className="mt-4">
            <Link
              to={`https://www.google.com/maps/dir/${trip?.pickup_address}, ${trip?.pickup_city}, ${trip?.pickup_state} ${trip?.pickup_zip}/${trip?.dropoff_address}, ${trip?.dropoff_city}, ${trip?.dropoff_state} ${trip?.dropoff_zip}`}
              target="_blank"
            >
              <Box className="flex flex-col bg-slate-100">
                <Box className="flex self-center">Show on Map</Box>
                <Box className="flex self-center">
                  <img
                    src="../../assets/icons/location.png"
                    style={{ height: '40px' }}
                  />
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>

        <Box className="mt-10">
          <Box className="flex justify-center font-bold border-b border-gray-500">
            Rider Info
          </Box>
          <Box className="mt-4">
            <Box>{`Customer's Name: ${trip.rider_info.first_name} ${trip.rider_info.last_name}`}</Box>
            <Box>{`Phone: ${trip.rider_info.phone}`}</Box>
            <Box>{`Email: ${trip.rider_info.email}`}</Box>
          </Box>
        </Box>

        <Box className="mt-10">
          <Box className="flex justify-center font-bold border-b border-gray-500">
            More Info
          </Box>
          <Box className="mt-4">
            <Box>Number of Passengers: {trip.num_passengers}</Box>
            <Box>Number of checked bags: {trip.num_bags_checked}</Box>
            <Box>Number of carry-ons: {trip.num_bags_carryon}</Box>
            <Box>Vehicle type: {trip.vehicle_type}</Box>
          </Box>
        </Box>

        <Box className="border border-navyBlue font-bold">
          Notes to the driver: {trip.notes}
        </Box>
        <Box>Cost: ${trip.price || 0}</Box>
        <Box>
          Status:{' '}
          <Chip
            label={
              trip.status_id === 1
                ? `1. ${TRIP_REQUEST_STATUS_CHIP_LABELS[0]}`
                : trip.status_id === 2
                ? `2. ${TRIP_REQUEST_STATUS_CHIP_LABELS[1]}`
                : trip.status_id === 3
                ? `3. ${TRIP_REQUEST_STATUS_CHIP_LABELS[2]}`
                : trip.status_id === 4 &&
                  `4. ${TRIP_REQUEST_STATUS_CHIP_LABELS[3]}`
            }
            sx={() =>
              trip.status_id === TRIP_REQUEST_STATUS.tripCompleted
                ? {
                    backgroundColor: '#19ae47',
                    color: '#fff',
                  }
                : {
                    backgroundColor: '#273238',
                    color: '#fff',
                  }
            }
          />
        </Box>

        <Box>
          Request send on:{' '}
          {moment(trip.created_at).format(DATETIME_FORMATS.american)}
        </Box>
      </Box>
    </>
  );
}
