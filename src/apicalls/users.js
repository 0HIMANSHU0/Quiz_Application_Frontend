const { axiosInstance } = require(".");

// Register User API
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/user/register", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Login User API
export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/user/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get the User Information
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post("/api/user/get-user-info");
    return response.data;
  } catch (error) {
    window.location.href = "/login";
    return error.response.data;
  }
};

// Get all User Information
export const getAllUserInfo = async () => {
  try {
    const response = await axiosInstance.post("/api/user/get-all-users");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get the Single User Using Id 
export const getSingleUser = async (payload) =>{
  try {
    const response = await axiosInstance.post("/api/user/get-user-by-id", payload)
    return response.data;
  } catch (error) {
    return error.response.message;
  }
}