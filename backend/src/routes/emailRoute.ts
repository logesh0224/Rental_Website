// routes/emailRoutes.js

const express = require('express');
const router = express.Router();
const emailController = require('../controllers/sellerController');

router.post('/sendHotelDetails', emailController.sendHotelDetailsByEmail);

export default router;