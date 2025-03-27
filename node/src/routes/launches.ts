import { auth } from '../middlewares/auth'
import { getLaunchByFlightNumber, getLaunches } from '../controllers/launches'

export default (router) => {
  router.get('/launches', auth, getLaunches)
  router.get('/launches/:flightNumber', auth, getLaunchByFlightNumber)
}
