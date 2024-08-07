import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { VEHICLE_TYPES } from "../constants";

export default function VehicleForm({ vehicleType, setVehicleType }) {
  return (
    <>
      <Box className="text-3xl ">Choose Your Vehicle Type</Box>
      <Box className="flex mt-10">
        <RadioGroup
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <Box className="flex">
            <FormControlLabel
              value={VEHICLE_TYPES[0]}
              control={<Radio />}
              label={<img src="assets/imgs/sedan1.png" className="w-50" />}
            />
            <Box className="font-bold text-xl">
              <Box>Sedan</Box>
              <Box>4 Passengers - 4 Luggages</Box>
            </Box>
          </Box>

          <Box className="flex mt-16">
            <FormControlLabel
              value={VEHICLE_TYPES[1]}
              control={<Radio />}
              label={<img src="assets/imgs/SUV1.png" className="w-50" />}
            />
            <Box className="font-bold text-xl">
              <Box>SUV</Box>
              <Box>6 Passengers - 4 Luggages</Box>
            </Box>
          </Box>
        </RadioGroup>
      </Box>
    </>
  );
}
