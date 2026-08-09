// ============================================================
// File: server.js
// Purpose: HMSPro Backend Entry Point
// ============================================================

import dotenv from "dotenv";

import app from "./app.js";

import connectDB from "./config/db.js";


// Load environment variables

dotenv.config();


// Connect Database

connectDB();


// Server Port

const PORT = process.env.PORT || 5000;



// Start Server

app.listen(PORT, () => {

    console.log(`HMSPro Server running on port ${PORT}`);

});