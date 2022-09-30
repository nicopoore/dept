"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFavorites = void 0;
const app_data_source_1 = require("../database/app-data-source");
const favorites_1 = require("../entities/favorites");
const getUserFavorites = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const favoritesRepo = app_data_source_1.AppDataSource.getRepository(favorites_1.Favorites);
    const currentFavs = yield favoritesRepo.find({
        where: {
            user_id
        }
    });
    return currentFavs;
});
exports.getUserFavorites = getUserFavorites;
