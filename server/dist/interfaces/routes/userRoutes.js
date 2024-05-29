"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const AdminController_1 = require("../controllers/AdminController");
const router = (0, express_1.Router)();
router.post('/register-user', UserController_1.createUser);
router.get('/get-all-events', AdminController_1.getAllEvents);
exports.default = router;
