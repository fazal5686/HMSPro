import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const DOCTOR_EMAIL = "doctor@hmspro.com";
const NEW_PASSWORD = "Doctor@12345";

const resetDoctorPassword = async () => {

    try {

        await connectDB();

        const user = await User.findOne({
            email: DOCTOR_EMAIL
        });

        if (!user) {
            console.log("Doctor user not found.");
            process.exit(1);
        }

        if (user.role !== "Doctor") {
            console.log("User exists but is not a Doctor.");
            process.exit(1);
        }

        user.password = await bcrypt.hash(
            NEW_PASSWORD,
            10
        );

        user.isActive = true;

        await user.save();

        console.log("============================================");
        console.log("Doctor password reset successfully.");
        console.log("Email:", DOCTOR_EMAIL);
        console.log("New Password:", NEW_PASSWORD);
        console.log("User ID:", user._id.toString());
        console.log("============================================");

        process.exit(0);

    } catch (error) {

        console.error(
            "Password reset failed:",
            error.message
        );

        process.exit(1);
    }
};

resetDoctorPassword();
