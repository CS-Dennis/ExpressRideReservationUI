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

  // Trip Details Form
  // store the tripType keys
  const [tripType, setTripType] = useState(Object.keys(TRIP_TYPES)[0]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+1");
  const [email, setEmail] = useState("");

  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [numOfPassengers, setNumOfPassengers] = useState(1);
  const [numOfLuggagesChecked, setNumOfLuggagesChecked] = useState(0);
  const [numOfLuggagesCarryOn, setNumOfLuggagesCarryOn] = useState(0);

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

  // Vehicle Form
  const [vehicleType, setVehicleType] = useState(VEHICLE_TYPES[0]);

  // Trip Details Form Flags
  const [firstNameFlag, setFirstNameFlag] = useState(null);
  const [lastNameFlag, setLastNameFlag] = useState(null);
  const [phoneNumberFlag, setPhoneNumberFlag] = useState(null);
  const [emailFlag, setEmailFlag] = useState(null);
  const [pickupDateTimeFlag, setPickupDateTimeFlag] = useState(null);

  const [pickupAddressFlag, setPickupAddressFlag] = useState(null);
  const [pickupCityFlag, setPickupCityFlag] = useState(null);
  const [dropoffAddressFlag, setDropoffAddressFlag] = useState(null);
  const [dropoffCityFlag, setDropoffCityFlag] = useState(null);

  const formValidation = () => {
    if (firstName.trim() === "") {
      setFirstNameFlag(true);
      return false;
    } else {
      setFirstNameFlag(false);
    }

    if (lastName.trim() === "") {
      setLastNameFlag(true);
      return false;
    } else {
      setLastNameFlag(false);
    }

    if (phoneNumber.trim() === "+1" || phoneNumber.trim() === "") {
      setPhoneNumberFlag(true);
      return false;
    } else {
      setPhoneNumberFlag(false);
    }

    if (email.trim() === "") {
      setEmailFlag(true);
      return false;
    } else {
      setEmailFlag(false);
    }

    if (pickupDateTime === null || pickupDateTime === "") {
      setPickupDateTimeFlag(true);
      return false;
    } else {
      setPickupDateTimeFlag(false);
    }

    if (pickupAddress.address.trim() === "") {
      setPickupAddressFlag(true);
      return false;
    } else {
      setPickupAddressFlag(false);
    }

    if (pickupAddress.city.trim() === "") {
      setPickupCityFlag(true);
      return false;
    } else {
      setPickupCityFlag(false);
    }

    if (dropoffAddress.address.trim() === "") {
      setDropoffAddressFlag(true);
      return false;
    } else {
      setDropoffAddressFlag(false);
    }

    if (dropoffAddress.city.trim() === "") {
      setDropoffCityFlag(true);
      return false;
    } else {
      setDropoffCityFlag(false);
    }

    return true;
  };

  const backStep = () => {
    if (step == 0) {
      return;
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const nextStep = () => {
    if (step === 2) {
      return;
    } else if (formValidation()) {
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
                  vehicleType={vehicleType}
                  setVehicleType={setVehicleType}
                  numOfPassengers={numOfPassengers}
                  setNumOfPassengers={setNumOfPassengers}
                  numOfLuggagesChecked={numOfLuggagesChecked}
                  setNumOfLuggagesChecked={setNumOfLuggagesChecked}
                  numOfLuggagesCarryOn={numOfLuggagesCarryOn}
                  setNumOfLuggagesCarryOn={setNumOfLuggagesCarryOn}
                  pickupAddress={pickupAddress}
                  setPickupAddress={setPickupAddress}
                  dropoffAddress={dropoffAddress}
                  setDropoffAddress={setDropoffAddress}
                  firstNameFlag={firstNameFlag}
                  lastNameFlag={lastNameFlag}
                  phoneNumberFlag={phoneNumberFlag}
                  emailFlag={emailFlag}
                  pickupDateTimeFlag={pickupDateTimeFlag}
                  pickupAddressFlag={pickupAddressFlag}
                  pickupCityFlag={pickupCityFlag}
                  dropoffAddressFlag={dropoffAddressFlag}
                  dropoffCityFlag={dropoffCityFlag}
                />
              )}

              {/* {step === 1 && (
                <>
                  <Box>
                    <VehicleForm
                      vehicleType={vehicleType}
                      setVehicleType={setVehicleType}
                    />
                  </Box>
                </>
              )} */}

              {step === 1 && (
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
                      numOfLuggagesChecked={numOfLuggagesChecked}
                      numOfLuggagesCarryOn={numOfLuggagesCarryOn}
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
                {step < 1 && (
                  <Button onClick={() => nextStep()} variant="contained">
                    Next
                  </Button>
                )}
                {step === 1 && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => nextStep()}
                  >
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
