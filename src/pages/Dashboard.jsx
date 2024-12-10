import { Box, Grid2 as Grid, MenuItem, Select } from '@mui/material';
import Title from '../components/Title';
import { APP_TITLE } from '../constants';
import { useEffect, useState } from 'react';
import { env, supabase_client } from '../App';
import CustomerRequests from '../components/CustomerRequests';
import RequestStatusDemo from '../components/RequestStatusDemo';
import { getYearsForFilters } from '../util';
import moment from 'moment';

export default function Dashboard() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [requestsType, setRequestsType] = useState('pending');

  const [rideRequests, setRideRequests] = useState([]);

  const getAllPendingRequests = async (year) => {
    const { data, error } = await supabase_client
      .from('ride_request')
      .select('*, rider_info(*)')
      .in('status_id', [1, 2, 3])
      .gte('pickup_datetime', moment(JSON.stringify(year)).toISOString())
      .lt('pickup_datetime', moment(JSON.stringify(year + 1)).toISOString())
      .order('pickup_datetime', { ascending: false });

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

  const getAllCompletedRequests = async (year) => {
    const { data, error } = await supabase_client
      .from('ride_request')
      .select('*, rider_info(*)')
      .eq('status_id', 4)
      .gte('pickup_datetime', moment(JSON.stringify(year)).toISOString())
      .lt('pickup_datetime', moment(JSON.stringify(year + 1)).toISOString())
      .order('pickup_datetime', { ascending: false });

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

  const getAllTerminatedRequests = async (year) => {
    const { data, error } = await supabase_client
      .from('ride_request')
      .select('*, rider_info(*)')
      .in('status_id', [5, 6])
      .gte('pickup_datetime', moment(JSON.stringify(year)).toISOString())
      .lt('pickup_datetime', moment(JSON.stringify(year + 1)).toISOString())
      .order('pickup_datetime', { ascending: false });

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

  const getRequests = (requestsType, selectedYear) => {
    switch (requestsType) {
      case 'pending':
        getAllPendingRequests(selectedYear);
        break;

      case 'completed':
        getAllCompletedRequests(selectedYear);
        break;

      case 'terminated':
        getAllTerminatedRequests(selectedYear);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getRequests(requestsType, selectedYear);
  }, [requestsType, selectedYear]);

  useEffect(() => {
    setYears(getYearsForFilters(2024));
  }, []);

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
                  <Box className="flex self-center ">By Year:</Box>
                  {years.length > 0 && (
                    <Select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      {years.map((year, i) => (
                        <MenuItem key={i} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Box>
              </Box>
            </Box>

            <Box className="mt-4">
              <CustomerRequests
                rideRequests={rideRequests}
                selectedYear={selectedYear}
                requestsType={requestsType}
                getRequests={getRequests}
              />
            </Box>
          </Box>
        </Grid>
        <Grid size={{ md: 12, lg: 1 }} />
      </Grid>
    </>
  );
}
