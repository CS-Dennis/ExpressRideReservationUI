import {
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  TextField,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import {
  completeRideRequest,
  confirmRideRequest,
  getRideRequestById,
} from '../services/apis';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment';
import { DASHBAORD_PAGE } from '../constants';
import { getRideRequestType } from '../util';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AppContext } from '../App';

export default function RideRequestDetail() {
  const appContext = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState(null);
  const [rideRequest, setRideRequest] = useState(null);

  const [price, setPrice] = useState(0);
  const [driverNotes, setDriverNotes] = useState('');

  const [priceUpdate, setPriceUpdate] = useState('');
  const [driverNotesUpdate, setDriverNotesUpdate] = useState('');

  const [priceFlag, setPriceFlag] = useState(false);
  const [priceUpdateFlag, setPriceUpdateFlag] = useState(false);

  const [modifiyFlag, setModifiyFlag] = useState(false);

  const [completeFlag, setCompleteFlag] = useState(false);

  const [disableEmail, setDisableEmail] = useState(true);

  // driver to confirm new ride requests
  const confirm = () => {
    setPriceFlag(false);
    if (price <= 0 || price === null || price === '') {
      setPriceFlag(true);
      appContext.setSnackbarFlag(true);
      appContext.setSnackbarType('error');
      appContext.setSnackbarMessage('Please add price');
    } else {
      // submit confirmation request
      const payload = {
        id: id,
        price: price,
        driverNotes: driverNotes,
      };
      confirmRideRequest(payload, disableEmail)
        .then((res) => {
          if (res.status === 200) {
            // show snackbar for confirmation success
            setPriceFlag(false);
            appContext.setSnackbarFlag(true);
            appContext.setSnackbarType('success');
            appContext.setSnackbarMessage(
              'Ride request confirmed. Confirmation email sent to the customer.',
            );
            setRideRequest(res.data);

            setPriceUpdate(res.data.price);
            setDriverNotesUpdate(res.data.driverNotes);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // re-confirm with price or notes update for pending ride requests
  const reconfirm = () => {
    setPriceUpdateFlag(false);
    if (priceUpdate <= 0 || priceUpdate === null || priceUpdate === '') {
      setPriceUpdateFlag(true);
    } else {
      // submit confirmation request
      const payload = {
        id: id,
        price: priceUpdate,
        driverNotes: driverNotesUpdate,
      };
      confirmRideRequest(payload, disableEmail)
        .then((res) => {
          if (res.status === 200) {
            // show snackbar for confirmation success
            appContext.setSnackbarFlag(true);
            appContext.setSnackbarType('success');
            appContext.setSnackbarMessage(
              'Ride request confirmed. Confirmation email sent to the customer.',
            );
            setRideRequest(res.data);
            setModifiyFlag(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // TODO
  // reject new ride requests
  const reject = () => {
    // submit rejection request
    return false;
  };

  // complete a upcoming ride request
  const completeTrip = () => {
    completeRideRequest(id)
      .then((res) => {
        if (res.status === 200) {
          console.log('completed trip successfully');
          appContext.setSnackbarFlag(true);
          appContext.setSnackbarType('success');
          appContext.setSnackbarMessage('Trip completed successfully');
          setCompleteFlag(false);

          setRideRequest(res.data);
        } else {
          // error
        }
      })
      .catch((err) => {
        console.log(err);
        appContext.setSnackbarFlag(true);
        appContext.setSnackbarType('error');
        appContext.setSnackbarMessage(err);
      });
  };

  useEffect(() => {
    if (location.search.split('?id=')[1]) {
      setId(location.search.split('?id=')[1]);
      getRideRequestById(location.search.split('?id=')[1])
        .then((res) => {
          if (res.status === 200) {
            setRideRequest(res.data);
            setPriceUpdate(res.data.price);
            setDriverNotesUpdate(res.data.driverNotes);
          }
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
            <Title title={getRideRequestType(rideRequest)} />

            {/* back button */}
            <Box>
              <IconButton
                color="primary"
                size="large"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            </Box>

            <Box className="mb-4">
              <Paper>
                <Box className="p-4 bg-slate-200 w-full flex justify-between items-center">
                  <b>Request Status</b>
                  <Chip
                    label={getRideRequestType(rideRequest)}
                    sx={{
                      backgroundColor:
                        getRideRequestType(rideRequest) ===
                        DASHBAORD_PAGE.newRequests
                          ? '#0ea5e9'
                          : getRideRequestType(rideRequest) ===
                            DASHBAORD_PAGE.pendingRequests
                          ? '#fe9800'
                          : getRideRequestType(rideRequest) ===
                            DASHBAORD_PAGE.upcomingRides
                          ? '#2c7f2c'
                          : '#667688',
                      color:
                        rideRequest?.driverConfirmed === true &&
                        rideRequest?.customerConfirmed === false
                          ? '#000'
                          : '#fff',
                    }}
                  />
                </Box>
                <Box className="w-full flex self-center p-4">
                  {`Submitted on: ` +
                    moment(rideRequest?.created * 1000).format(
                      'YYYY-MM-DD hh:mm:ss A',
                    )}
                </Box>
              </Paper>
            </Box>

            <Box className="mb-4">
              {(getRideRequestType(rideRequest) ===
                DASHBAORD_PAGE.pendingRequests ||
                getRideRequestType(rideRequest) ===
                  DASHBAORD_PAGE.upcomingRides ||
                getRideRequestType(rideRequest) === DASHBAORD_PAGE.history) && (
                <Box
                  className="font-bold pl-4"
                  sx={{ backgroundColor: '#fe9800' }}
                >
                  {`Confirmation emailed to customer on ${moment(
                    rideRequest?.driverConfirmedDateTime * 1000,
                  ).format('YYYY-MM-DD hh:mm:ss A')}`}
                </Box>
              )}
              {(getRideRequestType(rideRequest) ===
                DASHBAORD_PAGE.upcomingRides ||
                getRideRequestType(rideRequest) === DASHBAORD_PAGE.history) && (
                <Box
                  className="font-bold text-white pl-4"
                  sx={{ backgroundColor: '#2c7f2c' }}
                >
                  {`Customer confirmed on ${moment(
                    rideRequest?.customerConfirmedDateTime * 1000,
                  ).format('YYYY-MM-DD hh:mm:ss A')}`}
                </Box>
              )}
              {getRideRequestType(rideRequest) === DASHBAORD_PAGE.history && (
                <Box className="font-bold text-white bg-slate-500 pl-4">
                  {`Trip completed on ${moment(
                    rideRequest?.tripCompletedDateTime * 1000,
                  ).format('YYYY-MM-DD hh:mm:ss A')}`}
                </Box>
              )}

              <Paper className="mt-4">
                <Box>
                  <Box className="p-4 bg-slate-200 ">
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
                <Box className="p-4 bg-slate-200 flex justify-between">
                  <b>Trip Info</b>
                  <Link
                    to={`https://www.google.com/maps/dir/${rideRequest?.pickupAddress}, ${rideRequest?.pickupCity}, ${rideRequest?.pickupState} ${rideRequest?.pickupZip}/${rideRequest?.dropoffAddress}, ${rideRequest?.dropoffCity}, ${rideRequest?.dropoffState} ${rideRequest?.dropoffZip}`}
                    target="_blank"
                  >
                    <LocationOnIcon />
                  </Link>
                </Box>
                <Box className="p-4">
                  <Box>{`Vehicle type: ${rideRequest?.vehicleType}`}</Box>
                  <Box>{`Pickup time: ${moment(
                    new Date(rideRequest?.pickupDateTime),
                  ).format('YYYY-MM-DD hh:mm:ss A')}`}</Box>
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
                <Box className="p-4" whiteSpace={'break-spaces'}>
                  {rideRequest?.notes}
                </Box>
              </Paper>
            </Box>

            <Box className="mb-4">
              <Paper className="p-4">
                <b>Suggested Trip Price</b>
                <Box className="mb-4">
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    variant="standard"
                    type="number"
                    fullWidth
                    value={
                      getRideRequestType(rideRequest) ==
                      DASHBAORD_PAGE.newRequests
                        ? price
                        : rideRequest?.price || 0
                    }
                    color={priceFlag ? `error` : 'primary'}
                    focused
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={
                      getRideRequestType(rideRequest) !==
                      DASHBAORD_PAGE.newRequests
                        ? true
                        : false
                    }
                  />
                </Box>

                <b>Your notes for the customer</b>
                <Box>
                  <TextField
                    multiline
                    maxRows={10}
                    variant="standard"
                    fullWidth
                    value={
                      getRideRequestType(rideRequest) ==
                      DASHBAORD_PAGE.newRequests
                        ? driverNotes
                        : rideRequest?.driverNotes
                    }
                    onChange={(e) => setDriverNotes(e.target.value)}
                    disabled={
                      getRideRequestType(rideRequest) !==
                      DASHBAORD_PAGE.newRequests
                        ? true
                        : false
                    }
                  />
                </Box>

                {(getRideRequestType(rideRequest) ===
                  DASHBAORD_PAGE.newRequests ||
                  getRideRequestType(rideRequest) ===
                    DASHBAORD_PAGE.pendingRequests) && (
                  <Box className="flex place-items-center">
                    <Checkbox
                      checked={disableEmail}
                      onChange={() => {
                        setDisableEmail(!disableEmail);
                      }}
                    />
                    <Box>Disable Email (Test purpose only)</Box>
                  </Box>
                )}
              </Paper>
            </Box>

            {getRideRequestType(rideRequest) === DASHBAORD_PAGE.newRequests && (
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
            )}

            {getRideRequestType(rideRequest) ===
              DASHBAORD_PAGE.pendingRequests && (
              <Box className="flex justify-center mb-4">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setModifiyFlag(true)}
                >
                  Modify
                </Button>
              </Box>
            )}

            {getRideRequestType(rideRequest) ===
              DASHBAORD_PAGE.upcomingRides && (
              <Box className="flex justify-center mb-4">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setCompleteFlag(true)}
                >
                  Complete Trip
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item md={12} lg={1} />
        </Grid>
      </Box>

      {/* modal for updating the price and driverNotes */}
      <Modal
        open={modifiyFlag}
        onClose={() => {
          setModifiyFlag(false);
        }}
      >
        <Box className="fixed top-0 bottom-0 left-0 right-0 bg-white m-auto h-fit w-fit p-10">
          <b>New Proposed Price:</b>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="standard"
            type="number"
            fullWidth
            value={priceUpdate}
            color={priceUpdateFlag ? `error` : 'primary'}
            focused
            onChange={(e) => setPriceUpdate(e.target.value)}
            sx={{ marginBottom: '2em' }}
          />

          <b>Your notes for the customer:</b>
          <TextField
            multiline
            maxRows={10}
            variant="standard"
            fullWidth
            value={driverNotesUpdate}
            onChange={(e) => setDriverNotesUpdate(e.target.value)}
          />

          <Box className="flex justify-evenly mt-4">
            <Button
              variant="contained"
              color="success"
              onClick={() => reconfirm()}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModifiyFlag(false)}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* modal for completing the trip */}
      <Modal open={completeFlag}>
        <Box className="fixed top-0 bottom-0 left-0 right-0 bg-white m-auto h-fit w-fit p-10">
          <Box className="font-bold text-xl">
            Please confirm to complete this trip
          </Box>
          <Box className="flex justify-evenly mt-4">
            <Button
              color="success"
              variant="contained"
              onClick={() => completeTrip()}
            >
              Confirm
            </Button>
            <Button variant="contained" onClick={() => setCompleteFlag(false)}>
              Back
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
