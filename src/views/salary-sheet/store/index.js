import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const salarySheetApi = 'payroll/salary-sheets'  

export const getAllSalarySheet = createAsyncThunk(
  "salarySheet/getAllSalarySheet",
  async () => {
    const result = axios
      .get(salarySheetApi)
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

export const updateSalarySheetDetails = createAsyncThunk(
  "salarySheet/updateSalarySheet",
  async (data) => {
    const res = await axios.post(`${salarySheetApi}/revise`, data);
    return res.data;
  }
);

export const addSalarySheet = createAsyncThunk(
  "salaryHead/generate-salary-sheet",
  async (data) => {
    const res = await axios.post(`${salarySheetApi}/generate`, data);
    return res.data;
  }
);

export const updateSalarySheet = createAsyncThunk(
  "salarySheet/updateSalarySheet",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${salarySheetApi}/${data?.id}`, {
        ...data,
        _method: "PUT",
      });
      return res.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getSalarySheetById = createAsyncThunk(
  "salarySheet/getSalarySheetById",
  async (id) => {
    const result = axios
      .get(`${salarySheetApi}/${id}`)
      .then((res) => {
        console.log(res);
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);

export const deleteSalarySheet = createAsyncThunk(
  "salarySheet/deleteSalarySheet",
  async (id) => {
    const result = axios
      .delete(`${salarySheetApi}/${id}`)
      .then((res) => {
        console.log(res);
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);
export const getPaySlip = createAsyncThunk(
  "salarySheet/getPaySlip",
  async (payload) => {
    const res = await axios.get(`${salarySheetApi}/pay-slip/${payload.id}`);
    return res.data?.data;
  }
);

export const salarySheetSlice = createSlice({
  name: "salarySheet",
  initialState: {
    salarySheetData: [],
    loading: false,
    basicSalarySheetData: null,
    mutationLoading: false,
    fetchingPaySlip: false,
    paySlipData: null,
  },
  reducers: {
    bindSalarySheetData: (state, action) => {
      state.basicSalarySheetData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalarySheet.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSalarySheet.fulfilled, (state, action) => {
        state.salarySheetData = action.payload;
        state.loading = false;
      })
      .addCase(getAllSalarySheet.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPaySlip.pending, (state) => {
        state.fetchingPaySlip = true;
      })
      .addCase(getPaySlip.fulfilled, (state, action) => {
        state.fetchingPaySlip = false;
        state.paySlipData = action.payload;
      })
      .addCase(getPaySlip.rejected, (state) => {
        state.fetchingPaySlip = false;
      })

      // .addCase( getSalarySheetById.fulfilled, ( state, action ) => {
      //   state.basicSalarySheetData = action.payload;
      // } )
      .addCase(addSalarySheet.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(addSalarySheet.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(addSalarySheet.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateSalarySheetDetails.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(updateSalarySheetDetails.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateSalarySheetDetails.rejected, (state) => {
        state.mutationLoading = false;
      })
  },
});

export const { bindSalarySheetData } = salarySheetSlice.actions;

export default salarySheetSlice.reducer;
