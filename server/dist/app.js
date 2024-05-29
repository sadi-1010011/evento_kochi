"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./interfaces/routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_CONNECTION_STRING;
app.use(express_1.default.json());
app.use('/api', userRoutes_1.default);
mongoose_1.default.connect(MONGO_URI)        
    .then(() => [
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
])
    .catch(error => {
    console.error('Database connection error:', error);
});
