import axios from '@/helpers/axios';
import { getObjectWithValidValues } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialWorkingShiftData = {
    id: "",
    name: "",
    start_time: "",
    end_time: "",
    before_allowed_minutes: "",
    late_allowed_minutes: "",
    early_allowed_minutes: "",
    after_allowed_minutes: ""
}

export const getAllWorkingShifts = createAsyncThunk('workingShift/getAllWorkingShifts', async (params) => {
    const validParams = getObjectWithValidValues(params);
    const url = new URLSearchParams(validParams);
    const api = `workingShift?${url.toString()}`;
    const result = axios.get(api)
        .then((res) => {
            return res.data.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addWorkingShift = createAsyncThunk('workingShift/addWorkingShift', async (data) => {
    const result = axios.post("workingShift", data)
        .then((res) => {
            console.log('working shift submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updateWorkingShift = createAsyncThunk('workingShift/updateWorkingShift', async (data) => {
    const result = axios.post(`workingShift/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getWorkingShiftById = createAsyncThunk('workingShift/getWorkingShiftById', async (id) => {
    const result = axios.get(`workingShift/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deleteWorkingShift = createAsyncThunk('workingShift/deleteWorkingShift', async (id) => {
    const result = axios.delete(`workingShift/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const workingShiftSlice = createSlice({
    name: 'workingShift',
    initialState: {
        workingShiftData: [],
        loading: false,
        basicWorkingShiftData: initialWorkingShiftData
    },
    reducers: {
        bindWorkingShiftData: (state, action) => {
            state.basicWorkingShiftData = action.payload || initialWorkingShiftData
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllWorkingShifts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllWorkingShifts.fulfilled, (state, action) => {
                state.workingShiftData = action.payload;
                state.loading = false;
            })
            .addCase(getAllWorkingShifts.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getWorkingShiftById.fulfilled, (state, action) => {
                state.basicWorkingShiftData = action.payload;
            })
    }
});

export const { bindWorkingShiftData } = workingShiftSlice.actions;

export default workingShiftSlice.reducer;