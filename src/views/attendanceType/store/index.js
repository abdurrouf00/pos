import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialAttendanceTypeData = {
  id: 0,
  name: "",
  short_name: "",
  color: "",
  serial_no: "",
};

export const getAllAttendanceType = createAsyncThunk(
  "attendanceType/getAllAttendanceType",
  async () => {
    const result = axios
      .get("attendance-type")
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

export const addAttendanceType = createAsyncThunk(
  "attendanceType/addAttendanceType",
  async (data) => {
    const res = await axios.post("attendance-type", data);
    return res.data?.data;
  }
);

export const updateAttendanceType = createAsyncThunk(
  "attendanceType/updateAttendanceType",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`attendance-type/${data?.id}`, {
        ...data,
        _method: "PUT",
      });
      return res.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getAttendanceTypeById = createAsyncThunk(
  "attendanceType/getAttendanceTypeById",
  async (id) => {
    const result = axios
      .get(`attendance-type/${id}`)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);

export const deleteAttendanceType = createAsyncThunk(
  "attendanceType/deleteAttendanceType",
  async (id) => {
    const result = axios
      .delete(`attendance-type/${id}`)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return result;
  }
);


export const attendanceTypeSlice = createSlice({
  name: "attendanceType",
  initialState: {
    attendanceTypeData: [],
    loading: false,
    basicAttendanceTypeData: initialAttendanceTypeData,
    mutationLoading: false,
  },
  reducers: {
    bindAttendanceTypeData: (state, action) => {
      state.basicAttendanceTypeData =
        action.payload || initialAttendanceTypeData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAttendanceType.fulfilled, (state, action) => {
        state.attendanceTypeData = action.payload;
      })
      .addCase(getAttendanceTypeById.fulfilled, (state, action) => {
        state.basicAttendanceTypeData = action.payload;
      })
      .addCase(addAttendanceType.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(addAttendanceType.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(addAttendanceType.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateAttendanceType.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(updateAttendanceType.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateAttendanceType.rejected, (state) => {
        state.mutationLoading = false;
      })

  },
});

export const { bindAttendanceTypeData } = attendanceTypeSlice.actions;

export default attendanceTypeSlice.reducer;
