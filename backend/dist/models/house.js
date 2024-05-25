"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
// Booking fields remain unchanged
});
const hotelSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true }, // User ID associated with the hotel
    sellerName: { type: String, required: true }, // Name of the seller
    sellerEmail: { type: String, required: true }, // Email of the seller
    sellerPhoneNumber: { type: String, required: true }, // Phone number of the seller
    sellerAddress: { type: String, required: true }, // Address of the seller
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    //area:{type:Number,required:true},
    //available:{type:String,required:true},
    //bedrooms:{type:String,required:true},
    //bathrooms:{type:String,required:true},
    description: { type: String, required: true },
    //furnishable:{type:String,required:true},
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    childCount: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true },
    bookings: [bookingSchema]
});
const Hotel = mongoose_1.default.model("Hotel", hotelSchema);
exports.default = Hotel;
