import axios from '@/helpers/axios';
import { getObjectWithValidValues } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialSectionData = {
    id: "",
    name: ""
}

const sectionApi = 'settings/sections';

export const getAllSections = createAsyncThunk('section/getAllSections', async (params) => {
    const validParams = getObjectWithValidValues(params);
    const url = new URLSearchParams(validParams);
    const api = `${sectionApi}?${url.toString()}`;
    const result = axios.get(api)
        .then((res) => {
            console.log('section data from redux', res.data.data.data)
            return res.data.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addSection = createAsyncThunk('section/addSection', async (data) => {
    const result = axios.post(sectionApi, data)
        .then((res) => {
            console.log('section submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updateSection = createAsyncThunk('section/updateSection', async (data) => {
    const result = axios.post(`${sectionApi}/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {
            console.log('section submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getSectionById = createAsyncThunk('section/getSectionById', async (id) => {
    const result = axios.get(`${sectionApi}/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deleteSection = createAsyncThunk('section/deleteSection', async (id) => {
    const result = axios.delete(`${sectionApi}/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const sectionSlice = createSlice({
    name: 'section',
    initialState: {
        sectionData: [],
        loading: false,
        basicSectionData: initialSectionData
    },
    reducers: {
        bindSectionData: (state, action) => {
            state.basicSectionData = action.payload || initialSectionData
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSections.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllSections.fulfilled, (state, action) => {
                state.sectionData = action.payload;
                state.loading = false;
            })
            .addCase(getAllSections.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getSectionById.fulfilled, (state, action) => {
                state.basicSectionData = action.payload;
            })
    }
});
export const { bindSectionData } = sectionSlice.actions;

export default sectionSlice.reducer;