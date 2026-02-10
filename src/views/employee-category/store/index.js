import axios from '@/helpers/axios';
import { getObjectWithValidValues } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialEmployeeCategoryData = {
    id: "",
    name: "",
    code: "",
    description: "",
    status: "active"
}

const employeeCategoryApi = 'settings/emp-categories';

export const getAllEmployeeCategories = createAsyncThunk('employeeCategory/getAllEmployeeCategories', async (params) => {
    const validParams = getObjectWithValidValues(params);
    const url = new URLSearchParams(validParams);
    const api = `${employeeCategoryApi}?${url.toString()}`;
    const result = axios.get(api)
        .then((res) => {

            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addEmployeeCategory = createAsyncThunk('employeeCategory/addEmployeeCategory', async (data) => {
    const result = axios.post(employeeCategoryApi, data)
        .then((res) => {

            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updateEmployeeCategory = createAsyncThunk('employeeCategory/updateEmployeeCategory', async (data) => {
    const result = axios.post(`${employeeCategoryApi}/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {

            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getEmployeeCategoryById = createAsyncThunk('employeeCategory/getEmployeeCategoryById', async (id) => {
    const result = axios.get(`${employeeCategoryApi}/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deleteEmployeeCategory = createAsyncThunk('employeeCategory/deleteEmployeeCategory', async (id) => {
    const result = axios.delete(`${employeeCategoryApi}/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const employeeCategorySlice = createSlice({
    name: 'employeeCategory',
    initialState: {
        employeeCategoryData: [],
        loading: false,
        basicEmployeeCategoryData: initialEmployeeCategoryData,
        currentPage: 1,
        perPage: 10,
        totalPages: 0,
        firstRow: 0,
        isSubmitting: false
    },
    reducers: {
        bindEmployeeCategoryData: (state, action) => {
            state.basicEmployeeCategoryData = action.payload || initialEmployeeCategoryData
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
            .addCase(getAllEmployeeCategories.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllEmployeeCategories.fulfilled, (state, action) => {
                state.employeeCategoryData = action.payload.data;
                state.currentPage = action.payload.current_page;
                state.perPage = action.payload.per_page;
                state.totalPages = action.payload.total;
                state.loading = false;
            })
            .addCase(getEmployeeCategoryById.fulfilled, (state, action) => {
                state.basicEmployeeCategoryData = action.payload;
            })
            .addCase(getAllEmployeeCategories.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(addEmployeeCategory.pending, (state, action) => {
                state.isSubmitting = true;
            })
            .addCase(addEmployeeCategory.fulfilled, (state, action) => {
                state.isSubmitting = false;
            })
            .addCase(addEmployeeCategory.rejected, (state, action) => {
                state.isSubmitting = false;
            })
            .addCase(updateEmployeeCategory.pending, (state, action) => {
                state.isSubmitting = true;
            })
            .addCase(updateEmployeeCategory.fulfilled, (state, action) => {
                state.isSubmitting = false;
            })
            .addCase(updateEmployeeCategory.rejected, (state, action) => {
                state.isSubmitting = false;
            })
    }
});

export const { bindEmployeeCategoryData, setMetaData } = employeeCategorySlice.actions;

export default employeeCategorySlice.reducer;