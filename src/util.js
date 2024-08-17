import { DASHBAORD_PAGE } from "./constants";

export const capitalizeString = (rawString) => {
  if (rawString === "") {
    return rawString;
  }
  const words = rawString.split(" ");
  if (words.length === 1) {
    // one word
    var chars = words[0].split("");

    if (chars.length === 1) {
      // one char
      return chars[0].toUpperCase();
    } else if (chars.length > 1) {
      // more chars
      var upperLetter = chars[0].toUpperCase();
      chars = chars.splice(1, chars.length);
      chars = chars.map((c) => c.toLowerCase());
      return upperLetter + chars.join("");
    }
  } else if (words.length > 1) {
    // mutiple words
    return "";
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
    return "Unknown Status";
  }
};
