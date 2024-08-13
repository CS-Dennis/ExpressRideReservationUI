import axios from "axios";

const env = import.meta.env;

export const submitRideRequest = (payload) => {
  const url = env.VITE_ETA_BASE_URL + env.VITE_SAVE_RIDE_REQUEST;
  return axios.post(url, payload);
};
