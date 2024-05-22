import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check as validationCheck, validationResult } from "express-validator";
import verifyToken from "./middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post("/register", [
    validationCheck("firstName", "First Name is required").isString(),
    validationCheck("lastName", "Last Name is required").isString(),
    validationCheck("email", "Valid Email is required").isEmail(),
    validationCheck("password", "Password with 6 or more characters is required").isLength({ min: 6 }),
    validationCheck("phoneNumber", "Phone Number is required").isString(),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = await User.findOne({ phoneNumber: req.body.phoneNumber });
        if (user) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d",
        });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        return res.status(200).send({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

export default router;
