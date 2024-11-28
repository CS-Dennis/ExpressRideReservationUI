import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { COLORS, DASHBAORD_PAGE } from '../constants';
import { Box, Button, Chip, Grid2 as Grid, Paper } from '@mui/material';
import { getRideRequestsByType } from '../services/apis';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Dashboard() {
  const navigate = useNavigate();
  const [rideRequests, setRideRequests] = useState(null);
  const [tab, setTab] = useState(0);
  const [tabTitle, setTabTitle] = useState(DASHBAORD_PAGE.newRequests);

  const changeTab = (newTab) => {
    setTab(newTab);

    switch (newTab) {
      case 0:
        setTabTitle(DASHBAORD_PAGE.newRequests);
        break;
      case 1:
        setTabTitle(DASHBAORD_PAGE.pendingRequests);
        break;
      case 2:
        setTabTitle(DASHBAORD_PAGE.upcomingRides);
        break;
      case 3:
        setTabTitle(DASHBAORD_PAGE.history);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getRideRequestsByType(tab)
      .then((res) => {
        if (res.data !== null && res.data !== '') {
          setRideRequests(res.data);
        } else {
          setRideRequests(null);
        }
      })
      .catch((err) => {
        setRideRequests(null);
        console.log(err);
      });
  }, [tab]);

  return (
    <>
      <Box className="mx-10">
        <Grid container>
          <Grid item md={12} lg={1} />
          <Grid item md={12} lg={10} className="w-full">
            <Title title={tabTitle} />
            <Box className="flex justify-evenly mt-4 mb-2">
              <Button
                variant="contained"
                sx={{ backgroundColor: COLORS.blue }}
                onClick={() => {
                  changeTab(0);
                }}
              >
                {DASHBAORD_PAGE.newRequests}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  changeTab(1);
                }}
              >
                {DASHBAORD_PAGE.pendingRequests}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  changeTab(2);
                }}
              >
                {DASHBAORD_PAGE.upcomingRides}
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: COLORS.grey }}
                onClick={() => {
                  changeTab(3);
                }}
              >
                {DASHBAORD_PAGE.history}
              </Button>
            </Box>

            {rideRequests !== null && (
              <Box className="mb-2">
                You have{' '}
                <Chip
                  label={rideRequests.length}
                  sx={{
                    backgroundColor:
                      tab === 0
                        ? COLORS.blue
                        : tab === 1
                        ? COLORS.orange
                        : tab === 2
                        ? COLORS.green
                        : COLORS.grey,
                    color: tab === 1 ? COLORS.black : COLORS.white,
                  }}
                />{' '}
                {tabTitle}
              </Box>
            )}

            <Box>
              {rideRequests !== null &&
                rideRequests.map((request, i) => (
                  <Paper key={i} className="mb-4 flex flex-col" elevation={4}>
                    <Box className="p-2 bg-slate-200 flex w-full rounded-t-lg">
                      <Box className="w-full flex self-center">
                        {`Request submitted on: ` +
                          moment(request?.created * 1000).format(
                            'YYYY-MM-DD hh:mm:ss A',
                          )}
                      </Box>
                      <Box>
                        <Chip
                          label={tabTitle}
                          sx={{
                            backgroundColor:
                              tab === 0
                                ? COLORS.blue
                                : tab === 1
                                ? COLORS.orange
                                : tab === 2
                                ? COLORS.green
                                : COLORS.grey,
                            color: tab === 1 ? COLORS.black : COLORS.white,
                          }}
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
                      </Box>
                      <Box>
                        <b>Pickup time:</b>{' '}
                        {moment(request.pickupDateTime).format(
                          'YYYY-MM-DD hh:mm:ss A',
                        )}
                      </Box>
                      <Box>
                        <b>Pickup address:</b>{' '}
                        {`${request.pickupAddress}, ${request.pickupCity}, ${request.pickupState} ${request.pickupZip}`}
                      </Box>
                      <Box>
                        <b>Dropoff address:</b>{' '}
                        {`${request.dropoffAddress}, ${request.dropoffCity}, ${request.dropoffState} ${request.dropoffZip}`}
                      </Box>

                      <Box>
                        <b>
                          Direction:{' '}
                          <Link
                            to={`https://www.google.com/maps/dir/${request.pickupAddress}, ${request.pickupCity}, ${request.pickupState} ${request.pickupZip}/${request.dropoffAddress}, ${request.dropoffCity}, ${request.dropoffState} ${request.dropoffZip}`}
                            target="_blank"
                          >
                            <LocationOnIcon />
                          </Link>
                        </b>
                      </Box>

                      <Box className="flex justify-end">
                        <Button
                          variant="contained"
                          onClick={() => navigate(`/detail?id=${request.id}`)}
                        >
                          Details
                        </Button>
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
