import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { COLORS, DASHBAORD_PAGE } from "../constants";
import { Box, Button, Chip, Grid, Paper } from "@mui/material";
import { getRideRequestsByType } from "../services/apis";
import moment from "moment";

export default function Dashboard() {
  const [rideRequests, setRideRequests] = useState(null);
  const [tab, setTab] = useState(DASHBAORD_PAGE.newRequests);
  useEffect(() => {
    getRideRequestsByType(0)
      .then((res) => {
        console.log(res.data);
        setRideRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box className="mx-10">
        <Grid container>
          <Grid item md={12} lg={1} />
          <Grid item md={12} lg={10} className="w-full">
            <Title title={tab} />
            <Box className="flex justify-evenly mt-4 mb-2">
              <Button variant="contained" sx={{ backgroundColor: COLORS.blue }}>
                {DASHBAORD_PAGE.newRequests}
              </Button>
              <Button variant="contained" color="secondary">
                {DASHBAORD_PAGE.pendingRequests}
              </Button>
              <Button variant="contained" color="success">
                {DASHBAORD_PAGE.upcomingRides}
              </Button>
              <Button variant="contained" sx={{ backgroundColor: COLORS.grey }}>
                {DASHBAORD_PAGE.history}
              </Button>
            </Box>

            <Box>
              {rideRequests !== null &&
                `You are ${rideRequests.length} new requests pending your confirmation`}
            </Box>
            <Box>
              {rideRequests !== null &&
                rideRequests.map((request, i) => (
                  <Paper key={i} className="mb-4 flex flex-col" elevation={4}>
                    <Box className="p-2 bg-slate-200 flex w-full rounded-t-lg">
                      <Box className="w-full flex self-center">
                        {`Request submitted on: ` +
                          moment(
                            `${request.created[0]}-${request.created[1]}-${request.created[2]} ${request.created[3]}:${request.created[4]}:${request.created[5]}`
                          ).format("YYYY-MM-DD hh:mm:ss A")}
                      </Box>
                      <Box>
                        <Chip
                          label="New request"
                          sx={{ backgroundColor: "#0ea5e9", color: "#fff" }}
                        />
                      </Box>
                    </Box>

                    <Box className="p-4">
                      <Box>
                        <b>Customer Name: </b>
                        {`${request.firstName} ${request.lastName}`}
                      </Box>
                      <Box>
                        <Box>
                          <b>Passengers:</b> {request.numOfPassengers}
                        </Box>
                        {/* <Box>Checked: {request.numOfCheckedBags}</Box>
                        <Box>Carry-on: {request.numOfCarryOnBags}</Box> */}
                      </Box>
                      <Box>
                        <b>Pickup time:</b>{" "}
                        {moment(request.pickupDateTime).format(
                          "YYYY-MM-DD hh:mm:ss A"
                        )}
                      </Box>
                      <Box>
                        <b>Pickup address:</b>{" "}
                        {`${request.pickupAddress}, ${request.pickupCity}, ${request.pickupState} ${request.pickupZip}`}
                      </Box>
                      <Box>
                        <b>Dropoff address:</b>{" "}
                        {`${request.dropoffAddress}, ${request.dropoffCity}, ${request.dropoffState} ${request.dropoffZip}`}
                      </Box>

                      <Box className="flex justify-end">
                        <Button variant="contained">Details</Button>
                      </Box>
                    </Box>
                  </Paper>
                ))}
            </Box>

            <Grid item md={12} lg={1} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
