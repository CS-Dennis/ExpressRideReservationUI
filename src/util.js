import { DASHBAORD_PAGE } from './constants';

export const capitalizeString = (rawString) => {
  if (rawString === '') {
    return rawString;
  }
  const words = rawString.split(' ');
  if (words.length === 1) {
    // one word
    var chars = words[0].split('');

    if (chars.length === 1) {
      // one char
      return chars[0].toUpperCase();
    } else if (chars.length > 1) {
      // more chars
      var upperLetter = chars[0].toUpperCase();
      chars = chars.splice(1, chars.length);
      chars = chars.map((c) => c.toLowerCase());
      return upperLetter + chars.join('');
    }
  } else if (words.length > 1) {
    // mutiple words
    return '';
  }
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

    case 'sedanPrice':
      if (sortBy === 'asc') {
        return sortBySedanPriceAsc;
      } else if (sortBy === 'desc') {
        return sortBySedanPriceDesc;
      }

    case 'suvPrice':
      if (sortBy === 'asc') {
        return sortBySuvPriceAsc;
      } else if (sortBy === 'desc') {
        return sortBySuvPriceDesc;
      }
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
