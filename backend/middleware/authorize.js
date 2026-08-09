 // ============================================================
// File: middleware/authorize.js
// Purpose: Controls access based on user roles.
// Works together with protect.js.
// ============================================================


/**
 * ============================================================
 * Authorize User By Role
 * ============================================================
 *
 * Usage:
 * authorize(ROLES.ADMIN)
 * authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN)
 *
 * The protect middleware must run before authorize.
 */

const authorize = (...allowedRoles) => {

    return (req, res, next) => {

        // ========================================================
        // Check Authentication
        // ========================================================

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "User authentication required.",
            });

        }


        // ========================================================
        // Check Authorization
        // ========================================================

        if (!allowedRoles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Access denied. Permission insufficient.",
            });

        }


        // ========================================================
        // Access Granted
        // ========================================================

        next();

    };

};


export default authorize;