'use client'
import axios from "axios";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
export const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/`;




const api = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
    },
});

// Add a request interceptor to attach token dynamically
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("hh_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//handle errors gracefully with proper error message
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 500) {
            toast.error("Something went wrong");
        }
        return Promise.reject({
            message: error.response.data.message,
            status: error.response.status
        });
    }
);

export default api;