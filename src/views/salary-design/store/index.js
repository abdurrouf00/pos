import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialHead = {
  head_id: "",
  calc_type: "",
  amount: "",
}
export const initialSalaryDesignData = {
  id: "",
  name: "",
  head_details: [
    { ...initialHead }
  ],
};
const salaryDesignApi = 'payroll/salary-designs'
export const getAllSalaryDesign = createAsyncThunk(
  "salaryDesign/getAllSalaryDesign",
  async () => {
    const result = axios
      .get(salaryDesignApi)
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

export const addSalaryDesign = createAsyncThunk(
  "salaryDesign/addSalaryDesign",
  async (data) => {
    const res = await axios.post(salaryDesignApi, data);
    return res.data;
  }
);

export const updateSalaryDesign = createAsyncThunk(
  "salaryDesign/updateSalaryDesign",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${salaryDesignApi}/${data?.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getSalaryDesignById = createAsyncThunk(
  "salaryDesign/getSalaryDesignById",
  async (id) => {
    const result = axios
      .get(`${salaryDesignApi}/${id}`)
      .then((res) => {
        console.log(res);
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);

export const deleteSalaryDesign = createAsyncThunk(
  "salaryDesign/deleteSalaryDesign",
  async (id) => {
    const result = axios
      .delete(`${salaryDesignApi}/${id}`)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);

export const salaryDesignSlice = createSlice({
  name: "salaryDesign",
  initialState: {
    salaryDesignData: [],
    loading: false,
    basicSalaryDesignData: initialSalaryDesignData,
    mutationLoading: false,
  },
  reducers: {
    bindSalaryDesignData: (state, action) => {
      state.basicSalaryDesignData = action.payload || initialSalaryDesignData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalaryDesign.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSalaryDesign.fulfilled, (state, action) => {
        state.salaryDesignData = action.payload;
        state.loading = false;
      })
      .addCase(getAllSalaryDesign.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSalaryDesignById.fulfilled, (state, action) => {
        state.basicSalaryDesignData = action.payload;
      })
      .addCase(addSalaryDesign.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(addSalaryDesign.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(addSalaryDesign.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateSalaryDesign.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(updateSalaryDesign.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateSalaryDesign.rejected, (state) => {
        state.mutationLoading = false;
      });
  },
});

export const { bindSalaryDesignData } = salaryDesignSlice.actions;

export default salaryDesignSlice.reducer;
