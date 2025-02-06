import axios, { AxiosInstance } from "axios";
import { axiosInit } from "./axiosInit";
// import { useLogout } from "./hooks/mutations";
// import { useEffect } from "react";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token") as string;

if (token) {
  axiosInit(token)
}