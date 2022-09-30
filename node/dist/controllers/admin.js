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
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const userId = req.body.userId;
    if (!jwtSecretKey) {
        res.status(400).send("JWT Secret not set");
    }
    if (!userId) {
        res.status(400).send("UserId not set");
    }
    const data = {
        time: Date(),
        userId
    };
    const token = jsonwebtoken_1.default.sign(data, jwtSecretKey);
    res.send({ token });
});
exports.generateToken = generateToken;
