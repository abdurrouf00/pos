import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialTaskAssignData = {
  id: "",
  name: "",
  priority: "",
  status: "",
  assign_to: "",
  assign_by: "",
  assign_date: "",
  due_date: ""
};

export const getAllTaskAssign = createAsyncThunk(
  "task-assign/getAllTaskAssign",
  async () => {
    const result = axios
      .get("task-assign")
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

export const addTaskAssign = createAsyncThunk('task-assign/addTaskAssign', async (data) => {
    const result = axios.post("task-assign", data)
        .then((res) => {
            console.log('task assign submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const taskAssignSlice = createSlice({
  name: "task-assign",
  initialState: {
    taskAssignData: [],
    loading: false,
    basicTaskAssignData: initialTaskAssignData,
  },
  reducers: {
    bindTaskAssignData: (state, action) => {
      state.basicTaskAssignData = action.payload || initialTaskAssignData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTaskAssign.fulfilled, (state, action) => {
        state.taskAssignData = action.payload;
      })
      .addCase(addTaskAssign.fulfilled, (state, action) => {
        state.taskAssignData = [...state.taskAssignData, action.payload];
      });
  },
});

export const { bindTaskAssignData } = taskAssignSlice.actions;

export default taskAssignSlice.reducer;
