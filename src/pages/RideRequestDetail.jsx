import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { getRideRequestById } from "../services/apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Label, South } from "@mui/icons-material";
import moment from "moment";

export default function RideRequestDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState(null);
  const [rideRequest, setRideRequest] = useState(null);

  const [price, setPrice] = useState(null);
  const [driverNotes, setDriverNotes] = useState("");

  const [priceFlag, setPriceFlag] = useState(false);

  const confirm = () => {
    setPriceFlag(false);
    if (price <= 0 || price === null || price === "") {
      setPriceFlag(true);
    } else {
      // submit confirmation request
      const payload = {
        id: id,
        price: price,
        driverNotes: driverNotes,
      };
      return true;
    }
  };

  const reject = () => {
    // submit rejection request
    return false;
  };

  useEffect(() => {
    if (location.search.split("?id=")[1]) {
      setId(location.search.split("?id=")[1]);
      console.log(location.search.split("?id=")[1]);
      getRideRequestById(location.search.split("?id=")[1])
        .then((res) => {
          console.log(res.data);
          setRideRequest(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <Box className="mx-10">
        <Grid container>
          <Grid item md={12} lg={1} />
          <Grid item md={12} lg={10} className="w-full">
            <Title title={"Test"} />

            {/* back button */}
            <Box>
              <IconButton
                color="primary"
                size="large"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            </Box>

            <Box className="mb-4">
              <Paper>
                <Box className="p-4 bg-slate-200 w-full flex justify-between items-center">
                  <b>Request Status</b>
                  <Chip
                    label="New request"
                    sx={{ backgroundColor: "#0ea5e9", color: "#fff" }}
                  />
                </Box>
              </Paper>
            </Box>

            <Box className="mb-4">
              <Paper>
                <Box>
                  <Box className="p-4 bg-slate-200">
                    <b>Client Info</b>
                  </Box>
                  <Box className="p-4">
                    <Box>{`${rideRequest?.firstName} ${rideRequest?.lastName}`}</Box>
                    <Box>{rideRequest?.phoneNumber}</Box>
                    <Box>{rideRequest?.email}</Box>
                  </Box>
                </Box>
              </Paper>
            </Box>

            <Box className="mb-4">
              <Paper>
                <Box className="p-4 bg-slate-200">
                  <b>Trip Info</b>
                </Box>
                <Box className="p-4">
                  <Box>{`Vehicle type: ${rideRequest?.vehicleType}`}</Box>
                  <Box>{`Pickup time: ${moment(
                    rideRequest?.pickupDateTime
                  ).format("YYYY-MM-DD hh:mm:ss A")}`}</Box>
                  <Box>{`Pickup Address: ${rideRequest?.pickupAddress}, ${rideRequest?.pickupCity}, ${rideRequest?.pickupState} ${rideRequest?.pickupZip}`}</Box>
                  <Box>{`Dropoff Address: ${rideRequest?.dropoffAddress}, ${rideRequest?.dropoffCity}, ${rideRequest?.dropoffState} ${rideRequest?.dropoffZip}`}</Box>
                  <Box>{`# of passenger(s): ${rideRequest?.numOfPassengers}`}</Box>
                  <Box>{`# of checked bags: ${rideRequest?.numOfCheckedBags}`}</Box>
                  <Box>{`# of carry-on bags: ${rideRequest?.numOfCarryOnBags}`}</Box>
                </Box>
              </Paper>
            </Box>

            <Box className="mb-4">
              <Paper>
                <Box className="p-4 bg-slate-200">
                  <b>Notes</b>
                </Box>
                <Box className="p-4" whiteSpace={"break-spaces"}>
                  {rideRequest?.notes}
                </Box>
              </Paper>
            </Box>

            <Box className="mb-4">
              <Paper className="p-4">
                <b>Suggested Trip Price</b>
                <Box>
                  <TextField
                    label="$"
                    variant="standard"
                    type="number"
                    fullWidth
                    value={price}
                    color={priceFlag ? `error` : "primary"}
                    focused
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Box>

                <b>Your notes for the customer</b>
                <Box>
                  <TextField
                    multiline
                    maxRows={10}
                    variant="standard"
                    fullWidth
                    value={driverNotes}
                    onChange={(e) => setDriverNotes(e.target.value)}
                  />
                </Box>
              </Paper>
            </Box>

            <Box className="mb-4 flex justify-evenly">
              <Button
                variant="contained"
                color="success"
                onClick={() => confirm()}
              >
                Confirm
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => reject()}
              >
                Reject
              </Button>
            </Box>
          </Grid>
          <Grid item md={12} lg={1} />
        </Grid>
      </Box>
    </>
  );
}
