import axios from '@/helpers/axios';
import { getObjectWithValidValues } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialPaymentTypeData = {
    id: "",
    name: "",
    description: "",
    status: "active",
    paymentMethod: "",
    accountNumber: "",
    bankName: ""
}

export const getAllPaymentTypes = createAsyncThunk('paymentType/getAllPaymentTypes', async (params) => {
    const validParams = getObjectWithValidValues(params);
    const url = new URLSearchParams(validParams);
    const api = `paymentType?${url.toString()}`;
    const result = axios.get(api)
        .then((res) => {
            console.log('payment type data from redux', res.data.data.data)
            return res.data.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addPaymentType = createAsyncThunk('paymentType/addPaymentType', async (data) => {
    axios.post("paymentType", data)
        .then((res) => {
            console.log('payment type submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    // return result;
})

export const updatePaymentType = createAsyncThunk('paymentType/updatePaymentType', async (data) => {
    axios.post(`paymentType/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {
            console.log('payment type submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    // return result;
})

export const getPaymentTypeById = createAsyncThunk('paymentType/getPaymentTypeById', async (id) => {
    axios.get(`paymentType/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    // return result;
})

export const deletePaymentType = createAsyncThunk('paymentType/deletePaymentType', async (id) => {
    axios.delete(`paymentType/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    // return result;
})

export const paymentTypeSlice = createSlice({
    name: 'paymentType',
    initialState: {
        paymentTypeData: [],
        loading: false,
        basicPaymentTypeData: initialPaymentTypeData
    },
    reducers: {
        bindPaymentTypeData: (state, action) => {
            state.basicPaymentTypeData = action.payload || initialPaymentTypeData
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPaymentTypes.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllPaymentTypes.fulfilled, (state, action) => {
                state.paymentTypeData = action.payload;
                state.loading = false;
            })
            .addCase(getAllPaymentTypes.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getPaymentTypeById.fulfilled, (state, action) => {
                state.basicPaymentTypeData = action.payload;
            })
    }
});
export const { bindPaymentTypeData } = paymentTypeSlice.actions;

export default paymentTypeSlice.reducer;