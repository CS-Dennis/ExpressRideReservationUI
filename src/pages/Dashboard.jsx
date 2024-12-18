import {
  Box,
  Grid2 as Grid,
  MenuItem,
  Pagination,
  Select,
} from '@mui/material';
import Title from '../components/Title';
import { APP_TITLE } from '../constants';
import { useContext, useEffect, useState } from 'react';
import { AppContext, env, supabase_client } from '../App';
import CustomerRequests from '../components/CustomerRequests';
import RequestStatusDemo from '../components/RequestStatusDemo';
import { getYearsForFilters } from '../util';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

// driver's dashboard
export default function Dashboard() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [requestsType, setRequestsType] = useState('pending');

  const [rideRequests, setRideRequests] = useState([]);

  const [countsPerPage, setCountsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [filterUpdated, setFilterUpdated] = useState(false);

  // get all upcoming requests
  const getAllPendingRequests = async (year) => {
    // get upcoming requests count
    const rideRequestsCountResponse = await supabase_client
      .from('ride_request')
      .select('id', { count: 'exact', head: true })
      .in('status_id', [1, 2, 3]);

    setTotalPages(Math.ceil(rideRequestsCountResponse.count / countsPerPage));

    // get upcoming requests
    if (filterUpdated) {
      setPage(1);
    }
    const start = ((filterUpdated ? 1 : page) - 1) * countsPerPage;
    const end = start + countsPerPage - 1;
    const { data, error } = await supabase_client
      .from('ride_request')
      .select('*, rider_info(*), trip_charge(*)')
      .in('status_id', [1, 2, 3])
      .gte('pickup_datetime', moment(JSON.stringify(year)).toISOString())
      .lt('pickup_datetime', moment(JSON.stringify(year + 1)).toISOString())
      .order('pickup_datetime', { ascending: false })
      .limit(countsPerPage)
      .range(start, end);

    setFilterUpdated(false);

    if (env === 'dev') {
      console.log('dev', 'pending requests', data);
      console.log(
        'dev',
        'pending requests count',
        rideRequestsCountResponse.count,
      );
    }
    if (data) {
      setRideRequests([...data]);
    }
    if (error) {
      console.log(error);
    }
  };

  const getAllCompletedRequests = async (year) => {
    const rideRequestsCountResponse = await supabase_client
      .from('ride_request')
      .select('id', { count: 'exact', head: true })
      .eq('status_id', 4)
      .gte('pickup_datetime', moment(JSON.stringify(year)).toISOString())
      .lt('pickup_datetime', moment(JSON.stringify(year + 1)).toISOString())
      .order('pickup_datetime', { ascending: false });
    setTotalPages(Math.ceil(rideRequestsCountResponse.count / countsPerPage));

    if (filterUpdated) {
      setPage(1);
    }

    const start = ((filterUpdated ? 1 : page) - 1) * countsPerPage;
    const end = start + countsPerPage - 1;

    const { data, error } = await supabase_client
      .from('ride_request')
      .select('*, rider_info(*), trip_charge(*)')
      .eq('status_id', 4)
      .gte('pickup_datetime', moment(JSON.stringify(year)).toISOString())
      .lt('pickup_datetime', moment(JSON.stringify(year + 1)).toISOString())
      .order('pickup_datetime', { ascending: false })
      .range(start, end);

    setFilterUpdated(false);

    if (env === 'dev') {
      console.log('dev', 'completed requests', data);
      console.log(
        'dev',
        'completed requests count',
        rideRequestsCountResponse.count,
      );
    }
    if (data) {
      setRideRequests([...data]);
    }
    if (error) {
      console.log(error);
    }
  };

  const getAllTerminatedRequests = async (year) => {
    const rideRequestsCountResponse = await supabase_client
      .from('ride_request')
      .select('id', { count: 'exact', head: true })
      .in('status_id', [5, 6])
      .gte('pickup_datetime', moment(JSON.stringify(year)).toISOString())
      .lt('pickup_datetime', moment(JSON.stringify(year + 1)).toISOString())
      .order('pickup_datetime', { ascending: false });

    setTotalPages(Math.ceil(rideRequestsCountResponse.count / countsPerPage));

    if (filterUpdated) {
      setPage(1);
    }

    const start = ((filterUpdated ? 1 : page) - 1) * countsPerPage;
    const end = start + countsPerPage - 1;

    const { data, error } = await supabase_client
      .from('ride_request')
      .select('*, rider_info(*), trip_charge(*)')
      .in('status_id', [5, 6])
      .gte('pickup_datetime', moment(JSON.stringify(year)).toISOString())
      .lt('pickup_datetime', moment(JSON.stringify(year + 1)).toISOString())
      .order('pickup_datetime', { ascending: false })
      .range(start, end);

    setFilterUpdated(false);

    if (env === 'dev') {
      console.log('dev', 'completed requests', data);
      console.log(
        'dev',
        'completed requests count',
        rideRequestsCountResponse.count,
      );
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
  }, [requestsType, selectedYear, page]);

  useEffect(() => {
    setYears(getYearsForFilters(2024));
  }, []);

  useEffect(() => {
    if (context.userProfile?.role?.id !== 2) {
      navigate('/');
    }
  }, [context.userProfile]);

  return (
    <>
      <Grid container>
        <Grid size={{ md: 12, lg: 1 }} />
        <Grid size={{ md: 12, lg: 10 }} className="w-full">
          <Title title={APP_TITLE} />

          <Box className="mx-4">
            {/* top section - header/status flow and filters */}
            <Grid container>
              <Grid size={{ xs: 12, sm: 12, md: 8 }} className="mt-2">
                <Box className="font-bold text-lg flex justify-center items-center self-center">
                  Customer Requests
                </Box>
                <Box className="mt-4 font-bold overflow-x-auto">
                  <Box>Request Status Flow</Box>
                  <Box sx={{ width: '100%' }}>
                    <RequestStatusDemo trip={{}} />
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 4 }} className="mt-2">
                <Box
                  className="flex justify-between place-self-end"
                  sx={{ width: '270px' }}
                >
                  <Box className="flex self-center mr-2">By Type: </Box>
                  <Select
                    value={requestsType}
                    onChange={(e) => {
                      selectRequests(e);
                      setFilterUpdated(true);
                    }}
                  >
                    <MenuItem value={'pending'}>Upcoming Requests</MenuItem>
                    <MenuItem value={'completed'}>Completed Requests</MenuItem>
                    <MenuItem value={'terminated'}>
                      Terminated Requests
                    </MenuItem>
                  </Select>
                </Box>
                <Box
                  className="flex justify-between place-self-end mt-2"
                  sx={{ width: '270px' }}
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
              </Grid>
            </Grid>

            <Box className="mt-4">
              <CustomerRequests
                rideRequests={rideRequests}
                selectedYear={selectedYear}
                requestsType={requestsType}
                getRequests={getRequests}
              />
            </Box>

            <Box className="flex justify-center items-center pb-4">
              <Pagination
                count={totalPages}
                page={page}
                color="primary"
                onChange={(e, value) => setPage(value)}
              />{' '}
              <Box>10/Page</Box>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ md: 12, lg: 1 }} />
      </Grid>
    </>
  );
}
