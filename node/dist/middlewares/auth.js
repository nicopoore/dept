"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res
                .status(400)
                .send({ meesage: "Authorization header is needed" });
        }
        const data = jsonwebtoken_1.default.verify(token, jwtSecretKey);
        if (!data) {
            return res.status(401).send({ meesage: "Invalid Authorization token" });
        }
        req.currentUserId = data.userId;
        return next();
    }
    catch (error) {
        return res.status(401).send({ meesage: "Invalid Authorization token" });
    }
};
exports.auth = auth;
