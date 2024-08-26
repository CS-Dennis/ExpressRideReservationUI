import axios from 'axios';

const env = import.meta.env;

export const submitRideRequest = (payload, disableEmail) => {
  const url =
    env.VITE_ETA_BASE_URL +
    env.VITE_SAVE_RIDE_REQUEST +
    `?disable_email=${disableEmail}`;
  return axios.post(url, payload);
};

export const getRideRequestsByType = (type) => {
  // type:
  // 0 = New Requests (driverConfirmed = false)
  // 1 = Pending Confirmation (customerConfirmed = false)
  // 2 = Upcoming Confirmed Rides (driverConfirmed = true, customerConfirmed = true)
  // 3 = History (tripCompleted= true)
  const url =
    env.VITE_ETA_BASE_URL +
    env.VITE_GET_RIDE_REQUESTS_BY_TYPE +
    `?type=${type}`;
  return axios.get(url);
};

export const getRideRequestByConfirmationCode = (confirmationCode) => {
  const url =
    env.VITE_ETA_BASE_URL +
    env.VITE_GET_RIDE_REQUEST_BY_CONFIRMATION_CODE +
    `/${confirmationCode}`;
  return axios.get(url);
};

export const getRideRequestById = (id) => {
  const url = env.VITE_ETA_BASE_URL + env.VITE_SAVE_RIDE_REQUEST;

  return axios.get(url + '?id=' + id);
};

// for driver to confirm user's ride request
export const confirmRideRequest = (payload, disableEmail) => {
  const url =
    env.VITE_ETA_BASE_URL +
    env.VITE_CONFIRM_RIDE_REQUEST +
    `?disable_email=${disableEmail}`;
  return axios.post(url, payload);
};

// used for customer to confirm the trip
export const confirmTrip = (confirmationCode) => {
  const url =
    env.VITE_ETA_BASE_URL +
    env.VITE_CONFIRM_TRIP +
    `?confirmation_code=${confirmationCode}`;
  return axios.get(url);
};

export const completeRideRequest = (id) => {
  const url =
    env.VITE_ETA_BASE_URL + env.VITE_COMPLETE_RIDE_REQEUST + `?id=${id}`;
  return axios.get(url);
};

// used for driver to update personal notes for the ride request
export const updatePersonalNotes = (payload) => {
  const url = env.VITE_ETA_BASE_URL + env.VITE_UPDATE_PERSONAL_NOTES;
  return axios.post(url, payload);
};
