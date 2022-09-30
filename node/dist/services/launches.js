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
exports.processLaunches = void 0;
/* eslint-disable camelcase */
const favorites_1 = require("../services/favorites");
const findRocket = (rockets, rocketId) => rockets.find((rocket) => rocket.rocket_id === rocketId);
const findFavorite = (favorites, flightNumber) => favorites.find((favorite) => favorite.flight_number === flightNumber);
const processLaunches = (userId, launches, rockets) => __awaiter(void 0, void 0, void 0, function* () {
    const userFavorites = yield (0, favorites_1.getUserFavorites)(userId);
    return launches.map((launch) => {
        const { details, launch_date_unix, flight_number, mission_name, links: { mission_patch }, rocket: { rocket_name, rocket_id } } = launch;
        const { cost_per_launch, company, active } = findRocket(rockets, rocket_id);
        const foundFavorite = findFavorite(userFavorites, flight_number);
        return {
            flight_number,
            mission_name,
            mission_patch,
            details,
            launch_date_unix,
            rocket: {
                rocket_id,
                rocket_name,
                active,
                cost_per_launch,
                company
            },
            favorite: !!foundFavorite
        };
    });
});
exports.processLaunches = processLaunches;
