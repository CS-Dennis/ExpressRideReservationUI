import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Grid2 as Grid,
  MenuItem,
  Select,
} from '@mui/material';
import Title from '../components/Title';
import { APP_TITLE, MONTHS } from '../constants';
import { useContext, useEffect, useState } from 'react';
import {
  getYearsForFilters,
  transformRideRequestsToObjectByMonth,
} from '../util';
import moment from 'moment';
import { AppContext, env, supabase_client } from '../App';
import { useNavigate } from 'react-router-dom';
import { BarChart } from '@mui/x-charts';

export default function DriverEarnings() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const [numOfTotalCompletedTrips, setNumOfTotalCompletedTrips] = useState(0);
  const [totalEarningsYTD, setTotalEarningsYTD] = useState(0);

  const [chartType, setChartType] = useState('earnings');

  const [barChartDataEarnings, setBarChartDataEarnings] = useState(null);
  const [barChartDataTrips, setBarChartDataTrips] = useState(null);

  function valueFormatterEarnings(value) {
    return `$${value}`;
  }
  function valueFormatterTrips(value) {
    return `${value} trips`;
  }

  const getAllCompletedRequests = async () => {
    const { data, error } = await supabase_client
      .from('ride_request')
      .select('pickup_datetime, vehicle_type, trip_charge(price)')
      .eq('status_id', 4)
      .gte(
        'pickup_datetime',
        moment(JSON.stringify(selectedYear)).toISOString(),
      )
      .lt(
        'pickup_datetime',
        moment(JSON.stringify(selectedYear + 1)).toISOString(),
      )
      .order('pickup_datetime', { ascending: false });

    if (data) {
      setNumOfTotalCompletedTrips(data.length);
      const transformed = transformRideRequestsToObjectByMonth(data);

      // construct totalEarningsYTD
      const keys = Object.keys(transformed);
      var tempTotalEarning = 0;
      keys.forEach((key) => {
        tempTotalEarning += transformed[key].total;
      });

      setTotalEarningsYTD(tempTotalEarning);

      //   { month: 'Jan', total: 20, sedan: 15, suv: 5 },
      // { month: 'Feb', total: 40, sedan: 15, suv: 25 },
      // { month: 'Mar', total: 30, sedan: 15, suv: 15 },

      // construct bar dataset for earnings
      var tempBarData = MONTHS.map((month) => {
        return {
          month: month.toUpperCase()[0] + month.slice(1),
          total: transformed[month].total,
          sedan: transformed[month].sedan,
          suv: transformed[month].suv,
        };
      });
      setBarChartDataEarnings([...tempBarData]);

      // construct bar dataset for trips
      tempBarData = MONTHS.map((month) => {
        return {
          month: month.toUpperCase()[0] + month.slice(1),
          totalTrips: transformed[month].totalTrips,
          sedanTrips: transformed[month].sedanTrips,
          suvTrips: transformed[month].suvTrips,
        };
      });
      setBarChartDataTrips([...tempBarData]);
      console.log('trips data: ', tempBarData);
    }

    if (env === 'dev') {
      console.log('dev', 'requests', data);
      console.log(transformRideRequestsToObjectByMonth(data));
    }
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setYears(getYearsForFilters(2024, false));
  }, []);

  useEffect(() => {
    getAllCompletedRequests();
  }, [selectedYear]);

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

          {/* chips and year selector */}
          <Grid container className="flex justify-between mt-2 mx-2">
            <Grid size={{ xs: 12, sm: 12, md: 8 }} className="flex flex-col">
              <Chip
                label={`Total Completed Trips TYD: ${numOfTotalCompletedTrips}`}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.2em',
                  padding: '10px',
                }}
              />
              <Chip
                label={`Total Earnings Before Cost YTD: $${totalEarningsYTD}`}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.2em',
                  padding: '10px',
                }}
                className="mt-2"
              />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 12, md: 4 }}
              className="flex items-center mt-2 justify-end"
            >
              <Box>By Year</Box>
              <Box className="ml-2">
                <Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years?.map((year, i) => (
                    <MenuItem key={i} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>
          </Grid>

          {/* Bar charts */}
          <Box>
            {/* monthly earnings */}
            {chartType === 'earnings' && (
              <Box>
                <BarChart
                  dataset={barChartDataEarnings || []}
                  series={[
                    {
                      dataKey: 'total',
                      label: 'Total',
                      valueFormatter: valueFormatterEarnings,
                      color: '#263238',
                    },
                    {
                      dataKey: 'sedan',
                      label: 'Sedan',
                      valueFormatter: valueFormatterEarnings,
                      color: '#0A4096',
                    },
                    {
                      dataKey: 'suv',
                      label: 'SUV',
                      valueFormatter: valueFormatterEarnings,
                      color: '#A1A1A1',
                    },
                  ]}
                  height={300}
                  xAxis={[
                    {
                      dataKey: 'month',
                      scaleType: 'band',
                    },
                  ]}
                />
                <Box className="flex justify-center font-bold text-lg">
                  Monthly Earnings YTD
                </Box>
              </Box>
            )}

            {/* monthly trips */}
            {chartType === 'trips' && (
              <Box>
                <BarChart
                  dataset={barChartDataTrips || []}
                  series={[
                    {
                      dataKey: 'totalTrips',
                      label: 'Total',
                      valueFormatter: valueFormatterTrips,
                      color: '#263238',
                    },
                    {
                      dataKey: 'sedanTrips',
                      label: 'Sedan',
                      valueFormatter: valueFormatterTrips,
                      color: '#0A4096',
                    },
                    {
                      dataKey: 'suvTrips',
                      label: 'SUV',
                      valueFormatter: valueFormatterTrips,
                      color: '#A1A1A1',
                    },
                  ]}
                  height={300}
                  xAxis={[
                    {
                      dataKey: 'month',
                      scaleType: 'band',
                    },
                  ]}
                />
                <Box className="flex justify-center font-bold text-lg">
                  Monthly Earnings YTD
                </Box>
              </Box>
            )}

            {/* chart buttongroup */}
            <Box className="flex justify-center mt-2">
              <ButtonGroup variant="outlined">
                <Button onClick={() => setChartType('earnings')}>
                  Earnings
                </Button>
                <Button onClick={() => setChartType('trips')}>Trips</Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ md: 12, lg: 1 }} />
      </Grid>

      {(!barChartDataEarnings || !barChartDataTrips) && (
        <Backdrop
          open={true}
          sx={{ zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <CircularProgress />
        </Backdrop>
      )}
    </>
  );
}
