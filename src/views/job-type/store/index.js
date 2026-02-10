import axios from '@/helpers/axios';
import { getObjectWithValidValues } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialJobTypeData = {
    id: "",
    name: "",
    code: "",
    description: "",
    status: "active"
}
const jobTypeApi = 'settings/job-types';
export const getAllJobTypes = createAsyncThunk('jobType/getAllJobTypes', async (params) => {
    const validParams = getObjectWithValidValues(params);
    const url = new URLSearchParams(validParams);
    const api = `${jobTypeApi}?${url.toString()}`;

    const result = axios.get(api)
        .then((res) => {

            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addJobType = createAsyncThunk('jobType/addJobType', async (data) => {
    const result = axios.post(jobTypeApi, data)
        .then((res) => {

            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updateJobType = createAsyncThunk('jobType/updateJobType', async (data) => {
    const result = axios.post(`${jobTypeApi}/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {

            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getJobTypeById = createAsyncThunk('jobType/getJobTypeById', async (id) => {
    const result = axios.get(`${jobTypeApi}/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deleteJobType = createAsyncThunk('jobType/deleteJobType', async (id) => {
    const result = axios.delete(`${jobTypeApi}/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const jobTypeSlice = createSlice({
    name: 'jobType',
    initialState: {
        jobTypeData: [],
        loading: false,
        basicJobTypeData: initialJobTypeData,
        currentPage: 1,
        perPage: 10,
        totalPages: 0,
        firstRow: 0
    },
    reducers: {
        bindJobTypeData: (state, action) => {
            state.basicJobTypeData = action.payload || initialJobTypeData
        },
        setMetaData: (state, action) => {
            state.currentPage = action.payload.current_page;
            state.perPage = action.payload.per_page;
            state.totalPages = action.payload.total;
            state.firstRow = action.payload.firstRow;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobTypes.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllJobTypes.fulfilled, (state, action) => {
                state.jobTypeData = action.payload.data;
                state.currentPage = action.payload.current_page;
                state.perPage = action.payload.per_page;
                state.totalPages = action.payload.total;
                state.loading = false;
            })
            .addCase(getAllJobTypes.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getJobTypeById.fulfilled, (state, action) => {
                state.basicJobTypeData = action.payload;
            })
    }
});

export const { bindJobTypeData, setMetaData } = jobTypeSlice.actions;

export default jobTypeSlice.reducer;