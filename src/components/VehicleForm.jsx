import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { VEHICLE_TYPES } from "../constants";

export default function VehicleForm({ vehicleType, setVehicleType }) {
  return (
    <>
      <Box className="font-bold mt-4">Choose Your Vehicle Type</Box>
      <Box>
        <RadioGroup
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Box className="flex mt-4">
                <FormControlLabel
                  value={VEHICLE_TYPES[0]}
                  control={<Radio />}
                  label={<img src="assets/imgs/tesla.png" className="w-56" />}
                />
                <Box className="font-bold text-xl">
                  <Box>Sedan (Tesla)</Box>
                  <Box>4 Passengers - 2 Luggages</Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Box className="flex mt-4">
                <FormControlLabel
                  value={VEHICLE_TYPES[1]}
                  control={<Radio />}
                  label={<img src="assets/imgs/SUV1.png" className="w-56" />}
                />
                <Box className="font-bold text-xl">
                  <Box>SUV</Box>
                  <Box>6 Passengers - 5 Luggages</Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </RadioGroup>
      </Box>
    </>
  );
}
