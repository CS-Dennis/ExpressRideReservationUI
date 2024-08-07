import { Box, Paper } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function TripConfirmation({
  tripType,
  firstName,
  lastName,
  phoneNumber,
  email,
  pickupDateTime,
  numOfPassengers,
  numOfLuggages,
  pickupAddress,
  dropoffAddress,
  vehicleType,
}) {
  //   const [tripDetails, setTripDetails] = useState({
  //     tripType: tripType,
  //     firstName: firstName,
  //     lastName: lastName,
  //     phoneNumber: phoneNumber,
  //     email: email,
  //     pickupDateTime: pickupDateTime,
  //     numOfPassengers: numOfPassengers,
  //     numOfLuggages: numOfLuggages,
  //     pickupAddress: pickupAddress,
  //     dropoffAddress: dropoffAddress,
  //   });

  useEffect(() => {
    console.log(pickupAddress);
  }, []);

  return (
    <>
      <Box className="flex justify-center font-bold text-xl mt-4">
        Trip Detail for Confirmation
      </Box>

      <Paper className="flex flex-co p-4 mt-4" elevation={6}>
        <Box>
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
            <b># of Luggages:</b> {numOfLuggages}
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
            Once confirmed, the trip request will be send to the driver and your
            email addresses.
          </Box>
        </Box>
      </Paper>
    </>
  );
}
