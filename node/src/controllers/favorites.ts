const { AppDataSource } = require('../database/app-data-source')
const { Favorites } = require('../entities/favorites')

export const addFavorite = async (req, res) => {
  const user_id = req.currentUserId
  if (!user_id) {
    console.error(`Couldn't find user`)
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const flight_number = req.params.flight_number
  if (!flight_number) {
    console.error('Flight number is required')
    return res.status(400).json({ error: 'Flight number is required' })
  }

  const favoritesRepo = AppDataSource.getRepository(Favorites)
  const currentFav = await favoritesRepo.find({
    where: {
      flight_number,
      user_id,
    },
  })

  if (!currentFav.length) {
    try {
      await favoritesRepo.insert({
        flight_number,
        user_id,
      })
      return res.status(201).json(`Favorite for ${req.params.flight_number} has been updated.`)
    } catch (error) {
      console.error('Failed to add favorite', error)
      return res.status(500).json({ error: 'Failed to add favorite' })
    }
  }

  console.error(`Flight ${flight_number} is already in favorites`)
  return res.status(409).json({ message: `Flight ${flight_number} is already in favorites` })
}

export const removeFavorite = async (req, res) => {
  const user_id = req.currentUserId
  if (!user_id) {
    console.error(`Couldn't find user`)
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const flight_number = req.params.flight_number
  if (!flight_number) {
    console.error('Flight number is required')
    return res.status(400).json({ error: 'Flight number is required' })
  }

  const favoritesRepo = AppDataSource.getRepository(Favorites)

  const currentFav = await favoritesRepo.find({
    where: {
      flight_number,
      user_id,
    },
  })

  if (!currentFav.length) {
    console.error(`Flight ${flight_number} is not in favorites`)
    return res.status(404).json({ message: `Flight ${flight_number} is not in favorites` })
  }

  try {
    await favoritesRepo.delete({
      flight_number,
      user_id,
    })
    return res.status(200).json(`Favorite for ${req.params.flight_number} has been removed.`)
  } catch (error) {
    console.error('Failed to remove favorite', error)
    return res.status(500).json({ error: 'Failed to remove favorite' })
  }
}

export const getFavorites = async (_, res) => {
  const favoritesRepo = AppDataSource.getRepository(Favorites)

  try {
    const favs = await favoritesRepo.find()
    return res.status(200).json(favs)
  } catch (error) {
    console.error('Failed to get favorites', error)
    return res.status(500).json({ error: 'Failed to get favorites' })
  }
}
