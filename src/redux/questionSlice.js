import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const { axiosInstance } = require("../../src/apicalls/index")

const initialState = {
  isLoading: false,
  error: null,
  allQuestions: [],
};

export const getAllQuestions = createAsyncThunk(
  "question/allquestions",
  async (text, { dispatch, rejectWithValue }) => {
    console.log("The searchText is:", text)
    try {
      dispatch(getAllQuestionStart());
      console.log("TEsting_2")
      const response =await axiosInstance.post(`/api/exam/get-all-question?text=${text ?? ""}`);
      console.log("TEsting_3",response?.data?.data)
      dispatch(getAllQuestionSuccess(response?.data?.data));
      return response?.data;
    } catch (error) {
      dispatch(getAllQuestionFailer(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getAllQuestionStart(state) {
      state.isLoading = true;
      state.error = null;
      state.allQuestions = [];
    },
    getAllQuestionSuccess(state, action) {
      state.isLoading = false;
      state.allQuestions = action.payload;
    },
    getAllQuestionFailer(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  getAllQuestionStart,
  getAllQuestionSuccess,
  getAllQuestionFailer,
} = questionSlice.actions;

export default questionSlice.reducer;
