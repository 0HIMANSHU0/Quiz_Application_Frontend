const { axiosInstance } = require(".");

// Add Course
export const addCourse = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/course/add-course",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.message;
  }
};

// Get All Courses
export const getAllCourse = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/course/get-all-course"
    );
    return response.data;
  } catch (error) {
    return error.response.message;
  }
};

// Get single Course by Id
export const getSingleCourseById = async (payload) =>{
  try {
    const response = await axiosInstance.post("/api/course/get-course-by-id", payload);
    return response.data;
  } catch (error) {
    return error.response.message;
  }
}

// Delete Course by Id
export const deleteCourseById = async (payload)=>{
  try {
    const response = await axiosInstance.post("/api/course/delete-course-by-id", payload);
    return response.data;
  } catch (error) {
    return error.response.message
    
  }
}

// Edit Course by Id
export const editCourseById = async (payload) =>{
  try {
    const response = await axiosInstance.post("/api/course/edit-course-by-id", payload);
    return response.data;
  } catch (error) {
    return error.response.message    
  }
}