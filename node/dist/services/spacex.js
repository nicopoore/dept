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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRockets = exports.fetchLaunches = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return {};
    }
});
const fetchLaunches = () => __awaiter(void 0, void 0, void 0, function* () { return fetchData(`${process.env.SPACEX_API_URL}/launches`); });
exports.fetchLaunches = fetchLaunches;
const fetchRockets = () => __awaiter(void 0, void 0, void 0, function* () { return fetchData(`${process.env.SPACEX_API_URL}/rockets`); });
exports.fetchRockets = fetchRockets;
