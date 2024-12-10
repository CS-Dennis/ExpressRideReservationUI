import { Box, Grid2 as Grid, MenuItem, Select } from '@mui/material';
import Title from '../components/Title';
import { APP_TITLE } from '../constants';
import { useEffect, useState } from 'react';
import { env, supabase_client } from '../App';
import TripCard from '../components/TripCard';
import { getYearsForFilters } from '../util';
import moment from 'moment';

// customer's My Trips screen
export default function CustomerTrips() {
  const [trips, setTrips] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const getUserTrips = async (year) => {
    const { data, error } = await supabase_client
      .from('ride_request')
      .select('*, rider_info(*)')
      .gte('pickup_datetime', moment(JSON.stringify(year)).toISOString())
      .lt('pickup_datetime', moment(JSON.stringify(year + 1)).toISOString())
      .order('pickup_datetime', { ascending: false });

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
    setYears(getYearsForFilters(2024));
  }, []);

  useEffect(() => {
    // get user's trips
    getUserTrips(selectedYear);
  }, [selectedYear]);

  return (
    <>
      <Grid container>
        <Grid size={{ md: 12, lg: 1 }} />
        <Grid size={{ md: 12, lg: 10 }} className="w-full">
          <Title title={APP_TITLE} />

          <Box>
            {/* border-b border-navyBlue */}
            <Box className="mt-10 flex justify-center font-bold text-lg">
              My Trips
            </Box>

            <Box className="flex justify-end mx-10 border-b border-gray-300 pb-2">
              <Box className="flex self-center mr-4">Filter Trips:</Box>
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

            {/* my trips section */}
            <Box className="mt-5">
              {trips.length > 0 &&
                trips.map((trip, i) => (
                  <Box className="mx-5" key={i}>
                    <TripCard
                      trip={trip}
                      selectedYear={selectedYear}
                      getUserTrips={getUserTrips}
                    />
                  </Box>
                ))}

              {trips.length === 0 && (
                <Box className="flex justify-center mt-4 font-bold text-lg">
                  No Requests Found
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid size={{ md: 12, lg: 1 }} />
      </Grid>
    </>
  );
}
