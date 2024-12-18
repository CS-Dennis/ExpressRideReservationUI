import {
  Box,
  // Checkbox,
  // FormControlLabel,
  Paper,
  TextField,
} from '@mui/material';
import moment from 'moment';
import { TRIP_TYPES } from '../constants';
import { estimatedPrice } from '../util';

export default function TripConfirmation({
  tripType,
  firstName,
  lastName,
  phoneNumber,
  email,
  pickupDateTime,
  numOfPassengers,
  numOfLuggagesChecked,
  numOfLuggagesCarryOn,
  pickupAddress,
  dropoffAddress,
  vehicleType,
  notes,
  setNotes,
  // disableEamil,
  // setDisableEamil,
}) {
  return (
    <>
      <Box className="flex justify-center font-bold text-xl mt-4">
        Trip Request Detail for Confirmation
      </Box>

      <Paper className="flex flex-co p-4 mt-4 text-xl" elevation={6}>
        <Box className="w-full">
          {tripType !== 'oneWay' && (
            <Box>
              <b>Estimated Price:</b>{' '}
              {`$${
                estimatedPrice(
                  tripType,
                  vehicleType,
                  pickupAddress.city,
                  dropoffAddress.city,
                ) || `N/A`
              }`}
            </Box>
          )}
          <Box>
            <b>Trip Type:</b> {TRIP_TYPES[tripType]}
          </Box>
          <Box>
            <b>First Name:</b> {firstName}
          </Box>
          <Box>
            <b>Last Name:</b> {lastName}
          </Box>
          <Box>
            <b>Phone Number:</b> {phoneNumber}
          </Box>
          <Box>
            <b>Email:</b> {email}
          </Box>
          <Box>
            <b>Pickup Date & Time:</b>{' '}
            {moment(pickupDateTime).format('MMM Do, YYYY @ hh:mm A')}
          </Box>
          <Box>
            <b># of Passengers:</b> {numOfPassengers}
          </Box>
          <Box>
            <b># of Checked Bags:</b> {numOfLuggagesChecked}
          </Box>
          <Box>
            <b># of Carry-on Bags:</b> {numOfLuggagesCarryOn}
          </Box>

          <Box>
            <b>Pickup Address:</b> {pickupAddress.address}, {pickupAddress.city}
            , {pickupAddress.state} {pickupAddress.zip}
          </Box>
          <Box>
            <b>Dropoff Address:</b> {dropoffAddress.address},{' '}
            {dropoffAddress.city}, {dropoffAddress.state} {dropoffAddress.zip}
          </Box>
          <Box>
            <b>Vehicle Type:</b> {vehicleType}
          </Box>

          <Box className="mt-10">
            <TextField
              fullWidth
              placeholder="Additional requests"
              label="Additional requests - optional"
              multiline
              maxRows={10}
              variant="standard"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              inputProps={{ style: { fontSize: '1.2em' } }}
              InputLabelProps={{
                style: { fontSize: '1.2em', fontWeight: 'bold' },
              }}
            />
          </Box>

          <Box className="mt-10">Please verify your trip information.</Box>
          <Box className="flex">
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={disableEamil}
                  onClick={() => setDisableEamil(!disableEamil)}
                />
              }
              label={`Disable Email Confirmation (for test only)`}
            /> */}
          </Box>
        </Box>
      </Paper>
    </>
  );
}
