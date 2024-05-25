"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { responsiveFontSizes } from '@mui/material';
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const my_hotels_1 = __importDefault(require("./routes/my-hotels"));
const hotels_1 = __importDefault(require("./routes/hotels"));
const my_bookings_1 = __importDefault(require("./routes/my-bookings"));
const emailRoute_1 = __importDefault(require("./routes/emailRoute"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
//const uri ="mongodb+srv://logeshboopathi:logeshboopathi@cluster0.4ax9iot.mongodb.net/?retryWrites=true&w=majority"
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to database: ", process.env.MONGODB_CONNECTION_STRING));
//mongoose.connect('mongodb://127.0.0.1:27017/admin')
const app = (0, express_1.default)();
//dot.config(
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_url,
    credentials: true
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
const PORT = 10000;
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/my-hotels", my_hotels_1.default);
app.use("/api/hotels", hotels_1.default);
app.use("/api/my-bookings", my_bookings_1.default);
app.use("/api", emailRoute_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/dist/index.html"));
});
const HOST = process.env.HOST || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Connected to Port ${PORT}`);
});
