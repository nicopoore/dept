"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const launches_1 = require("../controllers/launches");
const favorites_1 = require("../controllers/favorites");
exports.default = (router) => {
    router.get("/launches", auth_1.auth, launches_1.getLaunches);
    router.post("/launches/:flight_number/favorite", auth_1.auth, favorites_1.addFavorite);
    router.delete("/launches/:flight_number/favorite", auth_1.auth, favorites_1.removeFavorite);
};
