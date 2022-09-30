import { AppDataSource } from "../database/app-data-source";
import { Favorites } from "../entities/favorites";

export const getUserFavorites = async (user_id) => {
  const favoritesRepo = AppDataSource.getRepository(Favorites);
  const currentFavs = await favoritesRepo.find({
    where: {
      user_id
    }
  });

  return currentFavs;
};
