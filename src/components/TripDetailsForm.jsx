import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid2 as Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import {
  PRICING_INFO_TABLE_DATA,
  PRICING_INFO_TABLE_HEADERS,
  PUBLIC_ADDRESSES,
  STATES,
  TRIP_TYPES,
  VEHICLE_TYPES,
} from '../constants';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MuiTelInput } from 'mui-tel-input';
import moment from 'moment';
import { capitalizeString, sortPricingTableByColumn } from '../util';
import VehicleForm from './VehicleForm';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AppContext, env } from '../App';

export default function TripDetailsForm({
  tripType,
  setTripType,

  // required info
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,

  // required info
  pickupDateTime,
  setPickupDateTime,
  vehicleType,
  setVehicleType,
  numOfPassengers,
  setNumOfPassengers,
  numOfLuggagesChecked,
  setNumOfLuggagesChecked,
  numOfLuggagesCarryOn,
  setNumOfLuggagesCarryOn,

  // required info
  pickupAddress,
  setPickupAddress,
  dropoffAddress,
  setDropoffAddress,

  // form flags
  firstNameFlag,
  lastNameFlag,
  phoneNumberFlag,
  emailFlag,
  pickupDateTimeFlag,
  pickupAddressFlag,
  pickupCityFlag,
  dropoffAddressFlag,
  dropoffCityFlag,
}) {
  const context = useContext(AppContext);

  const [pricingInfoData, setPricingInfoData] = useState([]);
  const [showPricingInfoTable, setShowPricingInfoTable] = useState(false);

  const [headerSortBys, setHeaderSortBys] = useState({});

  const sortColumn = (header) => {
    const previousSortBy = headerSortBys[header];
    var resetHeaderSortBys = {};
    Object.keys(PRICING_INFO_TABLE_HEADERS).forEach((key) => {
      resetHeaderSortBys[key] = '';
    });
    if (previousSortBy === 'asc') {
      resetHeaderSortBys[header] = 'desc';
    } else {
      resetHeaderSortBys[header] = 'asc';
    }

    setHeaderSortBys({ ...resetHeaderSortBys });
    var sorted = pricingInfoData.sort(
      sortPricingTableByColumn(header, resetHeaderSortBys[header]),
    );
    setPricingInfoData([...sorted]);
  };

  // reset # of passengers and bags when selecting vehicle type
  useEffect(() => {
    setNumOfPassengers(1);
    setNumOfLuggagesChecked(0);
    setNumOfLuggagesCarryOn(0);
  }, [vehicleType]);

  // pre fill pickup or dropoff address based on tripType
  useEffect(() => {
    if (env === 'dev') {
      console.log('dev', tripType);
    }

    switch (tripType) {
      case 'oneWay':
        setPickupAddress({ address: '', city: '', state: 'TX', zip: '' });
        setDropoffAddress({ address: '', city: '', state: 'TX', zip: '' });
        break;
      case 'toDfw':
        setPickupAddress({ address: '', city: '', state: 'TX', zip: '' });
        setDropoffAddress({ ...PUBLIC_ADDRESSES.dfw });
        break;
      case 'toLoveField':
        setPickupAddress({ address: '', city: '', state: 'TX', zip: '' });
        setDropoffAddress({ ...PUBLIC_ADDRESSES.loveField });
        break;
      case 'toAac':
        setPickupAddress({ address: '', city: '', state: 'TX', zip: '' });
        setDropoffAddress({ ...PUBLIC_ADDRESSES.aac });
        break;
      case 'toCs':
        setPickupAddress({ address: '', city: '', state: 'TX', zip: '' });
        setDropoffAddress({ ...PUBLIC_ADDRESSES.ds });
        break;
      case 'fromCs':
        setPickupAddress({ ...PUBLIC_ADDRESSES.ds });
        setDropoffAddress({ address: '', city: '', state: 'TX', zip: '' });
        break;
      case 'toDep':
        setPickupAddress({ address: '', city: '', state: 'TX', zip: '' });
        setDropoffAddress({ ...PUBLIC_ADDRESSES.dep });
        break;
      default:
        break;
    }
  }, [tripType]);

  useEffect(() => {
    // create a copy of the pricing table data
    const sortedInit = JSON.parse(JSON.stringify(PRICING_INFO_TABLE_DATA)).sort(
      sortPricingTableByColumn('pickUp', 'asc'),
    );
    setPricingInfoData([...sortedInit]);

    const headerSortBysInit = {};
    Object.keys(PRICING_INFO_TABLE_HEADERS).forEach((key) => {
      headerSortBysInit[key] = '';
    });

    headerSortBysInit.pickUp = 'asc';

    setHeaderSortBys({ ...headerSortBysInit });

    if (env === 'dev') {
      console.log('dev', 'user profile', context.userProfile);
    }
  }, []);

  return (
    <>
      <Box>
        <Box className="flex justify-between">
          <Box className="font-bold text-4xl">Service Type</Box>
          <Button
            variant="outlined"
            onClick={() => {
              setShowPricingInfoTable(true);
            }}
          >
            Pricing Info
          </Button>
        </Box>
        <FormControl variant="standard" className="w-full">
          <Select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            sx={{ fontSize: '1.4em' }}
          >
            {Object.keys(TRIP_TYPES).map((tripType) => (
              <MenuItem value={tripType} key={tripType} className="text-3xl">
                {TRIP_TYPES[tripType]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="mt-8">
        <Box className="font-bold text-4xl">Rider Information</Box>
        <Grid container>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box className="mx-1">
              <TextField
                className="w-full"
                label="First Name"
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                color={firstNameFlag ? 'error' : 'primary'}
                focused={firstNameFlag ? true : false}
                inputProps={{ style: { fontSize: '1.4em' } }}
                InputLabelProps={{ style: { fontSize: '1.4em' } }}
                disabled={context?.userProfile != null}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box className="mx-1">
              <TextField
                className="w-full"
                label="Last Name"
                variant="standard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                color={lastNameFlag ? 'error' : 'primary'}
                focused={lastNameFlag ? true : false}
                inputProps={{ style: { fontSize: '1.4em' } }}
                InputLabelProps={{ style: { fontSize: '1.4em' } }}
                disabled={context?.userProfile != null}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box className="mx-1 mt-4 ">
              <MuiTelInput
                className="w-full"
                defaultCountry="US"
                disableDropdown
                forceCallingCode
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                placeholder="Phone number"
                color={phoneNumberFlag ? 'error' : 'primary'}
                focused={phoneNumberFlag ? true : false}
                inputProps={{ style: { fontSize: '1.4em' } }}
                InputLabelProps={{ style: { fontSize: '1.4em' } }}
                disabled={context?.userProfile != null}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box className="mx-1 mt-4">
              <TextField
                className="w-full"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color={emailFlag ? 'error' : 'primary'}
                focused={emailFlag ? true : false}
                inputProps={{ style: { fontSize: '1.4em' } }}
                InputLabelProps={{ style: { fontSize: '1.4em' } }}
                disabled={context?.userProfile != null}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className="flex flex-col justify-between mt-12 font-bold w-full">
        <Box className="text-4xl">Pickup Date & Time</Box>
        <Box className="mt-4">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label=""
              className="w-full"
              value={pickupDateTime}
              onChange={(e) => setPickupDateTime(moment(e))}
              sx={{
                borderColor: 'red',
                borderWidth: pickupDateTimeFlag ? '1px' : '0px',
                borderStyle: 'solid',
                borderRadius: '5px',
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <Box>
        <VehicleForm
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
        />
      </Box>

      <Grid container>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box className="mr-2 w-full">
            <FormControl variant="standard" className="w-full">
              <InputLabel
                id="num-of-passengers"
                className="font-bold"
                sx={{ fontWeight: 'bold', fontSize: '1.4em' }}
              >
                # of Passengers
              </InputLabel>
              <Select
                labelId="num-of-passengers"
                value={numOfPassengers}
                onChange={(e) => setNumOfPassengers(e.target.value)}
                sx={{ fontSize: '1.4em' }}
              >
                {(vehicleType === VEHICLE_TYPES[0]
                  ? [1, 2, 3, 4]
                  : [1, 2, 3, 4, 5, 6]
                ).map((num) => (
                  <MenuItem value={num} key={num} className="text-3xl">
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box className="ml-2 w-full flex">
            <FormControl variant="standard" className="w-full">
              <InputLabel
                id="num-of-luggages"
                className="font-bold"
                sx={{ fontWeight: 'bold', fontSize: '1.4em' }}
              >
                # of Checked Bags
              </InputLabel>
              <Select
                labelId="num-of-luggages"
                value={numOfLuggagesChecked}
                onChange={(e) => setNumOfLuggagesChecked(e.target.value)}
                sx={{ fontSize: '1.4em' }}
              >
                {(vehicleType === VEHICLE_TYPES[0]
                  ? [0, 1, 2]
                  : [0, 1, 2, 3, 4, 5]
                ).map((num) => (
                  <MenuItem value={num} key={num} className="text-3xl">
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" className="w-full">
              <InputLabel
                id="num-of-luggages"
                className="font-bold"
                sx={{ fontWeight: 'bold', fontSize: '1.4em' }}
              >
                # of Carry-On Bags
              </InputLabel>
              <Select
                labelId="num-of-luggages"
                value={numOfLuggagesCarryOn}
                onChange={(e) => setNumOfLuggagesCarryOn(e.target.value)}
                sx={{ fontSize: '1.4em' }}
              >
                {(vehicleType === VEHICLE_TYPES[0]
                  ? [0, 1, 2, 3]
                  : [0, 1, 2, 3, 4, 5, 6]
                ).map((num) => (
                  <MenuItem value={num} key={num} className="text-3xl">
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid size={{ xs: 12, lg: 'grow' }} sx={{ marginTop: '16px' }}>
          <Box className="w-full">
            <Box className="font-bold text-4xl">Pickup Address</Box>
            <TextField
              className="w-full"
              label="Address"
              variant="standard"
              value={pickupAddress.address}
              onChange={(e) =>
                setPickupAddress({ ...pickupAddress, address: e.target.value })
              }
              color={pickupAddressFlag ? 'error' : 'primary'}
              focused={pickupAddressFlag ? true : false}
              inputProps={{ style: { fontSize: '1.4em' } }}
              InputLabelProps={{ style: { fontSize: '1.4em' } }}
              disabled={tripType === 'fromCs' ? true : false}
            />
            <TextField
              className="w-full"
              label="City"
              variant="standard"
              value={pickupAddress.city}
              onChange={(e) =>
                setPickupAddress({
                  ...pickupAddress,
                  city: capitalizeString(e.target.value),
                })
              }
              color={pickupCityFlag ? 'error' : 'primary'}
              focused={pickupCityFlag ? true : false}
              inputProps={{ style: { fontSize: '1.4em' } }}
              InputLabelProps={{ style: { fontSize: '1.4em' } }}
              disabled={tripType === 'fromCs' ? true : false}
            />
            <Select
              value={'Texas'}
              sx={{ fontSize: '1.4em' }}
              className="w-full mt-4"
              variant="standard"
              disabled={tripType === 'fromCs' ? true : false}
            >
              {STATES.map((state) => (
                <MenuItem value={state} key={state} sx={{ fontSize: '1.4em' }}>
                  {state}
                </MenuItem>
              ))}
            </Select>
            <TextField
              className="w-full"
              label="Zip (optional)"
              variant="standard"
              value={pickupAddress.zip}
              onChange={(e) =>
                setPickupAddress({ ...pickupAddress, zip: e.target.value })
              }
              inputProps={{ style: { fontSize: '1.4em' } }}
              InputLabelProps={{ style: { fontSize: '1.4em' } }}
              disabled={tripType === 'fromCs' ? true : false}
            />
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, lg: 1 }}
          className="flex justify-center"
          sx={{ marginTop: '16px' }}
        >
          <Divider
            orientation="vertical"
            // sx={{ borderColor: 'blue', width: '10px' }}
            flexItem
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 'grow' }} sx={{ marginTop: '16px' }}>
          <Box className="w-full">
            <Box className="font-bold text-4xl">Dropoff Address</Box>
            <TextField
              className="w-full"
              label="Address"
              variant="standard"
              value={dropoffAddress.address}
              onChange={(e) =>
                setDropoffAddress({
                  ...dropoffAddress,
                  address: e.target.value,
                })
              }
              color={dropoffAddressFlag ? 'error' : 'primary'}
              focused={dropoffAddressFlag ? true : false}
              inputProps={{ style: { fontSize: '1.4em' } }}
              InputLabelProps={{ style: { fontSize: '1.4em' } }}
              disabled={
                tripType !== 'oneWay' && tripType !== 'fromCs' ? true : false
              }
            />
            <TextField
              className="w-full"
              label="City"
              variant="standard"
              value={dropoffAddress.city}
              onChange={(e) =>
                setDropoffAddress({
                  ...dropoffAddress,
                  city: capitalizeString(e.target.value),
                })
              }
              color={dropoffCityFlag ? 'error' : 'primary'}
              focused={dropoffCityFlag ? true : false}
              inputProps={{ style: { fontSize: '1.4em' } }}
              InputLabelProps={{ style: { fontSize: '1.4em' } }}
              disabled={
                tripType !== 'oneWay' && tripType !== 'fromCs' ? true : false
              }
            />
            <Select
              value={'Texas'}
              className="w-full mt-4"
              variant="standard"
              sx={{ fontSize: '1.4em' }}
              disabled={
                tripType !== 'oneWay' && tripType !== 'fromCs' ? true : false
              }
            >
              {STATES.map((state) => (
                <MenuItem value={state} key={state} sx={{ fontSize: '1.4em' }}>
                  {state}
                </MenuItem>
              ))}
            </Select>
            <TextField
              className="w-full"
              label="Zip (optional)"
              variant="standard"
              value={dropoffAddress.zip}
              onChange={(e) =>
                setDropoffAddress({ ...dropoffAddress, zip: e.target.value })
              }
              inputProps={{ style: { fontSize: '1.4em' } }}
              InputLabelProps={{ style: { fontSize: '1.4em' } }}
              disabled={
                tripType !== 'oneWay' && tripType !== 'fromCs' ? true : false
              }
            />
          </Box>
        </Grid>
      </Grid>

      {/* Pricing Info */}
      <Modal
        open={showPricingInfoTable}
        onClose={() => {
          setShowPricingInfoTable(false);
        }}
        className="fixed m-auto top-0 bottom-0 left-0 right-0 h-fit w-10/12"
      >
        <Box className="bg-white p-4 rounded-lg overflow-x-auto">
          <Box className="flex justify-center font-bold">Pricing Info</Box>
          <Box>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: '80vh', maxWidth: '100%', overflowX: 'auto' }}
            >
              <Table size="large" stickyHeader>
                <TableHead>
                  <TableRow>
                    {Object.keys(PRICING_INFO_TABLE_HEADERS).map(
                      (headerKey, i) => (
                        <TableCell
                          key={i}
                          sx={{ fontWeight: 'bold' }}
                          onClick={() => {
                            sortColumn(headerKey);
                          }}
                          className="cursor-pointer"
                        >
                          {headerSortBys[headerKey] !== '' && (
                            <IconButton
                              className={
                                headerSortBys[headerKey] === 'asc'
                                  ? 'rotate-180'
                                  : 'rotate-0'
                              }
                            >
                              <FilterListIcon />
                            </IconButton>
                          )}
                          {PRICING_INFO_TABLE_HEADERS[headerKey]}
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {pricingInfoData.map((row, i) => (
                    <TableRow key={i} hover>
                      <TableCell>{row.pickUp}</TableCell>
                      <TableCell>{row.dropOff}</TableCell>
                      <TableCell>$ {row.sedanPrice}</TableCell>
                      <TableCell>$ {row.suvPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
