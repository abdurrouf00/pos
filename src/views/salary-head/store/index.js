import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialSalaryHeadData = {
  id: "",
  name: "",
  type: "",
  calc_type: "",
  amount: "",
  status: "",
  built_in: "",
  organization_id: "",
  company_id: "",
  branch_id: "",
  created_by: "",
  updated_by: "",
  created_at: "",
  updated_at: "",
  deleted_at: "",
};
const salaryHeadApi = 'payroll/salary-heads'
export const getAllSalaryHead = createAsyncThunk(
  "salaryHead/getAllSalaryHead",
  async () => {
    const result = axios
      .get(salaryHeadApi)
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

export const addSalaryHead = createAsyncThunk(
  "salaryHead/addSalaryHead",
  async (data) => {
    const res = await axios.post(salaryHeadApi, data);
    return res.data?.data;
  }
);

export const updateSalaryHead = createAsyncThunk(
  "salaryHead/updateSalaryHead",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${salaryHeadApi}/${data?.id}`, {
        ...data,
        _method: "PUT",
      });
      return res.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getSalaryHeadById = createAsyncThunk(
  "salaryHead/getSalaryHeadById",
  async (id) => {
    const result = axios
      .get(`${salaryHeadApi}/${id}`)
      .then((res) => {
        console.log(res);
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);

export const deleteSalaryHead = createAsyncThunk(
  "salaryHead/deleteSalaryHead",
  async (id) => {
    const result = axios
      .delete(`${salaryHeadApi}/${id}`)
      .then((res) => {
        console.log(res);
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);

export const salaryHeadSlice = createSlice({
  name: "salaryHead",
  initialState: {
    salaryHeadData: [],
    loading: false,
    basicSalaryHeadData: initialSalaryHeadData,
    mutationLoading: false,
  },
  reducers: {
    bindSalaryHeadData: (state, action) => {
      state.basicSalaryHeadData = action.payload || initialSalaryHeadData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalaryHead.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSalaryHead.fulfilled, (state, action) => {
        state.salaryHeadData = action.payload;
        state.loading = false;
      })
      .addCase(getAllSalaryHead.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSalaryHeadById.fulfilled, (state, action) => {
        state.basicSalaryHeadData = action.payload;
      })
      .addCase(addSalaryHead.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(addSalaryHead.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(addSalaryHead.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateSalaryHead.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(updateSalaryHead.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateSalaryHead.rejected, (state) => {
        state.mutationLoading = false;
      });
  },
});

export const { bindSalaryHeadData } = salaryHeadSlice.actions;

export default salaryHeadSlice.reducer;
