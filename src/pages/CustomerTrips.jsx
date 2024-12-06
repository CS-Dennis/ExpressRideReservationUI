import { Grid2 as Grid } from '@mui/material';
import Title from '../components/Title';
import { APP_TITLE } from '../constants';
import { useEffect } from 'react';
import { supabase_client } from '../App';

export default function CustomerTrips() {
  const getUserTrips = async () => {
    const { data, error } = await supabase_client.from('ride_request').select();

    if (data) {
      console.log(data);
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
        </Grid>
        <Grid size={{ md: 12, lg: 1 }} />
      </Grid>
    </>
  );
}
