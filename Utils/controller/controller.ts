import axios from "axios";

//Axios instance to make API calls (Base URL)
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
