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
exports.getFavorites = exports.removeFavorite = exports.addFavorite = void 0;
const { AppDataSource } = require("../database/app-data-source");
const { Favorites } = require("../entities/favorites");
const addFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.currentUserId;
    const flight_number = req.params.flight_number;
    const favoritesRepo = AppDataSource.getRepository(Favorites);
    const currentFav = yield favoritesRepo.find({
        where: {
            flight_number,
            user_id
        }
    });
    if (!currentFav.length) {
        yield favoritesRepo.insert({
            flight_number,
            user_id
        });
    }
    return res
        .status(201)
        .json(`Favorite for ${req.params.flight_number} has been updated.`);
});
exports.addFavorite = addFavorite;
const removeFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.currentUserId;
    const flight_number = req.params.flight_number;
    const favoritesRepo = AppDataSource.getRepository(Favorites);
    yield favoritesRepo.delete({
        flight_number,
        user_id
    });
    return res
        .status(200)
        .json(`Favorite for ${req.params.flight_number} has been removed.`);
});
exports.removeFavorite = removeFavorite;
const getFavorites = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoritesRepo = AppDataSource.getRepository(Favorites);
    const favs = yield favoritesRepo.find();
    return res.status(200).json(favs);
});
exports.getFavorites = getFavorites;
