import express from 'express';
import { sendSellerInfoByEmail } from '../controllers/sellerController';

const router = express.Router();

router.post('/sendSellerInfoByEmail', sendSellerInfoByEmail);

export default router;
