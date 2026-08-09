// ============================================================
// File: middleware/uploadMiddleware.js
// Purpose: Handles file uploads for HMSPro modules.
// ============================================================

import multer from "multer";
import path from "path";


// Storage configuration

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/doctors");

    },


    filename: (req, file, cb) => {

        const ext = path.extname(file.originalname);

        cb(
            null,
            `${Date.now()}${ext}`
        );

    }

});



// File filter

const fileFilter = (req, file, cb) => {


    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg"
    ];


    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error("Only JPG and PNG images are allowed."),
            false
        );

    }

};



// Upload middleware

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});


export default upload;