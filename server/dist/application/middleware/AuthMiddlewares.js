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
exports.checkUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../../infrastructure/database/models/UserModel"));
const JWT_KEY = process.env.JWT_SUPER_KEY;
const checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, JWT_KEY, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.json({ status: false });
            }
            else {
                const user = yield UserModel_1.default.findById(decodedToken.id);
                if (user) {
                    req.user = user; // assign user to req.user
                }
            }
            next();
        }));
    }
    else {
        next();
    }
});
exports.checkUser = checkUser;
