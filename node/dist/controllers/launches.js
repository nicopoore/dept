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
exports.getLaunches = void 0;
const spacex_1 = require("../services/spacex");
const launches_1 = require("../services/launches");
const getLaunches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.currentUserId;
    const [launches, rockets] = yield Promise.all([
        (0, spacex_1.fetchLaunches)(),
        (0, spacex_1.fetchRockets)()
    ]);
    const outputLaunches = yield (0, launches_1.processLaunches)(userId, launches, rockets);
    return res.status(200).json(outputLaunches);
});
exports.getLaunches = getLaunches;
