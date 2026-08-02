// ============================================================
// File: middleware/protect.js
// Purpose: Protects private routes by verifying JWT tokens.
// ============================================================


import jwt from "jsonwebtoken";

import { findUserById } from "../repositories/authRepository.js";



// ============================================================
// Protect Middleware
// ============================================================

const protect = async (req, res, next) => {

    try {

        let token;


        // Check Authorization header.
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

        }


        // If token does not exist.
        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Not authorized. Token missing."

            });

        }



        // Verify JWT token.

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );



        // Find user from database.

        const user = await findUserById(decoded.id);



        if (!user) {

            return res.status(401).json({

                success: false,

                message: "User no longer exists."

            });

        }



        // Attach user to request object.

        req.user = user;



        // Continue to controller.

        next();



    } catch (error) {


        return res.status(401).json({

            success: false,

            message: "Invalid or expired token."

        });


    }

};



export default protect;