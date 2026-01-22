import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Add this line
export const initialManualAttendanceData = {
  id: "",
  attendance_date: "",
  attendance_count: "",
  attendance: [
    {
      employee_id: "",
      employee_name: "",
      in_time: "",
      out_time: "",
      attendance_type_id: "",
      remark: "",
    },
  ],
};

export const getAttendanceCount = createAsyncThunk(
  "attendance/getAttendanceCount",
  async (data) => {
    const res = await axios.get("attendance/count", data);
    return res.data?.data;
  }
);

export const submitAttendance = createAsyncThunk(
  "attendance/submitAttendance",
  async (data) => {
    const res = await axios.post("attendance/submit", data);
    return res.data?.data;
  }
);

export const manualAttendanceSlice = createSlice({
  name: "manualAttendance",
  initialState: {
    attendanceData: initialManualAttendanceData,
    loading: false,
  },
  reducers: {
    bindManualAttendanceData: (state, action) => {
      state.attendanceData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ? Search Attendance
    builder.addCase(getAttendanceCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAttendanceCount.fulfilled, (state, action) => {
      state.attendanceData = action.payload;
      state.loading = false;
    });
    builder.addCase(getAttendanceCount.rejected, (state) => {
      state.loading = false;
    });

    // * Get All Attendance
    builder.addCase(submitAttendance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitAttendance.fulfilled, (state, action) => {
      state.attendanceData = action.payload;
      state.loading = false;
    });
    builder.addCase(submitAttendance.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { bindManualAttendanceData } = manualAttendanceSlice.actions;
export default manualAttendanceSlice.reducer;
