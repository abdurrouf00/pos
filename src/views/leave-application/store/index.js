import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getAllLeaveApplications = createAsyncThunk(
  "leaveApplication/getAllLeaveApplications",
  async () => {
    const result = axios
      .get("leave-application")
      .then((res) => {
        const resData = res.data?.data
        return resData;
      })
      .catch((err) => console.log(err));
    return result;
  }
);
export const getLeaveApplication = createAsyncThunk(
  "leaveApplication/getLeaveApplication",
  async (id) => {
    const result = axios
      .get(`leave-application/${id}`)
      .then((res) => {

        const resData = res.data?.data
        return resData;
      })
      .catch((err) => console.log(err));
    return result;
  }
);
export const approveApplication = createAsyncThunk('leaveApplication/approveApplication', async ({ id, data }) => {
  const res = await axios.post(`leave-application-action/${id}`, data)
  return res.data?.data
})
export const forwardApplication = createAsyncThunk('leaveApplication/forwardApplication', async ({ id, data }) => {
  const res = await axios.post(`leave-application-action/${id}`, data)
  return res.data?.data
})
export const addLeaveApplication = createAsyncThunk(
  "leaveApplication/addLeaveApplication",
  async (data) => {
    const res = await axios.post("leave-application", data);
    return res.data;
  }
);
export const updateLeaveApplication = createAsyncThunk(
  "leaveApplication/updateLeaveApplication",
  async ({ formData, editId }) => {
    const res = await axios.post(`leave-application/${editId}`, formData);
    return res.data?.data;
  }
);
export const deleteLeaveApplication = createAsyncThunk(
  "leaveApplication/deleteLeaveApplication",
  async (id) => {
    const res = await axios.delete(`leave-application/${id}`);
    return res.data?.data;
  }
);



export const initialLeaveApplicationData = {
  from_date: "",
  to_date: "",
  leave_cause: "",
}
export const leaveApplicationSlice = createSlice({
  name: "leaveApplication",
  initialState: {
    data: [],
    mutationLoading: false,
    fetchingAllData: false,
    fetchingSingleData: false,
    leaveApplicationFormData: initialLeaveApplicationData
  },
  reducers: {
    bindLeaveApplicationData: (state, action) => {
      state.leaveApplicationFormData =
        action.payload || initialLeaveApplicationData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLeaveApplication.pending, (state, action) => {
        state.mutationLoading = true;
      })
      .addCase(addLeaveApplication.fulfilled, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(addLeaveApplication.rejected, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(updateLeaveApplication.pending, (state, action) => {
        state.mutationLoading = true;
      })
      .addCase(updateLeaveApplication.fulfilled, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(updateLeaveApplication.rejected, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(deleteLeaveApplication.pending, (state, action) => {
        state.mutationLoading = true;
      })
      .addCase(deleteLeaveApplication.fulfilled, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(deleteLeaveApplication.rejected, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(getAllLeaveApplications.pending, (state, action) => {
        state.fetchingAllData = true;
      })
      .addCase(getAllLeaveApplications.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetchingAllData = false;
      })
      .addCase(getAllLeaveApplications.rejected, (state, action) => {
        state.fetchingAllData = false;
      })
      .addCase(getLeaveApplication.pending, (state, action) => {
        state.fetchingSingleData = true;
      })
      .addCase(getLeaveApplication.fulfilled, (state, action) => {
        const { from_date, to_date, leave_cause } = action.payload;
        state.leaveApplicationFormData.from_date = from_date;
        state.leaveApplicationFormData.to_date = to_date;
        state.leaveApplicationFormData.leave_cause = leave_cause;
        state.fetchingSingleData = false;
      })
      .addCase(getLeaveApplication.rejected, (state, action) => {
        state.fetchingSingleData = false;
      })
      .addCase(approveApplication.pending, (state, action) => {
        state.mutationLoading = true;
      })
      .addCase(approveApplication.fulfilled, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(approveApplication.rejected, (state, action) => {
        state.mutationLoading = false;
      })
      .addCase(forwardApplication.fulfilled, (state, action) => {
        state.mutationLoading = false;
      })
  },
});

export const {
  bindLeaveApplicationData,
} = leaveApplicationSlice.actions;

export default leaveApplicationSlice.reducer;
