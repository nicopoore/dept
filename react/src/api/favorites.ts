import axios from "utils/axios";

export const addFavorite = async (flightNumber: number) =>
  axios.post(`/launches/${flightNumber}/favorite`);

export const removeFavorite = async (flightNumber: number) =>
  axios.delete(`/launches/${flightNumber}/favorite`);
