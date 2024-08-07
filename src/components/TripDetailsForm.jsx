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
import React, { useState } from "react";
import {
  NUM_OF_LUGGAGES,
  NUM_OF_PASSENGERS,
  STATES,
  TRIP_TYPES,
} from "../constants";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MuiTelInput } from "mui-tel-input";
import moment from "moment";
import { capitalizeString } from "../util";

export default function TripDetailsForm({
  tripType,
  setTripType,

  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,

  pickupDateTime,
  setPickupDateTime,
  numOfPassengers,
  setNumOfPassengers,
  numOfLuggages,
  setNumOfLuggages,

  pickupAddress,
  setPickupAddress,
  dropoffAddress,
  setDropoffAddress,
}) {
  return (
    <>
      <Box>
        <FormControl variant="standard" className="w-full">
          <InputLabel
            id="service-type"
            className="font-bold"
            sx={{ fontWeight: "bold" }}
          >
            Service Type
          </InputLabel>
          <Select
            labelId="service-type"
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
        <Box className="font-bold">Rider Information</Box>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Box className="mx-1">
              <TextField
                className="w-full"
                label="First Name"
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className="flex flex-col justify-between mt-12 font-bold w-full">
        <Box>Pickup Date & Time</Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label=""
              className="w-full"
              value={pickupDateTime}
              onChange={(e) => setPickupDateTime(moment(e))}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <Box className="flex w-full mt-4 justify-stretch">
        <Box className="mr-2 w-full">
          <FormControl variant="standard" className="w-full">
            <InputLabel
              id="num-of-passengers"
              className="font-bold"
              sx={{ fontWeight: "bold" }}
            >
              # of Passengers
            </InputLabel>
            <Select
              labelId="num-of-passengers"
              value={numOfPassengers}
              onChange={(e) => setNumOfPassengers(e.target.value)}
              sx={{ fontSize: "1.4em" }}
            >
              {NUM_OF_PASSENGERS.map((num) => (
                <MenuItem value={num} key={num} className="text-3xl">
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box className="ml-2 w-full">
          <FormControl variant="standard" className="w-full">
            <InputLabel
              id="num-of-luggages"
              className="font-bold"
              sx={{ fontWeight: "bold" }}
            >
              # of Luggages
            </InputLabel>
            <Select
              labelId="num-of-luggages"
              value={numOfLuggages}
              onChange={(e) => setNumOfLuggages(e.target.value)}
              sx={{ fontSize: "1.4em" }}
            >
              {NUM_OF_LUGGAGES.map((num) => (
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
          <Box className="font-bold">Pickup Address</Box>
          <TextField
            className="w-full"
            label="Address"
            variant="standard"
            value={pickupAddress.address}
            onChange={(e) =>
              setPickupAddress({ ...pickupAddress, address: e.target.value })
            }
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
          />
          <Select
            labelId="num-of-luggages"
            value={"Texas"}
            onChange={(e) => setNumOfLuggages(e.target.value)}
            // sx={{ fontSize: "1em" }}
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
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box className="ml-2 w-full">
          <Box className="font-bold">Dropoff Address</Box>
          <TextField
            className="w-full"
            label="Address"
            variant="standard"
            value={dropoffAddress.address}
            onChange={(e) =>
              setDropoffAddress({ ...dropoffAddress, address: e.target.value })
            }
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
          />
          <Select
            labelId="num-of-luggages"
            value={"Texas"}
            onChange={(e) => setNumOfLuggages(e.target.value)}
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
            value={dropoffAddress.zip}
            onChange={(e) =>
              setDropoffAddress({ ...dropoffAddress, zip: e.target.value })
            }
          />
        </Box>
      </Box>
    </>
  );
}
