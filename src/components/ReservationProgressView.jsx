import { Box, Step, StepLabel, Stepper } from '@mui/material';

export default function ReservationProgressView({ step }) {
  const steps = ['Trip Details', 'Confirm'];

  return (
    <>
      <Box className="flex flex-col pt-4 px-4">
        <Box className="text-2xl font-bold flex justify-center text-center">
          Express Ride Reservation Details
        </Box>
        <Box className="font-bold text-xl text-center">
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
