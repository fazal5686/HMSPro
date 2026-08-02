import express from "express";

import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../controllers/authController.js";
import authorize from "../middleware/authorize.js";
import {
    registerValidator,
    loginValidator,
} from "../validators/authValidator.js";

import validate from "../middleware/validate.js";

import protect from "../middleware/protect.js";


const router = express.Router();

router.post(
    "/register",
    registerValidator,
    validate,
    registerUser
);

router.post(
    "/login",
    loginValidator,
    validate,
    loginUser
);

router.get(
    "/me",
    protect,
    getCurrentUser
);

router.get(
    "/patient-test",
    protect,
    authorize("Patient"),
    (req, res) => {

        res.status(200).json({

            success: true,

            message: "Patient access granted.",

            user: req.user

        });

    }
);

export default router;