"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import attachCurrentUser from '../middlewares/attachCurrentUser'
// import { getLaunches, addLaunchToUserFavorites, removeLaunchFromUserFavorites} from '../../controllers/launches'
const favorites_1 = require("../controllers/favorites");
exports.default = (router) => {
    router.get("/favorites", favorites_1.getFavorites);
};
