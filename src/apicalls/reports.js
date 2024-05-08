const { axiosInstance } = require(".");

// Add Report
export const addReport = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/report/add-report",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get All Reports
export const getAllReports = async (search) => {
  try {
    const response = await axiosInstance.post(
      `/api/report/get-all-reports?search=${search}`,""
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get All Reports of User
export const getAllReportsByUser = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/report/get-all-reports-by-user"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
