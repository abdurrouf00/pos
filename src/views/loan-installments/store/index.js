import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialLoanInstallmentsData = {
  id: "",
  department_id: "",
  designation_id: "",
  amount: "",
  date: "",
};

export const getAllLoanInstallments = createAsyncThunk(
  "loan/getAllLoanInstallments",
  async () => {
    const result = axios
      .get("loan-installment")
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

export const addLoanInstallments = createAsyncThunk(
  "loan/addLoanInstallments",
  async (data) => {
    const res = await axios.post("loan-installments", data);
    return res.data?.data;
  }
);

export const updateLoanInstallments = createAsyncThunk(
  "loan/updateLoanInstallments",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`loan-installments/${data?.id}`, {
        ...data,
        _method: "PUT",
      });
      return res.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getLoanInstallmentsById = createAsyncThunk(
  "loan/getLoanInstallmentsById",
  async (id) => {
    const result = axios
      .get(`loan-installments/${id}`)
      .then((res) => {
        console.log(res);
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);

export const deleteLoanInstallments = createAsyncThunk(
  "loan/deleteLoanInstallments",
  async (id) => {
    const result = axios
      .delete(`loan-installments/${id}`)
      .then((res) => {
        console.log(res);
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);

export const loanInstallmentsSlice = createSlice({
  name: "loan-installments",
  initialState: {
    loanInstallmentsData: [],
    loading: false,
    basicLoanInstallmentsData: initialLoanInstallmentsData,
  },
  reducers: {
    bindLoanInstallmentsData: (state, action) => {
      state.basicLoanInstallmentsData =
        action.payload || initialLoanInstallmentsData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLoanInstallments.fulfilled, (state, action) => {
        state.loanInstallmentsData = action.payload;
      })
      .addCase(getLoanInstallmentsById.fulfilled, (state, action) => {
        state.basicLoanInstallmentsData = action.payload;
      });
  },
});

export const { bindLoanInstallmentsData } = loanInstallmentsSlice.actions;

export default loanInstallmentsSlice.reducer;
