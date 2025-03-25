import { fetchLaunches, fetchRockets } from '../services/spacex'
import { processLaunches } from '../services/launches'

export const getLaunches = async (req, res) => {
  const userId = req.currentUserId
  const [launches, rockets] = await Promise.all([fetchLaunches(), fetchRockets()])
  console.log({ launches, rockets })
  const outputLaunches = await processLaunches(userId, launches, rockets)
  console.log({ outputLaunches })

  return res.status(200).json(outputLaunches)
}
