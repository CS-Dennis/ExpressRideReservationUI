import { Backdrop, Box, Button, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import ReservationProgressView from '../components/ReservationProgressView';
import TripDetailsForm from '../components/TripDetailsForm';
import { APP_TITLE, TRIP_TYPES, VEHICLE_TYPES } from '../constants';
import TripConfirmation from '../components/TripConfirmation';
import moment from 'moment';
import { submitRideRequest } from '../services/apis';

export default function Home() {
  const [step, setStep] = useState(0);

  // Trip Details Form
  // store the tripType keys
  const [tripType, setTripType] = useState(Object.keys(TRIP_TYPES)[0]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+1');
  const [email, setEmail] = useState('');

  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [numOfPassengers, setNumOfPassengers] = useState(1);
  const [numOfLuggagesChecked, setNumOfLuggagesChecked] = useState(0);
  const [numOfLuggagesCarryOn, setNumOfLuggagesCarryOn] = useState(0);

  const [pickupAddress, setPickupAddress] = useState({
    address: '',
    city: '',
    state: 'Texas',
    zip: '',
  });
  const [dropoffAddress, setDropoffAddress] = useState({
    address: '',
    city: '',
    state: 'Texas',
    zip: '',
  });

  // Vehicle Form
  const [vehicleType, setVehicleType] = useState(VEHICLE_TYPES[0]);

  const [notes, setNotes] = useState('');

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

  const [disableEamil, setDisableEamil] = useState(true);

  // loading
  const [loading, setLoading] = useState(false);

  const formValidation = () => {
    if (firstName.trim() === '') {
      setFirstNameFlag(true);
      return false;
    } else {
      setFirstNameFlag(false);
    }

    if (lastName.trim() === '') {
      setLastNameFlag(true);
      return false;
    } else {
      setLastNameFlag(false);
    }

    if (phoneNumber.trim() === '+1' || phoneNumber.trim() === '') {
      setPhoneNumberFlag(true);
      return false;
    } else {
      setPhoneNumberFlag(false);
    }

    if (email.trim() === '') {
      setEmailFlag(true);
      return false;
    } else {
      setEmailFlag(false);
    }

    if (pickupDateTime === null || pickupDateTime === '') {
      setPickupDateTimeFlag(true);
      return false;
    } else {
      setPickupDateTimeFlag(false);
    }

    if (pickupAddress.address.trim() === '') {
      setPickupAddressFlag(true);
      return false;
    } else {
      setPickupAddressFlag(false);
    }

    if (pickupAddress.city.trim() === '') {
      setPickupCityFlag(true);
      return false;
    } else {
      setPickupCityFlag(false);
    }

    if (dropoffAddress.address.trim() === '') {
      setDropoffAddressFlag(true);
      return false;
    } else {
      setDropoffAddressFlag(false);
    }

    if (dropoffAddress.city.trim() === '') {
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

  const rideRequestConfirmation = () => {
    const request = {
      tripType: tripType,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      pickupDateTime: moment(pickupDateTime).toLocaleString(),
      numOfPassengers: numOfPassengers,
      numOfCheckedBags: numOfLuggagesChecked,
      numOfCarryOnBags: numOfLuggagesCarryOn,
      pickupAddress: pickupAddress.address,
      pickupCity: pickupAddress.city,
      pickupState: pickupAddress.state,
      pickupZip: pickupAddress.zip,
      dropoffAddress: dropoffAddress.address,
      dropoffCity: dropoffAddress.city,
      dropoffState: dropoffAddress.state,
      dropoffZip: dropoffAddress.zip,
      vehicleType: vehicleType,
      notes: notes,
    };
    setLoading(true);
    submitRideRequest(request, disableEamil).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setLoading(false);
        console.log('success');
        nextStep();
      } else {
        // error
        setLoading(false);
        console.log('error');
      }
    });
  };

  useEffect(() => {}, [step]);

  useEffect(() => {}, [vehicleType]);

  return (
    <>
      {/* <Box className="mx-2"> */}
      <Grid container>
        <Grid item md={12} lg={1} />
        <Grid item md={12} lg={10} className="w-full">
          <Title title={APP_TITLE} />
          <ReservationProgressView step={step} />

          <Box className="mt-4 px-4">
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
                    notes={notes}
                    setNotes={setNotes}
                    disableEamil={disableEamil}
                    setDisableEamil={setDisableEamil}
                  />
                </Box>
              </>
            )}

            {step === 2 && (
              <>
                <Box className="flex flex-col justify-center place-items-center w-full text-2xl mt-10">
                  <Box>
                    Congrats! The reservation request has been sent
                    successfully!
                  </Box>
                  <Box>You can check your request in my email inbox.</Box>
                  <Box>
                    The driver will send you the trip confirmation to your email
                    inbox asap.
                  </Box>
                </Box>
              </>
            )}
          </Box>

          <Box className="flex justify-evenly my-10 w-full">
            <Box className="flex w-full justify-center">
              {step === 1 && (
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
                  onClick={() => rideRequestConfirmation()}
                >
                  Confirm
                </Button>
              )}
            </Box>
          </Box>
          <Box className="flex w-full justify-center">
            {step === 2 && (
              <Button
                onClick={() => window.location.reload()}
                variant="contained"
              >
                Reserve Another Trip
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item md={12} lg={1} />
      </Grid>
      {/* </Box> */}

      <Backdrop open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </>
  );
}
