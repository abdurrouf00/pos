import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const leaveTypeApi = 'settings/leave-types';

export const getAllLeaveType = createAsyncThunk(
  "leaveType/getAllLeaveType",
  async () => {
    const result = axios
      .get(leaveTypeApi)
      .then((res) => {
        const resData = res.data?.data
        return resData;
      })
      .catch((err) => console.log(err));
    return result;
  }
);
export const getLeaveType = createAsyncThunk(
  "leaveType/getLeaveType",
  async (id) => {
    const result = axios
      .get(`${leaveTypeApi}/${id}`)
      .then((res) => {

        const resData = res.data?.data
        return resData;
      })
      .catch((err) => console.log(err));
    return result;
  }
);

export const addLeaveType = createAsyncThunk(
  "leaveType/addLeaveType",
  async (data) => {
    const res = await axios.post(leaveTypeApi, data);
    return res.data?.data;
  }
);
export const updateLeaveType = createAsyncThunk(
  "leaveType/updateLeaveType",
  async ({ formData, editId }) => {
    const res = await axios.post(`${leaveTypeApi}/${editId}`, formData);
    return res.data?.data;
  }
);
export const deleteLeaveType = createAsyncThunk(
  "leaveType/deleteLeaveType",
  async (id) => {
    const res = await axios.delete(`${leaveTypeApi}/${id}`);
    return res.data?.data;
  }
);



export const initialLeaveTypeData = {
  name: "",
  short_name: "",
  serial_no: "",
}
export const leaveTypeSlice = createSlice({
  name: "leaveType",
  initialState: {
    data: [],
    mutationLoading: false,
    fetchingAllData: false,
    fetchingSingleData: false,
    leaveTypeFormData: initialLeaveTypeData
  },
  reducers: {
    bindLeaveTypeData: (state, action) => {
      state.leaveTypeFormData =
        action.payload || initialLeaveTypeData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLeaveType.pending, (state, action) => {
        state.mutationLoading = true;
      })
      .addCase(addLeaveType.fulfilled, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(addLeaveType.rejected, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(updateLeaveType.pending, (state, action) => {
        state.mutationLoading = true;
      })
      .addCase(updateLeaveType.fulfilled, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(updateLeaveType.rejected, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(deleteLeaveType.pending, (state, action) => {
        state.mutationLoading = true;
      })
      .addCase(deleteLeaveType.fulfilled, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(deleteLeaveType.rejected, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(getAllLeaveType.pending, (state, action) => {
        state.fetchingAllData = true;
      })
      .addCase(getAllLeaveType.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetchingAllData = false;
      })
      .addCase(getAllLeaveType.rejected, (state, action) => {
        state.fetchingAllData = false;
      })
      .addCase(getLeaveType.pending, (state, action) => {
        state.fetchingSingleData = true;
      })
      .addCase(getLeaveType.fulfilled, (state, action) => {
        state.leaveTypeFormData = action.payload;
        state.fetchingSingleData = false;
      })
      .addCase(getLeaveType.rejected, (state, action) => {
        state.fetchingSingleData = false;
      })

  },
});

export const {
  bindLeaveTypeData,
} = leaveTypeSlice.actions;

export default leaveTypeSlice.reducer;
