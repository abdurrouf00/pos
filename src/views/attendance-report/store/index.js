import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const REPORT_ENDPOINT = "attendanceReport";

export const initialAttendanceReportData = {
  report_type: "",
  report_name: "",
  date: "",
  department: "",
  year: "",
  month: "",
  employee: "",
  from_date: "",
  to_date: "",
};

const createReportThunk = (type) =>
  createAsyncThunk(`attendanceReport/${type}`, async () => {
    const res = await axios.get(REPORT_ENDPOINT);
    return res.data?.data?.data ?? [];
  });


export const getJobCardLateDetailsReport = createReportThunk("lateDetails");
export const getContinuousLateReport = createReportThunk("continuousLate");
export const getOvertimeReport = createReportThunk("overtime");

export const getMonthlyPresentAndAbsentReport = createAsyncThunk(
  "attendance/getMonthlyPresentAndAbsentReport",
  async (data) => {
    const res = await axios.post("monthly-attendance", data);
    return res.data?.data;
  }
);

export const attendaceEmployeeReport = createAsyncThunk(
  "attendance/attendaceEmployeeReport",
  async (data) => {
    const res = await axios.post("employee-attendance", data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return res.data.data;
  }
);
export const getAttendanceReportByDateRange = createAsyncThunk(
  "attendance/getAttendanceReportByDateRange",
  async (data) => {
    const res = await axios.get(`attendance?from_date=${data.from_date}&to_date=${data.to_date}`);
    return res.data?.data;
  }
);


export const attendanceReportSlice = createSlice({
  name: "attendanceReport",
  initialState: {
    attendanceTypeData: [],
    loading: false,
    basicAttendanceReportData: initialAttendanceReportData,
    reportData: [],
  },
  reducers: {
    bindAttendanceReportData: (state, action) => {
      if (action.payload) {
        state.basicAttendanceReportData = {
          ...state.basicAttendanceReportData,
          ...action.payload,
        };
      } else {
        state.basicAttendanceReportData = initialAttendanceReportData;
      }

    },
    bindReportData: (state, action) => {
      state.reportData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(attendaceEmployeeReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(attendaceEmployeeReport.fulfilled, (state, action) => {
      state.reportData = action.payload;
      state.loading = false;
    });
    builder.addCase(attendaceEmployeeReport.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getAttendanceReportByDateRange.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAttendanceReportByDateRange.fulfilled, (state, action) => {
      state.reportData = action.payload;
      state.loading = false;
    });
    builder.addCase(getAttendanceReportByDateRange.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getMonthlyPresentAndAbsentReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMonthlyPresentAndAbsentReport.fulfilled, (state, action) => {
      state.reportData = action.payload;
      state.loading = false;
    });
    builder.addCase(getMonthlyPresentAndAbsentReport.rejected, (state, action) => {
      state.loading = false;
    });

    const handleSuccess = (builder, thunk) => {
      builder.addCase(thunk.fulfilled, (state, action) => {
        state.reportData = action.payload;
        state.loading = false;
      });
    };

    handleSuccess(builder, getJobCardLateDetailsReport);
    handleSuccess(builder, getContinuousLateReport);
    handleSuccess(builder, getOvertimeReport);
  },
});

export const { bindAttendanceReportData, bindReportData } = attendanceReportSlice.actions;
export default attendanceReportSlice.reducer;
