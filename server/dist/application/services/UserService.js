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
exports.UserService = void 0;
const hash_1 = require("../../infrastructure/hashing/hash");
const validateUser_1 = require("../../infrastructure/validation/validateUser");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    registerUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, validateUser_1.validateEmail)(email) || !(0, validateUser_1.validatePassword)(password)) {
                throw new Error('invalid email or password');
            }
            const existingUser = yield this.userRepository.findByEmail(email);
            if (existingUser) {
                return null;
            }
            const hashedPassword = yield (0, hash_1.hashPassword)(password);
            const newUser = { email, password: hashedPassword };
            return yield this.userRepository.create(newUser);
        });
    }
}
exports.UserService = UserService;
