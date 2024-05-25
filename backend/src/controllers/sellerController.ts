import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendSellerInfoByEmail = async (req: Request, res: Response) => {
  console.log('Request Body:', req.body); // Log the entire request body

  const { email, sellerName, sellerAddress, sellerEmail, sellerphoneNumber } = req.body;

  try {
    // Create transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rentify100@gmail.com',
        pass: 'czrxdwnvasacewrk'
      }
    });

    // Setup email data
    const mailOptions = {
      from: 'rentify100@gmail.com',
      to: email,
      subject: 'Seller Details',
      html: `
        <p>Hello,</p>
        <p>Here are the seller details:</p>
        <p>Name: ${sellerName}</p>
        <p>Address: ${sellerAddress}</p>
        <p>Phone Number: ${sellerphoneNumber}</p>
        <p>Email: ${sellerEmail}<p>
      `
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    
    console.log('Seller details email sent successfully');
    res.status(200).json({ message: 'Seller details sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send seller details' });
  }
};
