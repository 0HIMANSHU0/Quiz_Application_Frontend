const { axiosInstance } = require(".");
const { axiosUpload } = require(".");

// Add Exam API
export const addExam = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/exam/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get All Exams
export const getAllExams = async () => {
  try {
    const response = await axiosInstance.post("/api/exam/get-all-exams");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get Exam by ID
export const getExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exam/get-exam-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Edit Exam by Id
export const editExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exam/edit-exam-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Delete Exam by Id
export const deleteExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exam/delete-exam-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Add Question to Exam
export const addQuestionToExam = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exam/add-question-to-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Edit Question By Id
export const editQuestionById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exam/edit-question-in-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Delete Question By Id
export const deleteQuestionById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exam/delete-question-in-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get Total Number of Questions
export const getAllQuestion = async (search) => {
  try {
    const response = await axiosInstance.post(
      `/api/exam/get-all-question?search=${search}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Import Questions from the csv
export const importQuestionToExam = async (payload) => {
  try {
    const formData = new FormData();
    formData.append("file", payload.file);
    formData.append("exam", payload.exam);

    const response = await axiosUpload.post(
      "/api/exam/upload-questions", 
      formData
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
