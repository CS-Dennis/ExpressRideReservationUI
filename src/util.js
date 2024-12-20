import moment from 'moment';
import { env } from './App';
import { DASHBAORD_PAGE, VEHICLE_TYPES } from './constants';

export const capitalizeString = (rawString) => {
  if (rawString === '') {
    return rawString;
  }

  const words = rawString.split(' ');
  var capitalizedWords = '';
  if (words.length > 0) {
    // w/o trailing space in rawString
    if (words[words.length - 1] !== '') {
      words.forEach((word, i) => {
        if (word !== '') {
          var chars = word.split('');
          if (chars.length === 1) {
            // one char
            if (words.length > 1 && i !== words.length - 1) {
              capitalizedWords += chars[0].toUpperCase() + ' ';
            } else {
              capitalizedWords += chars[0].toUpperCase();
            }
          } else if (chars.length > 1) {
            // more chars
            var upperLetter = chars[0].toUpperCase();
            chars = chars.splice(1, chars.length);
            chars = chars.map((c) => c.toLowerCase());
            if (words.length > 1 && i !== words.length - 1) {
              capitalizedWords += upperLetter + chars.join('') + ' ';
            } else {
              capitalizedWords += upperLetter + chars.join('');
            }
          }
        } else {
          capitalizedWords += ' ';
        }
      });
    } else {
      // w/ trailing space in rawString
      words.forEach((word) => {
        if (word !== '') {
          var chars = word.split('');
          if (chars.length === 1) {
            // one char
            capitalizedWords += chars[0].toUpperCase() + ' ';
          } else if (chars.length > 1) {
            // more chars
            var upperLetter = chars[0].toUpperCase();
            chars = chars.splice(1, chars.length);
            chars = chars.map((c) => c.toLowerCase());
            capitalizedWords += upperLetter + chars.join('') + ' ';
          }
        }
      });
    }
  }
  return capitalizedWords;
};

export const getRideRequestType = (rideRequest) => {
  if (rideRequest?.driverConfirmed === false) {
    return DASHBAORD_PAGE.newRequests;
  } else if (
    rideRequest?.driverConfirmed === true &&
    rideRequest?.customerConfirmed === false
  ) {
    return DASHBAORD_PAGE.pendingRequests;
  } else if (
    rideRequest?.driverConfirmed === true &&
    rideRequest?.customerConfirmed === true &&
    rideRequest?.tripCompleted === false
  ) {
    return DASHBAORD_PAGE.upcomingRides;
  } else if (rideRequest?.tripCompleted === true) {
    return DASHBAORD_PAGE.history;
  } else {
    return 'Unknown Status';
  }
};

export const sortPricingTableByColumn = (header, sortBy) => {
  switch (header) {
    case 'pickUp':
      if (sortBy === 'asc') {
        return sortByPickUpLocationAsc;
      } else if (sortBy === 'desc') {
        return sortByPickUpLocationDesc;
      }
      break;

    case 'dropOff':
      if (sortBy === 'asc') {
        return sortByDropOffLocationAsc;
      } else if (sortBy === 'desc') {
        return sortByDropOffLocationDesc;
      }
      break;

    case 'sedanPrice':
      if (sortBy === 'asc') {
        return sortBySedanPriceAsc;
      } else if (sortBy === 'desc') {
        return sortBySedanPriceDesc;
      }
      break;

    case 'suvPrice':
      if (sortBy === 'asc') {
        return sortBySuvPriceAsc;
      } else if (sortBy === 'desc') {
        return sortBySuvPriceDesc;
      }
      break;

    default:
      break;
  }
};

const sortByPickUpLocationAsc = (a, b) => {
  if (a.pickUp.toLowerCase() > b.pickUp.toLowerCase()) {
    return 1;
  } else if (a.pickUp.toLowerCase() === b.pickUp.toLowerCase()) {
    return 0;
  } else {
    return -1;
  }
};

const sortByPickUpLocationDesc = (a, b) => {
  if (a.pickUp.toLowerCase() > b.pickUp.toLowerCase()) {
    return -1;
  } else if (a.pickUp.toLowerCase() === b.pickUp.toLowerCase()) {
    return 0;
  } else {
    return 1;
  }
};

const sortByDropOffLocationAsc = (a, b) => {
  if (a.dropOff.toLowerCase() > b.dropOff.toLowerCase()) {
    return 1;
  } else if (a.dropOff.toLowerCase() === b.dropOff.toLowerCase()) {
    return 0;
  } else {
    return -1;
  }
};

const sortByDropOffLocationDesc = (a, b) => {
  if (a.dropOff.toLowerCase() > b.dropOff.toLowerCase()) {
    return -1;
  } else if (a.dropOff.toLowerCase() === b.dropOff.toLowerCase()) {
    return 0;
  } else {
    return 1;
  }
};

const sortBySedanPriceAsc = (a, b) => {
  return a.sedanPrice - b.sedanPrice;
};

