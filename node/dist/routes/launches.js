"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const launches_1 = require("../controllers/launches");
exports.default = (router) => {
    router.get("/launches", auth_1.auth, launches_1.getLaunches);
};
