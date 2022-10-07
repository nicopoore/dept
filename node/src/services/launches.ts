/* eslint-disable camelcase */
import { getUserFavorites } from "./favorites";

export const processLaunches = async (userId, launches, rockets) => {
  const userFavorites = await getUserFavorites(userId);

  return [];
};
