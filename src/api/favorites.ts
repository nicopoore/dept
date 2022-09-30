import axios from "utils/axios";

export const addFavorite = async (flightNumber) =>
  axios.post(`/launches/${flightNumber}/favorite`);

export const removeFavorite = async (flightNumber) =>
  axios.delete(`/launches/${flightNumber}/favorite`);
