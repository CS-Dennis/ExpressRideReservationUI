import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import ReservationProgressView from "../components/ReservationProgressView";
import TripDetailsForm from "../components/TripDetailsForm";

export default function Home() {
  const [step, setStep] = useState(0);

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

  return (
    <>
      <Box className="mx-10">
        <Grid container>
          <Grid item xs={12} md={2} />
          <Grid item xs={12} md={8}>
            <Title title={"Express Riding Service"} />
            <ReservationProgressView step={step} />

            <Box>
              <TripDetailsForm />
            </Box>

            <Box className="flex justify-evenly">
              <Button onClick={() => backStep()} variant="contained">
                Back
              </Button>
              <Button onClick={() => nextStep()} variant="contained">
                Next
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={2} />
        </Grid>
      </Box>
    </>
  );
}