const sortBySedanPriceDesc = (a, b) => {
  return b.sedanPrice - a.sedanPrice;
};

const sortBySuvPriceAsc = (a, b) => {
  return a.suvPrice - b.suvPrice;
};

const sortBySuvPriceDesc = (a, b) => {
  return b.suvPrice - a.suvPrice;
};

export const estimatedPrice = (
  tripType,
  vehicleType,
  pickupCity,
  dropoffCity,
) => {
  switch (tripType) {
    case 'toDfw':
      if (
        pickupCity.toLowerCase() === 'rockwall' ||
        pickupCity.toLowerCase() === 'fate'
      ) {
        if (vehicleType === VEHICLE_TYPES[0]) {
          return 75;
        } else {
          return 85;
        }
      } else if (
        pickupCity.toLowerCase() === 'royse city' ||
        pickupCity.toLowerCase() === 'caddo mills'
      ) {
        if (vehicleType === VEHICLE_TYPES[0]) {
          return 85;
        } else {
          return 95;
        }
      }
      break;
    case 'toLoveField':
      if (
        pickupCity.toLowerCase() === 'rockwall' ||
        pickupCity.toLowerCase() === 'fate'
      ) {
        return 75;
      } else if (
        pickupCity.toLowerCase() === 'royse city' ||
        pickupCity.toLowerCase() === 'caddo mills'
      ) {
        return 85;
      }
      break;
    case 'toAac':
      if (
        pickupCity.toLowerCase() === 'rockwall' ||
        pickupCity.toLowerCase() === 'fate'
      ) {
        if (vehicleType === VEHICLE_TYPES[0]) {
          return 65;
        } else {
          return 75;
        }
      } else if (
        pickupCity.toLowerCase() === 'royse city' ||
        pickupCity.toLowerCase() === 'caddo mills'
      ) {
        if (vehicleType === VEHICLE_TYPES[0]) {
          return 75;
        } else {
          return 85;
        }
      }
      break;
    case 'toCs':
      if (
        pickupCity.toLowerCase() === 'rockwall' ||
        pickupCity.toLowerCase() === 'fate'
      ) {
        return 75;
      } else if (
        pickupCity.toLowerCase() === 'royse city' ||
        pickupCity.toLowerCase() === 'caddo mills'
      ) {
        return 85;
      }
      break;
    case 'fromCs':
      if (
        dropoffCity.toLowerCase() === 'rockwall' ||
        dropoffCity.toLowerCase() === 'fate'
      ) {
        return 100;
      } else if (
        dropoffCity.toLowerCase() === 'royse city' ||
        dropoffCity.toLowerCase() === 'caddo mills'
      ) {
        return 110;
      }
      break;
    case 'toDep':
      if (
        pickupCity.toLowerCase() === 'rockwall' ||
        pickupCity.toLowerCase() === 'fate'
      ) {
        if (vehicleType === VEHICLE_TYPES[0]) {
          return 65;
        } else {
          return 75;
        }
      } else if (
        pickupCity.toLowerCase() === 'royse city' ||
        pickupCity.toLowerCase() === 'caddo mills'
      ) {
        if (vehicleType === VEHICLE_TYPES[0]) {
          return 75;
        } else {
          return 85;
        }
      }
      break;
    default:
      return null;
  }
};

export const checkUserLogin = (context, navigation) => {
  if (env === 'dev') {
    console.log('dev', context.session);
    console.log('dev', location.pathname);
  }

  // if not logged in and path is not /guest (this path is reserved for continue as a guest for the trip request), redirect to landing page
  if (!context.session && location.pathname !== '/guest') {
    navigation('/');
  }
  // if logged in and path is /guest, redirect to /home
  else if (context.session && location.pathname === '/guest') {
    navigation('/home');
  }
};

export const getYearsForFilters = (initYear, endingNextYear = true) => {
  var years = [];

  const nextYear = moment().year() + 1;
  const currentYear = moment().year();

  for (
    let index = (endingNextYear ? nextYear : currentYear) - initYear;
    index >= 0;
    index--
  ) {
    years.push(initYear + index);
  }

  if (env === 'dev') {
    console.log('dev', 'years', years);
  }

  return years;
};

