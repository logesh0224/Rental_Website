// controllers/emailController.ts

import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Hotel from '../models/house'; // Adjust the import here
import { HotelType } from '../shared/types'; // Adjust the import for HotelType

const sendHotelDetailsByEmail = async (req: Request, res: Response): Promise<void> => {
  const { email, hotelId } = req.body;

  try {
    // Fetch hotel details based on the hotelId from your database
    const hotelDetails: HotelType | null = await Hotel.findById(hotelId);

    if (!hotelDetails) {
      res.status(404).json({ message: 'Hotel not found.' });
      return;
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
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
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Hotel details sent successfully!' });
  } catch (error) {
    console.error('Error sending hotel details by email:', error);
    res.status(500).json({ message: 'Failed to send hotel details.' });
  }
};

export { sendHotelDetailsByEmail };
