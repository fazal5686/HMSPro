// ============================================================
// File: utils/logger.js
// Purpose: Centralized HMSPro application logger.
// Handles informational, warning, and error messages.
// ============================================================

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ============================================================
// Resolve Current Directory
// ============================================================

const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);

// ============================================================
// Logs Directory
// ============================================================

const logsDirectory =
    path.join(
        __dirname,
        "..",
        "logs"
    );

// ============================================================
// Create Logs Directory If Missing
// ============================================================

if (
    !fs.existsSync(
        logsDirectory
    )
) {

    fs.mkdirSync(
        logsDirectory,
        {
            recursive: true,
        }
    );

}

// ============================================================
// Log Files
// ============================================================

const applicationLogFile =
    path.join(
        logsDirectory,
        "application.log"
    );

const errorLogFile =
    path.join(
        logsDirectory,
        "error.log"
    );

// ============================================================
// Format Log Message
// ============================================================

const formatMessage =
    (
        level,
        message
    ) => {

        const timestamp =
            new Date().toISOString();

        return (
            `[${timestamp}] [${level}] ${message}\n`
        );

    };

// ============================================================
// Write Log
// ============================================================

const writeLog =
    (
        file,
        level,
        message
    ) => {

        const logMessage =
            formatMessage(
                level,
                message
            );

        fs.appendFileSync(
            file,
            logMessage,
            "utf8"
        );

    };

// ============================================================
// INFO
// ============================================================

export const info =
    (message) => {

        writeLog(
            applicationLogFile,
            "INFO",
            message
        );

        console.log(
            message
        );

    };

// ============================================================
// WARNING
// ============================================================

export const warn =
    (message) => {

        writeLog(
            applicationLogFile,
            "WARN",
            message
        );

        console.warn(
            message
        );

    };

// ============================================================
// ERROR
// ============================================================

export const error =
    (message) => {

        writeLog(
            errorLogFile,
            "ERROR",
            message
        );

        console.error(
            message
        );

    };

// ============================================================
// Default Logger Object
// ============================================================

const logger = {

    info,

    warn,

    error,

};

// ============================================================
// Export
// ============================================================

export default logger;