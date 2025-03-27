import {
  fetchLaunchByFlightNumber,
  fetchLaunches,
  fetchRocketById,
  fetchRockets,
} from '../services/spacex'
import { processLaunch, processLaunches } from '../services/launches'

export const getLaunches = async (req, res) => {
  const userId = req.currentUserId
  const [launches, rockets] = await Promise.all([fetchLaunches(), fetchRockets()])
  const outputLaunches = await processLaunches(userId, launches, rockets)

  return res.status(200).json(outputLaunches)
}

export const getLaunchByFlightNumber = async (req, res) => {
  const userId = req.currentUserId
  const { flightNumber } = req.params
  const launch = await fetchLaunchByFlightNumber(flightNumber)
  if (!launch) {
    return res.status(404).json({ error: 'Launch not found' })
  }

  const rocket = await fetchRocketById(launch.rocket.rocket_id)
  if (!rocket) {
    return res.status(404).json({ error: 'Rocket not found' })
  }
  const outputLaunch = await processLaunch(userId, launch, rocket)

  return res.status(200).json(outputLaunch)
}
