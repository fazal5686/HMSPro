import API from "../api/axios.js";

import API_ROUTES from "../api/apiRoutes.js";


// ============================================================
// Get Logged-in Doctor Profile
// ============================================================

export const getMyDoctorProfile = async () => {

    const response =
        await API.get(
            API_ROUTES.DOCTORS.ME
        );

    return response.data?.data;

};
