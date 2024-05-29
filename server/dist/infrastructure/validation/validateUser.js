"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateEmail = void 0;
const validator_1 = __importDefault(require("validator"));
const validateEmail = (email) => {
    return validator_1.default.isEmail(email);
};
exports.validateEmail = validateEmail;
const validatePassword = (password) => {
    return password.length >= 8;
};
exports.validatePassword = validatePassword;
