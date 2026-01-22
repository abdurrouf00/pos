import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialLoanData = {
  employee_id: "",
  loan_amount: "",
  installment_amount: "",
  installment_number: "",
  start_date: "",
  end_date: "",
};

export const getAllLoan = createAsyncThunk("loan/getAllLoan", async () => {
  const result = axios
    .get("loan")
    .then((res) => {
      const resData = res.data?.data?.data?.map((item) => ({
        ...item,
      }));
      return resData;
    })
    .catch((err) => console.log(err));
  return result;
});

export const addLoan = createAsyncThunk("loan/addLoan", async (data) => {
  const res = await axios.post("loan", data);
  return res.data;
});

export const updateLoan = createAsyncThunk(
  "loan/updateLoan",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`loan/${data?.id}`, {
        ...data,
        _method: "PUT",
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getLoanById = createAsyncThunk("loan/getLoanById", async (id) => {
  const result = axios
    .get(`loan/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => console.log(err));
  return result;
});

export const deleteLoan = createAsyncThunk("loan/deleteLoan", async (id) => {
  const result = axios
    .delete(`loan/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return result;
});

export const loanSlice = createSlice({
  name: "loan",
  initialState: {
    loanData: [],
    loading: false,
    basicLoanData: initialLoanData,
    mutationLoading: false,
    fetching: false,
  },
  reducers: {
    bindLoanData: (state, action) => {
      state.basicLoanData = action.payload || initialLoanData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLoan.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLoan.fulfilled, (state, action) => {
        state.loanData = action.payload;
        state.loading = false;
      })
      .addCase(getAllLoan.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getLoanById.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getLoanById.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.basicLoanData = action.payload;
        state.fetching = false;
      })
      .addCase(getLoanById.rejected, (state) => {
        state.fetching = false;
      })
      .addCase(addLoan.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(addLoan.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(addLoan.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateLoan.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(updateLoan.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateLoan.rejected, (state) => {
        state.mutationLoading = false;
      });
  },
});

export const { bindLoanData } = loanSlice.actions;

export default loanSlice.reducer;
