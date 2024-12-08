import { Box, Grid2 as Grid, MenuItem, Select } from '@mui/material';
import Title from '../components/Title';
import { APP_TITLE } from '../constants';
import { useEffect, useState } from 'react';
import { env, supabase_client } from '../App';
import TripCard from '../components/TripCard';

export default function CustomerTrips() {
  const [trips, setTrips] = useState([]);

  const getUserTrips = async () => {
    const { data, error } = await supabase_client.from('ride_request').select();

    if (data) {
      if (env === 'dev') {
        console.log('dev', 'ride_requests', data);
      }
      setTrips([...data]);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // get user's trips
    getUserTrips();
  }, []);

  return (
    <>
      <Grid container>
        <Grid size={{ md: 12, lg: 1 }} />
        <Grid size={{ md: 12, lg: 10 }} className="w-full">
          <Title title={APP_TITLE} />

          <Box>
            <Box className="mt-10 flex justify-center font-bold text-lg">
              My Trips
            </Box>

            <Box className="flex justify-end mr-10">
              <Box className="flex self-center mr-4">Filter Trips:</Box>
              <Select defaultValue={'1m'} className="w-44">
                <MenuItem value={'1m'}>Last Month</MenuItem>
                <MenuItem value={'3m'}>Last 3 Months</MenuItem>
                <MenuItem value={'6m'}>Last 6 Months</MenuItem>
                <MenuItem value={'2024y'}>2024</MenuItem>
                <MenuItem value={'2023y'}>2023</MenuItem>
              </Select>
            </Box>

            {/* my trips section */}
            <Box className="mt-5">
              {trips.map((trip, i) => (
                <Box className="mx-5" key={i}>
                  <TripCard trip={trip} />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid size={{ md: 12, lg: 1 }} />
      </Grid>
    </>
  );
}
