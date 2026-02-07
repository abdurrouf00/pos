import axios from '@/helpers/axios';
import { getObjectWithValidValues } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialDepartmentData = {
    id: null,
    name: "",
    has_overtime: 0,
    overtime_rate: "",
    min_overtime_minutes: ""
}

export const getAllDepartment = createAsyncThunk('department/getAllDepartment', async (params) => {

    const validParams = getObjectWithValidValues(params);
    const url = new URLSearchParams(validParams);
    const api = `department?${url.toString()}`;
    const result = axios.get(api)
        .then((res) => {
            const resData = res.data?.data?.data?.map((item) => ({
                ...item,
                has_overtime: item.has_overtime === 1 ? "Yes" : "No"
            }))
            return { data: resData, ...res.data.data };
        })

    return result;
})

export const addDepartment = createAsyncThunk('department/addDepartment', async (data) => {
    const result = axios.post("department", data)
        .then((res) => {

            return res;
        })

    return result;
})

export const updateDepartment = createAsyncThunk('department/updateDepartment', async (data) => {
    const result = axios.post(`department/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {
            return res;
        })

    return result;
})

export const getDepartmentById = createAsyncThunk('department/getDepartmentById', async (id) => {
    const result = axios.get(`department/${id}`)
        .then((res) => {
            return res.data.data;
        })

    return result;
})

export const deleteDepartment = createAsyncThunk('department/deleteDepartment', async (id) => {
    const result = axios.delete(`department/${id}`)
        .then((res) => {
            return res.data.data;
        })

    return result;
})

export const departmentSlice = createSlice({
    name: 'department',
    initialState: {
        departmentData: [],
        loading: false,
        basicDepartmentData: initialDepartmentData,
        fetching: false,
        isSubmitting: false,
        currentPage: 1,
        perPage: 10,
        totalPages: 0,
        firstRow: 0
    },
    reducers: {
        bindDepartmentData: (state, action) => {
            state.basicDepartmentData = action.payload || initialDepartmentData
        },
        setMetaData: (state, action) => {
            state.currentPage = action.payload.current_page;
            state.perPage = action.payload.per_page;
            state.totalPages = action.payload.total;
            state.firstRow = action.payload.firstRow || 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDepartment.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllDepartment.fulfilled, (state, action) => {
                console.log('action.payload dept', action.payload)
                state.departmentData = action.payload.data;
                state.currentPage = action.payload.current_page;
                state.perPage = action.payload.per_page;
                state.totalPages = action.payload.total;

                state.loading = false;
            })
            .addCase(getAllDepartment.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getDepartmentById.pending, (state, action) => {
                state.fetching = true;
            })
            .addCase(getDepartmentById.fulfilled, (state, action) => {
                state.basicDepartmentData = action.payload;
                state.fetching = false;
            })
            .addCase(getDepartmentById.rejected, (state, action) => {
                state.fetching = false;
            })
            .addCase(addDepartment.pending, (state, action) => {
                state.isSubmitting = true;
            })
            .addCase(addDepartment.fulfilled, (state, action) => {
                state.isSubmitting = false;
            })
            .addCase(addDepartment.rejected, (state, action) => {
                state.isSubmitting = false;
            })
            .addCase(updateDepartment.pending, (state, action) => {
                state.isSubmitting = true;
            })
            .addCase(updateDepartment.fulfilled, (state, action) => {
                state.isSubmitting = false;
            })
            .addCase(updateDepartment.rejected, (state, action) => {
                state.isSubmitting = false;
            })
    }
});

export const { bindDepartmentData, setMetaData } = departmentSlice.actions;

export default departmentSlice.reducer;