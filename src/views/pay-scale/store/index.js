import axios from '@/helpers/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialPayScaleData = {
    name: "",
    salary_from: 0,
    salary_to: 0
}

export const getAllPayScale = createAsyncThunk('payScale/getAllPayScale', async (params) => {
    for (const key in params) {
        if (params[key] === null || params[key] === '') {
            delete params[key];
        }
    }
    const url = new URLSearchParams(params);
    const api = `payScale?${url.toString()}`;
    const result = axios.get(api)
        .then((res) => {
            console.log('pay scale data from redux', res.data.data.data)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addPayScale = createAsyncThunk('payScale/addPayScale', async (data) => {
    const result = axios.post("payScale", data)
        .then((res) => {
            console.log('payScale submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updatePayScale = createAsyncThunk('payScale/updatePayScale', async (data) => {
    const result = axios.post(`payScale/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {
            console.log('payScale submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getPayScaleById = createAsyncThunk('payScale/getPayScaleById', async (id) => {
    const result = axios.get(`payScale/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deletePayScale = createAsyncThunk('payScale/deletePayScale', async (id) => {
    const result = axios.delete(`payScale/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const payScaleSlice = createSlice({
    name: 'payScale',
    initialState: {
        payScaleData: [],
        loading: false,
        basicPayScaleData: initialPayScaleData,
        mutationLoading: false,
        currentPage: 1,
        perPage: 10,
        totalPages: 0,
        firstRow: 0
    },
    reducers: {
        bindPayScaleData: (state, action) => {
            state.basicPayScaleData = action.payload || initialPayScaleData
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
            .addCase(getAllPayScale.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllPayScale.fulfilled, (state, action) => {
                state.payScaleData = action.payload.data;
                state.currentPage = action.payload.current_page;
                state.perPage = action.payload.per_page;
                state.totalPages = action.payload.total;
                state.loading = false;
            })
            .addCase(getAllPayScale.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getPayScaleById.fulfilled, (state, action) => {
                state.basicPayScaleData = action.payload;
            })
            .addCase(addPayScale.pending, (state) => {
                state.mutationLoading = true;
            })
            .addCase(addPayScale.fulfilled, (state) => {
                state.mutationLoading = false;
            })
            .addCase(addPayScale.rejected, (state) => {
                state.mutationLoading = false;
            })
            .addCase(updatePayScale.pending, (state) => {
                state.mutationLoading = true;
            })
            .addCase(updatePayScale.fulfilled, (state) => {
                state.mutationLoading = false;
            })
            .addCase(updatePayScale.rejected, (state) => {
                state.mutationLoading = false;
            })
    }
});

export const { bindPayScaleData, setMetaData } = payScaleSlice.actions;

export default payScaleSlice.reducer;