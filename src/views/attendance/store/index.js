import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialAttendanceData = {
  id: "",
  employee_id: "",
  attendance_type_id: "",
  date: "",
  time: "",
};

const searchAttendance = createAsyncThunk(
  "attendance/searchAttendance",
  async (data) => {
    const res = await axios.get("attendance/search", data);
    return res.data?.data;
  }
);
export const saveAttendanceManually = createAsyncThunk(
  "attendance/saveAttendanceManually",
  async (data) => {
    const res = await axios.post("save-manual-attendance", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  }
);
export const searchAttendanceByDateRange = createAsyncThunk(
  "attendance/searchAttendanceByDateRange",
  async ({ from_date, to_date }) => {
    const res = await axios.get(`attendance?from_date=${from_date}&to_date=${to_date}`);
    return res.data?.data;
  }
);

export const attendanceFileUpload = createAsyncThunk(
  "attendance/attendanceFileUpload",
  async (data) => {
    const res = await axios.post("upload-attendance-sheet", data);
    return res.data;
  }
);
export const searchAttendanceBySingleDate = createAsyncThunk(
  "attendance/searchAttendanceBySingleDate",
  async (date) => {
    const res = await axios.get(`attendance-by-date?date=${date}`);
    return res.data?.data;
  }
);
export const getAllAttendance = createAsyncThunk(
  "attendance/getAllAttendance",
  async (params) => {
    for (const key in params) {
      if (params[key] === null || params[key] === '') {
        delete params[key];
      }
    }
    const url = new URLSearchParams(params);
    const api = `attendance?${url.toString()}`;
    const res = await axios.get(api);
    return res.data?.data;
  }
);

const addAttendanceManually = createAsyncThunk(
  "attendance/addAttendanceManually",
  async (data) => {
    const res = await axios.post("attendance", data);
    return res.data?.data;
  }
);

const uploadAttendance = createAsyncThunk(
  "attendance/uploadAttendance",
  async (data) => {
    const res = await axios.post("attendance/upload", data);
    return res.data?.data;
  }
);
export const saveAttendanceInTime = createAsyncThunk(
  "attendanceType/saveAttendanceInTime",
  async (data) => {
    const res = await axios.post(
      "save-attendance-in",
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return res.data;
  }
);

export const saveAttendanceOutTime = createAsyncThunk(
  "attendanceType/saveAttendanceOutTime",
  async (data) => {
    const res = await axios.post("save-attendance-out", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  }
);

export const updateAttendanceDetails = createAsyncThunk(
  "attendance/updateAttendanceDetails",
  async ({ attendance_detail_id, ...params }) => {
    for (const key in params) {
      if (params[key] === null || params[key] === '') {
        delete params[key];
      }
    }
    const url = new URLSearchParams(params);
    const api = `attendance/${attendance_detail_id}?${url.toString()}`;
    const res = await axios.put(api);
    return res.data;
  }
)


export const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendanceData: [],
    loading: false,
    basicAttendanceData: initialAttendanceData,
    searchValue: { date: "", department_id: "" },
    attendanceFormType: "in",
    attendanceFormData: [],
    mutationLoading: false,
    manualAttendanceData: {
      department_id: "",
      data: [],
    },
  },
  reducers: {
    bindAttendanceData: (state, action) => {
      state.basicAttendanceData = action.payload;
    },
    bindSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    bindAttendanceFormType: (state, action) => {
      state.attendanceFormType = action.payload;
    },
    bindAttendanceFormData: (state, action) => {
      state.attendanceFormData = action.payload;
    },
    bindManualAttendanceData: (state, action) => {
      state.manualAttendanceData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ? Search Attendance
    builder.addCase(searchAttendance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchAttendance.fulfilled, (state, action) => {
      state.attendanceData = action.payload;
      state.loading = false;
    });
    builder.addCase(searchAttendance.rejected, (state) => {
      state.loading = false;
    });

    // * Get All Attendance
    builder.addCase(getAllAttendance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAttendance.fulfilled, (state, action) => {
      state.attendanceData = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllAttendance.rejected, (state) => {
      state.loading = false;
    });

    // * Add Attendance Manually
    builder.addCase(addAttendanceManually.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAttendanceManually.fulfilled, (state, action) => {
      state.attendanceData = action.payload;
      state.loading = false;
    });
    builder.addCase(addAttendanceManually.rejected, (state) => {
      state.loading = false;
    });

    // ! Upload Attendance
    builder.addCase(uploadAttendance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadAttendance.fulfilled, (state, action) => {
      state.attendanceData = action.payload;
      state.loading = false;
    })
    // ! Search Attendance By Date Range
    builder.addCase(searchAttendanceByDateRange.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchAttendanceByDateRange.fulfilled, (state, action) => {
      state.attendanceData = action.payload;
      state.loading = false;
    });
    builder.addCase(searchAttendanceByDateRange.rejected, (state) => {
      state.loading = false;
    })
    // ! Search Attendance By Single Date
    builder.addCase(searchAttendanceBySingleDate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchAttendanceBySingleDate.fulfilled, (state, action) => {
      state.attendanceData = action.payload;
      state.loading = false;
    });
    builder.addCase(searchAttendanceBySingleDate.rejected, (state) => {
      state.loading = false;
    })
    builder.addCase(saveAttendanceInTime.pending, (state) => {
      state.mutationLoading = true;
    })
    builder.addCase(saveAttendanceInTime.fulfilled, (state) => {
      state.mutationLoading = false;
    })
    builder.addCase(saveAttendanceInTime.rejected, (state) => {
      state.mutationLoading = false;
    });
    builder.addCase(saveAttendanceOutTime.pending, (state) => {
      state.mutationLoading = true;
    })
    builder.addCase(saveAttendanceOutTime.fulfilled, (state) => {
      state.mutationLoading = false;
    })
    builder.addCase(saveAttendanceOutTime.rejected, (state) => {
      state.mutationLoading = false;
    });
    builder.addCase(saveAttendanceManually.pending, (state) => {
      state.mutationLoading = true;
    })
    builder.addCase(saveAttendanceManually.fulfilled, (state) => {
      state.mutationLoading = false;
    })
    builder.addCase(saveAttendanceManually.rejected, (state) => {
      state.mutationLoading = false;
    })
    builder.addCase(updateAttendanceDetails.pending, (state) => {
      state.mutationLoading = true;
    })
    builder.addCase(updateAttendanceDetails.fulfilled, (state) => {
      state.mutationLoading = false;
    })
    builder.addCase(updateAttendanceDetails.rejected, (state) => {
      state.mutationLoading = false;
    })
  },
});

export const { bindAttendanceData, bindSearchValue, bindAttendanceFormType, bindAttendanceFormData, bindManualAttendanceData } = attendanceSlice.actions;
export default attendanceSlice.reducer;
