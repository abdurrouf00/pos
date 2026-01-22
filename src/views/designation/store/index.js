import axios from '@/helpers/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialDesignationData = {
    id: "",
    name: "",
    job_grade: "",
    status: "active"
}

export const getAllDesignations = createAsyncThunk('designation/getAllDesignations', async (params) => {
    for (const key in params) {
        if (params[key] === null || params[key] === '') {
            delete params[key];
        }
    }
    const url = new URLSearchParams(params);
    const api = `designation?${url.toString()}`;
    const result = axios.get(api)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addDesignation = createAsyncThunk('designation/addDesignation', async (data) => {
    const result = axios.post("designation", data)
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updateDesignation = createAsyncThunk('designation/updateDesignation', async (data) => {
    const result = axios.post(`designation/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getDesignationById = createAsyncThunk('designation/getDesignationById', async (id) => {
    const result = axios.get(`designation/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deleteDesignation = createAsyncThunk('designation/deleteDesignation', async (id) => {
    const result = axios.delete(`designation/${id}`)
        .then((res) => {

            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const designationSlice = createSlice({
    name: 'designation',
    initialState: {
        designationData: [],
        currentPage: 1,
        perPage: 10,
        totalPages: 0,
        loading: false,
        firstRow: 0,
        basicDesignationData: initialDesignationData
    },
    reducers: {
        bindDesignationData: (state, action) => {
            state.basicDesignationData = action.payload || initialDesignationData
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
            .addCase(getAllDesignations.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllDesignations.fulfilled, (state, action) => {
                state.designationData = action.payload.data;
                state.currentPage = action.payload.current_page;
                state.perPage = action.payload.per_page;
                state.totalPages = action.payload.total;
                state.loading = false;
            })
            .addCase(getAllDesignations.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getDesignationById.fulfilled, (state, action) => {
                state.basicDesignationData = action.payload;
            })
    }
});

export const { bindDesignationData, setMetaData } = designationSlice.actions;

export default designationSlice.reducer;