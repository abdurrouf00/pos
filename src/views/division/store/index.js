import axios from '@/helpers/axios';
import { getObjectWithValidValues } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialDivisionData = {
    id: "",
    name: ""
}

const divisionApi = 'settings/divisions';

export const getAllDivisions = createAsyncThunk('division/getAllDivisions', async (params) => {
    const validParams = getObjectWithValidValues(params);
    const url = new URLSearchParams(validParams);
    const api = `${divisionApi}?${url.toString()}`;
    const result = axios.get(api)
        .then((res) => {
            console.log('division data from redux', res.data.data.data)
            return res.data.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addDivision = createAsyncThunk('division/addDivision', async (data) => {
    const result = axios.post(divisionApi, data)
        .then((res) => {
            console.log('division submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updateDivision = createAsyncThunk('division/updateDivision', async (data) => {
    const result = axios.post(`${divisionApi}/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {
            console.log('division submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getDivisionById = createAsyncThunk('division/getDivisionById', async (id) => {
    const result = axios.get(`${divisionApi}/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deleteDivision = createAsyncThunk('division/deleteDivision', async (id) => {
    const result = axios.delete(`${divisionApi}/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const divisionSlice = createSlice({
    name: 'division',
    initialState: {
        divisionData: [],
        loading: false,
        basicDivisionData: initialDivisionData
    },
    reducers: {
        bindDivisionData: (state, action) => {
            state.basicDivisionData = action.payload || initialDivisionData
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDivisions.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllDivisions.fulfilled, (state, action) => {
                state.divisionData = action.payload;
                state.loading = false;
            })
            .addCase(getAllDivisions.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getDivisionById.fulfilled, (state, action) => {
                state.basicDivisionData = action.payload;
            })
    }
});

export const { bindDivisionData } = divisionSlice.actions;

export default divisionSlice.reducer;