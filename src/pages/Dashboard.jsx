import { Box, Grid2 as Grid, MenuItem, Select } from '@mui/material';
import Title from '../components/Title';
import { APP_TITLE } from '../constants';
import { useEffect, useState } from 'react';
import { env, supabase_client } from '../App';
import CustomerRequests from '../components/CustomerRequests';
import RequestStatusDemo from '../components/RequestStatusDemo';

export default function Dashboard() {
  const [rideRequests, setRideRequests] = useState([]);
  const [requestsType, setRequestsType] = useState('pending');

  const getAllPendingRequests = async () => {
    const { data, error } = await supabase_client
      .from('ride_request')
      .select('*, rider_info(*)')
      .in('status_id', [1, 2, 3]);

    if (env === 'dev') {
      console.log('dev', 'pending requests', data);
    }
    if (data) {
      setRideRequests([...data]);
    }
    if (error) {
      console.log(error);
    }
  };

  const getAllCompletedRequests = async () => {
    const { data, error } = await supabase_client
      .from('ride_request')
      .select('*, rider_info(*)')
      .eq('status_id', 4);

    if (env === 'dev') {
      console.log('dev', 'completed requests', data);
    }
    if (data) {
      setRideRequests([...data]);
    }
    if (error) {
      console.log(error);
    }
  };

  const selectRequests = (event) => {
    setRequestsType(event.target.value);
  };

  useEffect(() => {
    switch (requestsType) {
      case 'pending':
        getAllPendingRequests();
        break;

      case 'completed':
        getAllCompletedRequests();
        break;
      default:
        break;
    }
  }, [requestsType]);

  return (
    <>
      <Grid container>
        <Grid size={{ md: 12, lg: 1 }} />
        <Grid size={{ md: 12, lg: 10 }} className="w-full">
          <Title title={APP_TITLE} />

          <Box className="mx-4">
            <Box className="flex justify-between mt-4">
              <Box className="flex flex-col self-center">
                <Box className="font-bold text-lg flex items-center self-center">
                  Customer Requests
                </Box>
                <Box className="mt-4 font-bold">
                  <Box>Request Status Flow</Box>
                  <RequestStatusDemo trip={{}} />
                </Box>
              </Box>

              <Box>
                <Box
                  className="flex justify-between"
                  sx={{ minWidth: '100px' }}
                >
                  <Box className="flex self-center mr-2">By Type: </Box>
                  <Select value={requestsType} onChange={selectRequests}>
                    <MenuItem value={'pending'}>Upcoming Requests</MenuItem>
                    <MenuItem value={'completed'}>Completed Requests</MenuItem>
                    <MenuItem value={'terminated'}>
                      Terminated Requests
                    </MenuItem>
                  </Select>
                </Box>
                <Box
                  className="flex justify-between mt-2"
                  sx={{ minWidth: '100px' }}
                >
                  <Box className="flex self-center ">By Duration:</Box>
                  <Select value={1}>
                    <MenuItem value={1}>Last Month</MenuItem>
                    <MenuItem value={2}>Last 3 Months</MenuItem>
                    <MenuItem value={3}>Last 6 Months</MenuItem>
                    <MenuItem value={4}>2024</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Box>

            <Box className="mt-4">
              <CustomerRequests
                rideRequests={rideRequests}
                getAllPendingRequests={getAllPendingRequests}
                getAllCompletedRequests={getAllCompletedRequests}
              />
            </Box>
          </Box>
        </Grid>
        <Grid size={{ md: 12, lg: 1 }} />
      </Grid>
    </>
  );
}
