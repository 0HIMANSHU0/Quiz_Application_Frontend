const {axiosInstance } = require(".");

// Add University
export const addUniversity = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/university/add-university",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get All University
export const getAllUniversity = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/university/get-all-university"
    );
    return response.data;
  } catch (error) {
    return error.response.message;
  }
};

// Get Single University By ID
export const getSingleUniversity = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/university/get-university-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.message;
  }
};

// Edit University by ID
export const editUniversityById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/university/edit-university-by-Id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.message;
  }
};

// Delete University by ID
export const deleteUniversityById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/university/delete-university-by-Id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.message;
  }
};

// Add College to University
export const addCollegeToUniversity = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/university/add-college-to-university",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.message;
  }
};

// Edit College in University
export const editCollegeToUniversity = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/university/edit-college-in-university",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.message;
  }
};

// Delete College in University
export const deleteCollegeById = async (payload) =>{
  try {
    const response = await axiosInstance.post("/api/university/delete-college-in-university", payload);
    return response.data;
  } catch (error) {
    return error.response.message
    
  }
}
