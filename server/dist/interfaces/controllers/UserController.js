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
exports.createUser = void 0;
const UserService_1 = require("../../application/services/UserService");
const UserRepository_1 = require("../../infrastructure/database/UserRepository");
const userRepository = new UserRepository_1.UserRepository();
const userService = new UserService_1.UserService(userRepository);
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = yield userService.registerUser(email, password);
        if (!user) {
            return res.status(400).json({ error: 'User already exists' });
        }
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.createUser = createUser;
