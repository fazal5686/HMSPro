// ============================================================
// File: middleware/authorize.js
// Purpose: Controls access based on user roles.
// Works together with protect.js.
// ============================================================


/**
 * Authorize users by role.
 *
 * Example:
 *
 * authorize("Admin", "SuperAdmin")
 *
 */


const authorize = (...allowedRoles) => {


    return (req, res, next) => {


        // protect.js must run before this middleware.
        if (!req.user) {

            return res.status(401).json({

                success: false,

                message: "User authentication required."

            });

        }



        // Check whether user's role is allowed.

        if (!allowedRoles.includes(req.user.role)) {


            return res.status(403).json({

                success: false,

                message: "Access denied. Permission insufficient."

            });


        }



        // User has permission.

        next();


    };


};


export default authorize;