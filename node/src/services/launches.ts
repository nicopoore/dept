/* eslint-disable camelcase */
import { Launch, Rocket } from '../types'
import { getUserFavorites } from './favorites'

export const processLaunches = async (userId, launches: Launch[], rockets: Rocket[]) => {
  const userFavorites = await getUserFavorites(userId)

  return launches.map((launch) => {
    const rocket = rockets.find((r) => r.rocket_id === launch.rocket.rocket_id)
    if (!rocket) {
      console.error(`Rocket not found for launch ${launch.flight_number}`)
    }
    const isFavorite = userFavorites.some((fav) => fav.flight_number === launch.flight_number)

    return {
      flight_number: launch.flight_number,
      mission_name: launch.mission_name,
      mission_patch: launch.links.mission_patch,
      details: launch.details,
      launch_date_unix: launch.launch_date_unix,
      rocket: rocket
        ? {
            rocket_id: rocket.rocket_id,
            rocket_name: rocket.rocket_name,
            active: rocket.active,
            cost_per_launch: rocket.cost_per_launch,
            company: rocket.company,
          }
        : null,
      favorite: isFavorite,
    }
  })
}
