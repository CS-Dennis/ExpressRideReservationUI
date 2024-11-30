import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import ReservationProgressView from '../components/ReservationProgressView';
import TripDetailsForm from '../components/TripDetailsForm';
import {
  APP_TITLE,
  TRIP_REQUEST_STATUS,
  TRIP_TYPES,
  VEHICLE_TYPES,
} from '../constants';
import TripConfirmation from '../components/TripConfirmation';
import moment from 'moment';
import { submitRideRequest } from '../services/apis'; // spring boot backend service
import { AppContext, env, supabase_client } from '../App';
import { useNavigate } from 'react-router-dom';
import { checkUserLogin } from '../util';

export default function Home() {
  const context = useContext(AppContext);
  const navigation = useNavigate();
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

  useEffect(() => {
    if (context.session && context.userProfile) {
      setFirstName(context.userProfile?.first_name);
      setLastName(context.userProfile?.last_name);
      setEmail(context.userProfile?.email);
      setPhoneNumber(context.userProfile?.phone);
    }
  }, [context.session]);

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

  const nextStep = async () => {
    if (step === 2) {
      return;
    } else if (formValidation()) {
      // if the rider_info is null, save the user's profile in rider_info table
      if (env === 'dev') {
        console.log('dev', 'validated');
        console.log('dev', context.userProfile?.first_name);
      }

      if (
        !context.userProfile?.first_name &&
        !context.userProfile?.last_name &&
        !context.userProfile?.phone
      ) {
        setLoading(true);
        const { error } = await supabase_client
          .from('rider_info')
          .insert([
            {
              user_id: context.session.user.id,
              first_name: firstName,
              last_name: lastName,
              phone: phoneNumber,
            },
          ])
          .select();
        if (error) {
          console.log(error);
        }
        if (env === 'dev') {
          console.log('dev', {
            user_id: context.session.user.id,
            first_name: firstName,
            last_name: lastName,
            phone: phoneNumber,
          });
        }

        setLoading(false);
      }

      setStep((prev) => prev + 1);
    }
  };

  const rideRequestConfirmation = async () => {
    setLoading(true);

    var request = {
      // user_id: null,
      // firstName: firstName,
      // lastName: lastName,
      // phone: phoneNumber,
      // email: email,
      trip_type: tripType,
      pickup_datetime: moment(pickupDateTime),
      num_passengers: numOfPassengers,
      num_bags_checked: numOfLuggagesChecked,
      num_bags_carryon: numOfLuggagesCarryOn,
      pickup_address: pickupAddress.address,
      pickup_city: pickupAddress.city,
      pickup_state: pickupAddress.state,
      pickup_zip: pickupAddress.zip,
      dropoff_address: dropoffAddress.address,
      dropoff_city: dropoffAddress.city,
      dropoff_state: dropoffAddress.state,
      dropoff_zip: dropoffAddress.zip,
      vehicle_type: vehicleType,
      notes: notes,
      status: TRIP_REQUEST_STATUS.tripRequested,
    };

    // if user logged in, add user_id
    if (context.session) {
      request = { ...request, user_id: context.session.user.id };
    }
    // if guest user, add firstName, lastName, phone, email
    else {
      request = {
        ...request,
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        email: email,
      };
    }

    if (env === 'dev') {
      console.log('dev', request);
    }

    const { error } = await supabase_client
      .from('ride_request')
      .insert([request]);

    if (error) {
      console.log(error);
    } else {
      setLoading(false);
      nextStep();
    }

    // placeholder for configurable feature to toggle email confirmation
    if (env === 'config') {
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
    }
  };

  useEffect(() => {
    checkUserLogin(context, navigation);
  }, []);

  return (
    <>
      {/* <Box className="mx-2"> */}
      <Grid container>
        <Grid size={{ md: 12, lg: 1 }} />
        <Grid size={{ md: 12, lg: 12 }} className="w-full">
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
                    Congrats! The reservation request has been submitted
                    successfully!
                  </Box>
                  <Box className="mt-10">
                    You can check your request status on your account - trips
                    page.
                  </Box>
                  <Box className="mt-10">
                    The driver will send you the trip confirmation with a price
                    for your confirmation.
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
        <Grid size={{ md: 12, lg: 1 }} />
      </Grid>
      {/* </Box> */}

      <Backdrop open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </>
  );
}
