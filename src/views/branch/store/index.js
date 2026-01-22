import axios from '@/helpers/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialBranchData = {
    id: null,
    name: "",
    phone: "",
    email: "",
    address: "",
    l_b_a: 0,
    location_attributes: "",
    has_multiple_shift: 0,
    shift_time_range: "",
    device_key: "",
    device_url: "",
    device_type: "",
    device_company: "",
    company_id: ''
}

export const getAllBranches = createAsyncThunk('branch/getAllBranches', async () => {
    const result = axios.get("branch")
        .then((res) => {
            return res.data.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addBranch = createAsyncThunk('branch/addBranch', async (data) => {
    console.log('data from redux', data)
    const result = axios.post("branch", data)
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updateBranch = createAsyncThunk('branch/updateBranch', async (data) => {
    const result = axios.post(`branch/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getBranchById = createAsyncThunk('branch/getBranchById', async (id) => {
    const result = axios.get(`branch/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deleteBranch = createAsyncThunk('branch/deleteBranch', async (id) => {
    const result = axios.delete(`branch/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const branchSlice = createSlice({
    name: 'branch',
    initialState: {
        branchData: [],
        loading: false,
        basicBranchData: initialBranchData,
        fetchingData: false,
        isSubmitting: false
    },
    reducers: {
        bindBranchData: (state, action) => {
            state.basicBranchData = action.payload || initialBranchData
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBranches.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllBranches.fulfilled, (state, action) => {
                state.loading = false;
                state.branchData = action.payload;
            })
            .addCase(getAllBranches.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getBranchById.pending, (state, action) => {
                state.fetchingData = true;
            })
            .addCase(getBranchById.fulfilled, (state, action) => {
                state.basicBranchData = action.payload;
                state.fetchingData = false;
            })
            .addCase(getBranchById.rejected, (state, action) => {
                state.fetchingData = false;
            })
            .addCase(addBranch.pending, (state, action) => {
                state.isSubmitting = true;
            })
            .addCase(addBranch.fulfilled, (state, action) => {
                state.isSubmitting = false;
            })
            .addCase(updateBranch.pending, (state, action) => {
                state.isSubmitting = true;
            })
            .addCase(updateBranch.fulfilled, (state, action) => {
                state.isSubmitting = false;
            })
            .addCase(updateBranch.rejected, (state, action) => {
                state.isSubmitting = false;
            })

    }
});

export const { bindBranchData } = branchSlice.actions;

export default branchSlice.reducer;