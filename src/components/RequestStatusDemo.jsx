import { Box, Chip, Tooltip } from '@mui/material';
import { TRIP_REQUEST_STATUS } from '../constants';

export default function RequestStatusDemo({ trip }) {
  return (
    <Box className="flex">
      <Tooltip title={'You ride request has been sent to the driver.'}>
        <Chip
          sx={() =>
            trip?.status_id === TRIP_REQUEST_STATUS.tripRequested && {
              backgroundColor: '#273238',
              color: '#fff',
            }
          }
          label="1. Ride Requested"
        />
      </Tooltip>
      <img
        src="../../public/assets/icons/right-arrow.png"
        className="w-full h-full flex self-center"
      />
      <Tooltip
        title={
          'Your driver has sent you the price for the ride request. Pending your confirmation.'
        }
      >
        <Chip
          sx={() =>
            trip?.status_id === TRIP_REQUEST_STATUS.confirmedByDriver && {
              backgroundColor: '#273238',
              color: '#fff',
            }
          }
          label="2. Price Suggested"
        />
      </Tooltip>
      <img
        src="../../public/assets/icons/right-arrow.png"
        className="w-full h-full flex self-center"
      />
      <Tooltip
        title={'You have confirmed the price and your ride is confirmed.'}
      >
        <Chip
          sx={() =>
            trip?.status_id === TRIP_REQUEST_STATUS.confirmedByCustomer && {
              backgroundColor: '#273238',
              color: '#fff',
            }
          }
          label="3. Price Accepted"
        />
      </Tooltip>
      <img
        src="../../public/assets/icons/right-arrow.png"
        className="w-full h-full flex self-center"
      />
      <Tooltip title={'Your trip has been completed.'}>
        <Chip
          sx={() =>
            trip?.status_id === TRIP_REQUEST_STATUS.tripCompleted && {
              backgroundColor: '#00bfaf',
              color: '#fff',
            }
          }
          label="4. Trip Completed"
        />
      </Tooltip>
    </Box>
  );
}