// [
//   {
//       "pickup_datetime": "2024-12-21T00:30:00+00:00",
//       "vehicle_type": "Sedan",
//       "trip_charge": {
//           "price": 75
//       }
//   },
//   {
//       "pickup_datetime": "2024-12-18T01:35:00+00:00",
//       "vehicle_type": "Sedan",
//       "trip_charge": {
//           "price": 1032
//       }
//   },
//   {
//       "pickup_datetime": "2024-12-13T06:00:00+00:00",
//       "vehicle_type": "Sedan",
//       "trip_charge": {
//           "price": 100
//       }
//   }
// ]
export const transformRideRequestsToObjectByMonth = (rideRequests) => {
  var transformedData = {
    jan: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    feb: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    mar: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    apr: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    may: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    jun: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    jul: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    aug: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    sep: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    oct: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    nov: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
    dec: {
      requests: [],
      total: 0,
      sedan: 0,
      suv: 0,
      totalTrips: 0,
      sedanTrips: 0,
      suvTrips: 0,
    },
  };

  if (rideRequests?.length > 1) {
    rideRequests.forEach((request) => {
      const month = moment(request.pickup_datetime).month();
      switch (month) {
        case 0:
          transformedData.jan.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.jan.sedan += request?.trip_charge?.price;
            transformedData.jan.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.jan.suv += request?.trip_charge?.price;
            transformedData.jan.suvTrips += 1;
          }
          transformedData.jan.total += request?.trip_charge?.price;
          transformedData.jan.totalTrips += 1;
          break;
        case 1:
          transformedData.feb.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.feb.sedan += request?.trip_charge?.price;
            transformedData.feb.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.feb.suv += request?.trip_charge?.price;
            transformedData.feb.suvTrips += 1;
          }
          transformedData.feb.total += request?.trip_charge?.price;
          transformedData.feb.totalTrips += 1;
          break;
        case 2:
          transformedData.mar.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.mar.sedan += request?.trip_charge?.price;
            transformedData.mar.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.mar.suv += request?.trip_charge?.price;
            transformedData.mar.suvTrips += 1;
          }
          transformedData.mar.total += request?.trip_charge?.price;
          transformedData.mar.totalTrips += 1;
          break;
        case 3:
          transformedData.apr.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.apr.sedan += request?.trip_charge?.price;
            transformedData.apr.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.apr.suv += request?.trip_charge?.price;
            transformedData.apr.suvTrips += 1;
          }
          transformedData.apr.total += request?.trip_charge?.price;
          transformedData.apr.totalTrips += 1;
          break;
        case 4:
          transformedData.may.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.may.sedan += request?.trip_charge?.price;
            transformedData.may.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.may.suv += request?.trip_charge?.price;
            transformedData.may.suvTrips += 1;
          }
          transformedData.may.total += request?.trip_charge?.price;
          transformedData.may.totalTrips += 1;
          break;
        case 5:
          transformedData.jun.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.jun.sedan += request?.trip_charge?.price;
            transformedData.jun.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.jun.suv += request?.trip_charge?.price;
            transformedData.jun.suvTrips += 1;
          }
          transformedData.jun.total += request?.trip_charge?.price;
          transformedData.jun.totalTrips += 1;
          break;
        case 6:
          transformedData.jul.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.jul.sedan += request?.trip_charge?.price;
            transformedData.jul.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.jul.suv += request?.trip_charge?.price;
            transformedData.jul.suvTrips += 1;
          }
          transformedData.jul.total += request?.trip_charge?.price;
          transformedData.jul.totalTrips += 1;
          break;
        case 7:
          transformedData.aug.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.aug.sedan += request?.trip_charge?.price;
            transformedData.aug.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.aug.suv += request?.trip_charge?.price;
            transformedData.aug.suvTrips += 1;
          }
          transformedData.aug.total += request?.trip_charge?.price;
          transformedData.aug.totalTrips += 1;
          break;
        case 8:
          transformedData.sep.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.sep.sedan += request?.trip_charge?.price;
            transformedData.sep.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.sep.suv += request?.trip_charge?.price;
            transformedData.sep.suvTrips += 1;
          }
          transformedData.sep.total += request?.trip_charge?.price;
          transformedData.sep.totalTrips += 1;
          break;
        case 9:
          transformedData.oct.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.oct.sedan += request?.trip_charge?.price;
            transformedData.oct.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.oct.suv += request?.trip_charge?.price;
            transformedData.oct.suvTrips += 1;
          }
          transformedData.oct.total += request?.trip_charge?.price;
          transformedData.oct.totalTrips += 1;
          break;
        case 10:
          transformedData.nov.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.nov.sedan += request?.trip_charge?.price;
            transformedData.nov.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.nov.suv += request?.trip_charge?.price;
            transformedData.nov.suvTrips += 1;
          }
          transformedData.nov.total += request?.trip_charge?.price;
          transformedData.nov.totalTrips += 1;
          break;
        case 11:
          transformedData.dec.requests.push(request);
          if (request.vehicle_type === VEHICLE_TYPES[0]) {
            transformedData.dec.sedan += request?.trip_charge?.price;
            transformedData.dec.sedanTrips += 1;
          } else if (request.vehicle_type === VEHICLE_TYPES[1]) {
            transformedData.dec.suv += request?.trip_charge?.price;
            transformedData.dec.suvTrips += 1;
          }
          transformedData.dec.total += request?.trip_charge?.price;
          transformedData.dec.totalTrips += 1;
          break;
        default:
          break;
      }
    });
  }
  return transformedData;
};
