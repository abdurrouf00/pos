import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialProvidentFundData = {
  id: "",
  name: "",
  department_id: "",
  designation_id: "",
  total_amount: "",
};

export const getAllProvidentFund = createAsyncThunk(
  "providentFund/getAllProvidentFund",
  async () => {
    const result = axios
      .get("provident-fund")
      .then((res) => {
        const resData = res.data?.data?.data?.map((item) => ({
          ...item,
        }));
        return resData;
      })
      .catch((err) => console.log(err));
    return result;
  }
);


export const getProvidentFundById = createAsyncThunk(
  "providentFund/getProvidentFundById",
  async (id) => {
    const result = axios
      .get(`provident-fund/${id}`)
      .then((res) => {
        console.log(res);
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);

export const providentFundSlice = createSlice({
  name: "providentFund",
  initialState: {
    providentFundData: [],
    loading: false,
    basicProvidentFundData: initialProvidentFundData,
  },
  reducers: {
    bindProvidentFundData: (state, action) => {
      state.basicProvidentFundData = action.payload || initialProvidentFundData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProvidentFund.fulfilled, (state, action) => {
        state.providentFundData = action.payload;
      })
      .addCase(getProvidentFundById.fulfilled, (state, action) => {
        state.basicSalarySheetData = action.payload;
      });
  },
});

export const { bindProvidentFundData } = providentFundSlice.actions;

export default providentFundSlice.reducer;
