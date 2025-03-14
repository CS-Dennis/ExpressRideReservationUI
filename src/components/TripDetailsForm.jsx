import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { STATES, TRIP_TYPES, VEHICLE_TYPES } from "../constants";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MuiTelInput } from "mui-tel-input";
import moment from "moment";
import { capitalizeString } from "../util";
import VehicleForm from "./VehicleForm";

export default function TripDetailsForm({
  tripType,
  setTripType,

  // required info
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,

  // required info
  pickupDateTime,
  setPickupDateTime,
  vehicleType,
  setVehicleType,
  numOfPassengers,
  setNumOfPassengers,
  numOfLuggagesChecked,
  setNumOfLuggagesChecked,
  numOfLuggagesCarryOn,
  setNumOfLuggagesCarryOn,

  // required info
  pickupAddress,
  setPickupAddress,
  dropoffAddress,
  setDropoffAddress,

  // form flags
  firstNameFlag,
  lastNameFlag,
  phoneNumberFlag,
  emailFlag,
  pickupDateTimeFlag,
  pickupAddressFlag,
  pickupCityFlag,
  dropoffAddressFlag,
  dropoffCityFlag,
}) {
  useEffect(() => {
    setNumOfPassengers(1);
    setNumOfLuggagesChecked(0);
    setNumOfLuggagesCarryOn(0);
  }, [vehicleType]);

  return (
    <>
      <Box>
        <Box className="font-bold text-4xl">Service Type</Box>
        <FormControl variant="standard" className="w-full">
          <Select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            sx={{ fontSize: "1.4em" }}
          >
            {Object.keys(TRIP_TYPES).map((tripType) => (
              <MenuItem value={tripType} key={tripType} className="text-3xl">
                {TRIP_TYPES[tripType]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="mt-8">
        <Box className="font-bold text-4xl">Rider Information</Box>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Box className="mx-1">
              <TextField
                className="w-full"
                label="First Name"
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                color={firstNameFlag ? "error" : "primary"}
                focused={firstNameFlag ? true : false}
                inputProps={{ style: { fontSize: "1.4em" } }}
                InputLabelProps={{ style: { fontSize: "1.4em" } }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box className="mx-1">
              <TextField
                className="w-full"
                label="Last Name"
                variant="standard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                color={lastNameFlag ? "error" : "primary"}
                focused={lastNameFlag ? true : false}
                inputProps={{ style: { fontSize: "1.4em" } }}
                InputLabelProps={{ style: { fontSize: "1.4em" } }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} lg={6}>
            <Box className="mx-1 mt-4 ">
              <MuiTelInput
                className="w-full"
                defaultCountry="US"
                disableDropdown
                forceCallingCode
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                placeholder="Phone number"
                color={phoneNumberFlag ? "error" : "primary"}
                focused={phoneNumberFlag ? true : false}
                inputProps={{ style: { fontSize: "1.4em" } }}
                InputLabelProps={{ style: { fontSize: "1.4em" } }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box className="mx-1 mt-4">
              <TextField
                className="w-full"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color={emailFlag ? "error" : "primary"}
                focused={emailFlag ? true : false}
                inputProps={{ style: { fontSize: "1.4em" } }}
                InputLabelProps={{ style: { fontSize: "1.4em" } }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className="flex flex-col justify-between mt-12 font-bold w-full">
        <Box className="text-4xl">Pickup Date & Time</Box>
        <Box className="mt-4">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label=""
              className="w-full"
              value={pickupDateTime}
              onChange={(e) => setPickupDateTime(moment(e))}
              sx={{
                borderColor: "red",
                borderWidth: pickupDateTimeFlag ? "1px" : "0px",
                borderStyle: "solid",
                borderRadius: "5px",
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <Box>
        <VehicleForm
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
        />
      </Box>

      <Box className="flex w-full mt-4 justify-stretch">
        <Box className="mr-2 w-full">
          <FormControl variant="standard" className="w-full">
            <InputLabel
              id="num-of-passengers"
              className="font-bold"
              sx={{ fontWeight: "bold", fontSize: "1.4em" }}
            >
              # of Passengers
            </InputLabel>
            <Select
              labelId="num-of-passengers"
              value={numOfPassengers}
              onChange={(e) => setNumOfPassengers(e.target.value)}
              sx={{ fontSize: "1.4em" }}
            >
              {(vehicleType === VEHICLE_TYPES[0]
                ? [1, 2, 3, 4]
                : [1, 2, 3, 4, 5, 6]
              ).map((num) => (
                <MenuItem value={num} key={num} className="text-3xl">
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box className="ml-2 w-full flex">
          <FormControl variant="standard" className="w-full">
            <InputLabel
              id="num-of-luggages"
              className="font-bold"
              sx={{ fontWeight: "bold", fontSize: "1.4em" }}
            >
              # of Checked Bags
            </InputLabel>
            <Select
              labelId="num-of-luggages"
              value={numOfLuggagesChecked}
              onChange={(e) => setNumOfLuggagesChecked(e.target.value)}
              sx={{ fontSize: "1.4em" }}
            >
              {(vehicleType === VEHICLE_TYPES[0]
                ? [0, 1, 2]
                : [0, 1, 2, 3, 4, 5]
              ).map((num) => (
                <MenuItem value={num} key={num} className="text-3xl">
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" className="w-full">
            <InputLabel
              id="num-of-luggages"
              className="font-bold"
              sx={{ fontWeight: "bold", fontSize: "1.4em" }}
            >
              # of Carry-On Bags
            </InputLabel>
            <Select
              labelId="num-of-luggages"
              value={numOfLuggagesCarryOn}
              onChange={(e) => setNumOfLuggagesCarryOn(e.target.value)}
              sx={{ fontSize: "1.4em" }}
            >
              {(vehicleType === VEHICLE_TYPES[0]
                ? [0, 1, 2, 3]
                : [0, 1, 2, 3, 4, 5, 6]
              ).map((num) => (
                <MenuItem value={num} key={num} className="text-3xl">
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box className="mt-12 flex w-full justify-evenly">
        <Box className="mr-2 w-full">
          <Box className="font-bold text-4xl">Pickup Address</Box>
          <TextField
            className="w-full"
            label="Address"
            variant="standard"
            value={pickupAddress.address}
            onChange={(e) =>
              setPickupAddress({ ...pickupAddress, address: e.target.value })
            }
            color={pickupAddressFlag ? "error" : "primary"}
            focused={pickupAddressFlag ? true : false}
            inputProps={{ style: { fontSize: "1.4em" } }}
            InputLabelProps={{ style: { fontSize: "1.4em" } }}
          />
          <TextField
            className="w-full"
            label="City"
            variant="standard"
            value={pickupAddress.city}
            onChange={(e) =>
              setPickupAddress({
                ...pickupAddress,
                city: capitalizeString(e.target.value),
              })
            }
            color={pickupCityFlag ? "error" : "primary"}
            focused={pickupCityFlag ? true : false}
            inputProps={{ style: { fontSize: "1.4em" } }}
            InputLabelProps={{ style: { fontSize: "1.4em" } }}
          />
          <Select
            value={"Texas"}
            sx={{ fontSize: "1.4em" }}
            className="w-full mt-4"
            variant="standard"
          >
            {STATES.map((state) => (
              <MenuItem value={state} key={state} sx={{ fontSize: "1.4em" }}>
                {state}
              </MenuItem>
            ))}
          </Select>
          <TextField
            className="w-full"
            label="Zip (optional)"
            variant="standard"
            value={pickupAddress.zip}
            onChange={(e) =>
              setPickupAddress({ ...pickupAddress, zip: e.target.value })
            }
            inputProps={{ style: { fontSize: "1.4em" } }}
            InputLabelProps={{ style: { fontSize: "1.4em" } }}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box className="ml-2 w-full">
          <Box className="font-bold text-4xl">Dropoff Address</Box>
          <TextField
            className="w-full"
            label="Address"
            variant="standard"
            value={dropoffAddress.address}
            onChange={(e) =>
              setDropoffAddress({ ...dropoffAddress, address: e.target.value })
            }
            color={dropoffAddressFlag ? "error" : "primary"}
            focused={dropoffAddressFlag ? true : false}
            inputProps={{ style: { fontSize: "1.4em" } }}
            InputLabelProps={{ style: { fontSize: "1.4em" } }}
          />
          <TextField
            className="w-full"
            label="City"
            variant="standard"
            value={dropoffAddress.city}
            onChange={(e) =>
              setDropoffAddress({
                ...dropoffAddress,
                city: capitalizeString(e.target.value),
              })
            }
            color={dropoffCityFlag ? "error" : "primary"}
            focused={dropoffCityFlag ? true : false}
            inputProps={{ style: { fontSize: "1.4em" } }}
            InputLabelProps={{ style: { fontSize: "1.4em" } }}
          />
          <Select
            value={"Texas"}
            className="w-full mt-4"
            variant="standard"
            sx={{ fontSize: "1.4em" }}
          >
            {STATES.map((state) => (
              <MenuItem value={state} key={state} sx={{ fontSize: "1.4em" }}>
                {state}
              </MenuItem>
            ))}
          </Select>
          <TextField
            className="w-full"
            label="Zip (optional)"
            variant="standard"
            value={dropoffAddress.zip}
            onChange={(e) =>
              setDropoffAddress({ ...dropoffAddress, zip: e.target.value })
            }
            inputProps={{ style: { fontSize: "1.4em" } }}
            InputLabelProps={{ style: { fontSize: "1.4em" } }}
          />
        </Box>
      </Box>
    </>
  );
}
