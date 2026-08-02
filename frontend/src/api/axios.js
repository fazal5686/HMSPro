// ============================================================
// File: api/axios.js
// Purpose: Configures Axios instance for HMSPro.
// Adds JWT token automatically to protected requests.
// ============================================================


import axios from "axios";

import { getToken } from "../utils/storage.js";



const API = axios.create({

    baseURL: "http://localhost:5000/api",

    headers: {

        "Content-Type": "application/json",

    },

});



// ============================================================
// Request Interceptor
// Adds JWT token to every request.
// ============================================================

API.interceptors.request.use(

    (config) => {


        const token = getToken();


        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;


    },

    (error) => {


        return Promise.reject(error);


    }

);



export default API;