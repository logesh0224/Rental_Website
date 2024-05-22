//import { responsiveFontSizes } from '@mui/material';
import express,{ NextFunction, Request,Response} from 'express';
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import authRoutes from "./routes/auth"
import userRoutes from './routes/users';
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from 'cloudinary';
import myHotelRoutes from './routes/my-hotels';
import hotelRoutes from './routes/hotels'
import bookingRoutes from "./routes/my-bookings";
import emailRoutes from './routes/emailRoute';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
import { dot } from 'node:test/reporters';
//const uri ="mongodb+srv://logeshboopathi:logeshboopathi@cluster0.4ax9iot.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(()=>console.log("Connected to database: ",
process.env.MONGODB_CONNECTION_STRING));



//mongoose.connect('mongodb://127.0.0.1:27017/admin')

const app= express();
//dot.config(
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin:process.env.FRONTEND_url,
    credentials:true
}));
app.use(express.static(path.join(__dirname,"../../frontend/dist")))

const PORT=10000;
app.use("/api/auth",authRoutes)
app.use("/api/users" ,userRoutes);
app.use("/api/my-hotels",myHotelRoutes);
app.use("/api/hotels",hotelRoutes);
app.use("/api/my-bookings",bookingRoutes);
app.use("/api",emailRoutes)


  
  

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
  const HOST = process.env.HOST || 10000;
  
app.listen(PORT,'0.0.0.0',() =>{
    console.log(`Connected to Port ${PORT}`)

})
