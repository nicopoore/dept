/* eslint-disable camelcase */
import { getUserFavorites } from "./favorites";
const findRocket = (rockets, rocketId) =>
  rockets.find((rocket) => rocket.rocket_id === rocketId);
const findFavorite = (favorites, flightNumber) =>
  favorites.find((favorite) => favorite.flight_number === flightNumber);

export const processLaunches = async (userId, launches, rockets) => {
  const userFavorites = await getUserFavorites(userId);

  return launches.map((launch) => {
    const {
      details,
      launch_date_unix,
      flight_number,
      mission_name,
      links: { mission_patch },
      rocket: { rocket_name, rocket_id }
    } = launch;
    const { cost_per_launch, company, active } = findRocket(rockets, rocket_id);
    const foundFavorite = findFavorite(userFavorites, flight_number);

    return {
      flight_number,
      mission_name,
      mission_patch,
      details,
      launch_date_unix,
      rocket: {
        rocket_id,
        rocket_name,
        active,
        cost_per_launch,
        company
      },
      favorite: !!foundFavorite
    };
  });
};
