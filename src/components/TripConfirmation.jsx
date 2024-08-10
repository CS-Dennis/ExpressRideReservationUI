import { Box, Paper, TextField } from "@mui/material";
import moment from "moment";

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
}) {
  return (
    <>
      <Box className="flex justify-center font-bold text-xl mt-4">
        Trip Detail for Confirmation
      </Box>

      <Paper className="flex flex-co p-4 mt-4" elevation={6}>
        <Box className="w-full">
          <Box>
            <b>Trip Type:</b> {tripType}
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
            <b>Pickup Date & Time:</b>{" "}
            {moment(pickupDateTime).format("MMM Do, YYYY @ hh:mm A")}
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
            <b>Dropoff Address:</b> {dropoffAddress.address},{" "}
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
            />
          </Box>

          <Box className="mt-10">
            Once confirmed, the trip request will be send to the driver and your
            email addresses. <br />
            The driver will send you another confirmation email with final price
            ASAP.
          </Box>
        </Box>
      </Paper>
    </>
  );
}
