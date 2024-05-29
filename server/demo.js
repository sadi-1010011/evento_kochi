"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("validator");
var validateEmail = function (email) {
    return validator_1.default.isEmail(email);
};
var validatePassword = function (password) {
    return password.length >= 8;
};
console.log(validateEmail('farhanfarhan832@gmail.com'));
console.log(validatePassword('123456'));
