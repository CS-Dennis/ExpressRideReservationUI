import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import ReservationProgressView from "../components/ReservationProgressView";
import TripDetailsForm from "../components/TripDetailsForm";
import { TRIP_TYPES, VEHICLE_TYPES } from "../constants";
import VehicleForm from "../components/VehicleForm";

export default function Home() {
  const [step, setStep] = useState(0);
  const [tripDetails, setTripDetails] = useState({
    tripType: "One Way trip (A to B)",
    pickupDateTime: "2024-08-03 14:00:00",
    firstName: "John",
    lastName: "Doe",
    pickupAddress: "2222 N Stemmons Fwy, Dallas, TX 75207",
    dropoffAddress: "2400 Aviation Dr, Dallas, TX 75261",
    numOfPassengers: 1,
    numOfLuggages: 0,
  });

  // store the tripType keys
  const [tripType, setTripType] = useState(Object.keys(TRIP_TYPES)[0]);

  const [numOfPassengers, setNumOfPassengers] = useState(1);
  const [numOfLuggages, setNumOfLuggages] = useState(0);
  const [vehicleType, setVehicleType] = useState(VEHICLE_TYPES[0]);

  const backStep = () => {
    if (step == 0) {
      return;
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const nextStep = () => {
    if (step === 3) {
      return;
    } else {
      setStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    console.log(step);
    console.log(tripDetails);
  }, [step]);

  useEffect(() => {
    console.log("vehicleType:", vehicleType);
  }, [vehicleType]);

  return (
    <>
      <Box className="mx-10">
        <Grid container>
          <Grid item md={12} lg={2} />
          <Grid item md={12} lg={8} className="w-full">
            <Title title={"Express Riding Service"} />
            <ReservationProgressView step={step} />

            <Box className="mt-4">
              {step === 0 && (
                <TripDetailsForm
                  tripType={tripType}
                  setTripType={setTripType}
                  numOfPassengers={numOfPassengers}
                  setNumOfPassengers={setNumOfPassengers}
                  numOfLuggages={numOfLuggages}
                  setNumOfLuggages={setNumOfLuggages}
                />
              )}

              {step === 1 && (
                <>
                  <Box>
                    <VehicleForm setVehicleType={setVehicleType} />
                  </Box>
                </>
              )}

              {step === 2 && (
                <>
                  <Box>Confirm</Box>
                </>
              )}

              {step === 3 && (
                <>
                  <Box>Reservation sent</Box>
                </>
              )}
            </Box>

            <Box className="flex justify-evenly mt-28 w-full">
              <Box className="flex w-full justify-center">
                {step > 0 && (
                  <Button onClick={() => backStep()} variant="contained">
                    Back
                  </Button>
                )}
              </Box>
              <Box className="flex justify-center w-full">
                {step < 3 && (
                  <Button onClick={() => nextStep()} variant="contained">
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} lg={2} />
        </Grid>
      </Box>
    </>
  );
}
