import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

export default function ReservationProgressView({ step }) {
  const steps = ["Trip Details", "Confirm"];

  return (
    <>
      <Box className="flex flex-col pt-4">
        <Box className="text-4xl font-bold flex justify-center">
          Express Ride Reservation Details
        </Box>
        <Box className="font-bold">
          Let us know your ride info and we will take care of your trips.
        </Box>

        <Box className="w-full pt-10">
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label, i) => (
              <Step key={i}>
                <StepLabel componentsProps={{ label: {} }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
    </>
  );
}
