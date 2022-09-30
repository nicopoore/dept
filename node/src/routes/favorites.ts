// import attachCurrentUser from '../middlewares/attachCurrentUser'
// import { getLaunches, addLaunchToUserFavorites, removeLaunchFromUserFavorites} from '../../controllers/launches'
import { getFavorites } from "../controllers/favorites";

export default (router) => {
  router.get("/favorites", getFavorites);
};
