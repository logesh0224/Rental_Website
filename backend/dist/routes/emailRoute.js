"use strict";
// routes/emailRoutes.js
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/sellerController');
router.post('/sendHotelDetails', emailController.sendHotelDetailsByEmail);
exports.default = router;
