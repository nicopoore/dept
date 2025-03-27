import { Launch } from 'types'
import axios from 'utils/axios'

export const getLaunches = async (): Promise<Launch[]> => {
  try {
    const { data } = await axios.get('/launches')
    return data
  } catch (error) {
    console.error('Error fetching launches', error)
    throw error
  }
}

export const getLaunchByFlightNumber = async (flightNumber: number): Promise<Launch> => {
  try {
    const { data } = await axios.get(`/launches/${flightNumber}`)
    return data
  } catch (error) {
    console.error(`Error fetching launch ${flightNumber}`, error)
    throw error
  }
}
