"use strict";
// controllers/emailController.ts
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
exports.sendHotelDetailsByEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const house_1 = __importDefault(require("../models/house")); // Adjust the import here
const sendHotelDetailsByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, hotelId } = req.body;
    try {
        // Fetch hotel details based on the hotelId from your database
        const hotelDetails = yield house_1.default.findById(hotelId);
        if (!hotelDetails) {
            res.status(404).json({ message: 'Hotel not found.' });
            return;
        }
        // Configure nodemailer transporter
        const transporter = nodemailer_1.default.createTransport({
            // Configure your email transporter (e.g., SMTP, SendGrid, etc.)
            // Example:
            service: 'gmail',
            auth: {
                user: 'rentify100@gmail.com',
                pass: 'czrxdwnvasacewrk',
            },
        });
        // Email options
        const mailOptions = {
            from: 'rentify100@gmail.com',
            to: email,
            subject: 'Hotel Details',
            text: JSON.stringify(hotelDetails),
        };
        // Send email
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Hotel details sent successfully!' });
    }
    catch (error) {
        console.error('Error sending hotel details by email:', error);
        res.status(500).json({ message: 'Failed to send hotel details.' });
    }
});
exports.sendHotelDetailsByEmail = sendHotelDetailsByEmail;
