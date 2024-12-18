import moment from 'moment';
import { env } from './App';
import { DASHBAORD_PAGE } from './constants';

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
        if (vehicleType === 'Sedan') {
          return 75;
        } else {
          return 85;
        }
      } else if (
        pickupCity.toLowerCase() === 'royse city' ||
        pickupCity.toLowerCase() === 'caddo mills'
      ) {
        if (vehicleType === 'Sedan') {
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
        if (vehicleType === 'Sedan') {
          return 65;
        } else {
          return 75;
        }
      } else if (
        pickupCity.toLowerCase() === 'royse city' ||
        pickupCity.toLowerCase() === 'caddo mills'
      ) {
        if (vehicleType === 'Sedan') {
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
        if (vehicleType === 'Sedan') {
          return 65;
        } else {
          return 75;
        }
      } else if (
        pickupCity.toLowerCase() === 'royse city' ||
        pickupCity.toLowerCase() === 'caddo mills'
      ) {
        if (vehicleType === 'Sedan') {
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

export const getYearsForFilters = (initYear) => {
  var years = [];

  const nextYear = moment().year() + 1;

  for (let index = nextYear - initYear; index >= 0; index--) {
    years.push(initYear + index);
  }

  if (env === 'dev') {
    console.log('dev', 'years', years);
  }

  return years;
};
