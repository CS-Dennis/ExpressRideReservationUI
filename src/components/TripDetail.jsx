import { Box } from '@mui/material';
import moment from 'moment';
import { DATETIME_FORMATS } from '../constants';

export default function TripDetail({ trip }) {
  return (
    <>
      <Box>
        <Box className="flex justify-center font-bold text-lg">Trip Detail</Box>
        <Box className="mt-4">
          Pick-up datetime:{' '}
          {moment(trip.pickup_datetime).format(DATETIME_FORMATS.american)}
        </Box>
        <Box>
          Pick-up location:{' '}
          {`${trip.pickup_address}, ${trip.pickup_city}, ${trip.pickup_state} ${trip.pickup_zip}`}
        </Box>
        <Box>
          Drop-off location:{' '}
          {`${trip.dropoff_address}, ${trip.dropoff_city}, ${trip.dropoff_state} ${trip.dropoff_zip}`}
        </Box>

        <Box>Number of Passengers: {trip.num_passengers}</Box>
        <Box>Number of checked bags: {trip.num_bags_checked}</Box>
        <Box>Number of carry-ons: {trip.num_bags_carryon}</Box>
        <Box>Vehicle type: {trip.trip_type}</Box>
        <Box>Your notes to the driver: {trip.notes}</Box>
        <Box>Cost: ${trip.price || 0}</Box>
        <Box>Status: {trip.status}</Box>

        <Box>
          Request send on:{' '}
          {moment(trip.created_at).format(DATETIME_FORMATS.american)}
        </Box>
      </Box>
    </>
  );
}
