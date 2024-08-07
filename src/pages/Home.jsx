import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import ReservationProgressView from "../components/ReservationProgressView";
import TripDetailsForm from "../components/TripDetailsForm";
import { APP_TITLE, TRIP_TYPES, VEHICLE_TYPES } from "../constants";
import VehicleForm from "../components/VehicleForm";
import TripConfirmation from "../components/TripConfirmation";

export default function Home() {
  const [step, setStep] = useState(0);

  // store the tripType keys
  const [tripType, setTripType] = useState(Object.keys(TRIP_TYPES)[0]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [numOfPassengers, setNumOfPassengers] = useState(1);
  const [numOfLuggages, setNumOfLuggages] = useState(0);

  const [pickupAddress, setPickupAddress] = useState({
    address: "",
    city: "",
    state: "Texas",
    zip: "",
  });
  const [dropoffAddress, setDropoffAddress] = useState({
    address: "",
    city: "",
    state: "Texas",
    zip: "",
  });

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
  }, [step]);

  useEffect(() => {
    console.log("vehicleType:", vehicleType);
  }, [vehicleType]);

  return (
    <>
      <Box className="mx-10">
        <Grid container>
          <Grid item md={12} lg={1} />
          <Grid item md={12} lg={10} className="w-full">
            <Title title={APP_TITLE} />
            <ReservationProgressView step={step} />

            <Box className="mt-4">
              {step === 0 && (
                <TripDetailsForm
                  tripType={tripType}
                  setTripType={setTripType}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  email={email}
                  setEmail={setEmail}
                  pickupDateTime={pickupDateTime}
                  setPickupDateTime={setPickupDateTime}
                  numOfPassengers={numOfPassengers}
                  setNumOfPassengers={setNumOfPassengers}
                  numOfLuggages={numOfLuggages}
                  setNumOfLuggages={setNumOfLuggages}
                  pickupAddress={pickupAddress}
                  setPickupAddress={setPickupAddress}
                  dropoffAddress={dropoffAddress}
                  setDropoffAddress={setDropoffAddress}
                />
              )}

              {step === 1 && (
                <>
                  <Box>
                    <VehicleForm
                      vehicleType={vehicleType}
                      setVehicleType={setVehicleType}
                    />
                  </Box>
                </>
              )}

              {step === 2 && (
                <>
                  <Box>
                    <TripConfirmation
                      tripType={tripType}
                      firstName={firstName}
                      lastName={lastName}
                      phoneNumber={phoneNumber}
                      email={email}
                      pickupDateTime={pickupDateTime}
                      numOfPassengers={numOfPassengers}
                      numOfLuggages={numOfLuggages}
                      pickupAddress={pickupAddress}
                      dropoffAddress={dropoffAddress}
                      vehicleType={vehicleType}
                    />
                  </Box>
                </>
              )}

              {step === 3 && (
                <>
                  <Box>Reservation sent</Box>
                </>
              )}
            </Box>

            <Box className="flex justify-evenly my-10 w-full">
              <Box className="flex w-full justify-center">
                {step > 0 && (
                  <Button onClick={() => backStep()} variant="contained">
                    Back
                  </Button>
                )}
              </Box>
              <Box className="flex justify-center w-full">
                {step < 2 && (
                  <Button onClick={() => nextStep()} variant="contained">
                    Next
                  </Button>
                )}
                {step === 2 && (
                  <Button variant="contained" color="success">
                    Confirm
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} lg={1} />
        </Grid>
      </Box>
    </>
  );
}
