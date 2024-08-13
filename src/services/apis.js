import axios from "axios";

const env = import.meta.env;

export const submitRideRequest = (payload) => {
  const url = env.VITE_ETA_BASE_URL + env.VITE_SAVE_RIDE_REQUEST;
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
