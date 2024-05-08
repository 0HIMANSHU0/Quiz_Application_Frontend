import axios from "axios";
import { BASE_URL } from "./helper";

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  baseURL: `${BASE_URL}`,
});

const axiosUpload = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data', // Set the Content-Type for handling multipart form data
  },
  baseURL: `${BASE_URL}`,
});

export { axiosInstance, axiosUpload };