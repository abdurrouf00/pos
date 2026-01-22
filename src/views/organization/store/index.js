import axios from '@/helpers/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialOrganizationData = {
    id: "",
    name: ""
}

export const getAllOrganizations = createAsyncThunk('organization/getAllOrganizations', async () => {
    const result = axios.get("organization")
        .then((res) => {

            return res.data.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addOrganization = createAsyncThunk('organization/addOrganization', async (data) => {
    const result = axios.post("organization", data)
        .then((res) => {

            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updateOrganization = createAsyncThunk('organization/updateOrganization', async (data) => {
    const { id, ...rest } = data;
    const result = axios.post(`organization/${id}`, { ...rest, _method: "PUT" })
        .then((res) => {

            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getOrganizationById = createAsyncThunk('organization/getOrganizationById', async (id) => {
    const result = axios.get(`organization/${id}`)
        .then((res) => {

            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deleteOrganization = createAsyncThunk('organization/deleteOrganization', async (id) => {
    const result = axios.delete(`organization/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const organizationSlice = createSlice({
    name: 'organization',
    initialState: {
        organizationData: [],
        loading: false,
        basicOrganizationData: initialOrganizationData,
        mutationLoading: false
    },
    reducers: {
        bindOrganizationData: (state, action) => {
            state.basicOrganizationData = action.payload || initialOrganizationData
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrganizations.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllOrganizations.fulfilled, (state, action) => {
                state.organizationData = action.payload;
                state.loading = false;
            })
            .addCase(getAllOrganizations.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getOrganizationById.fulfilled, (state, action) => {
                state.basicOrganizationData = action.payload;
            })
            .addCase(addOrganization.pending, (state, action) => {
                state.mutationLoading = true;
            })
            .addCase(addOrganization.fulfilled, (state, action) => {
                state.mutationLoading = false;
            })
            .addCase(addOrganization.rejected, (state, action) => {
                state.mutationLoading = false;
            })
            .addCase(updateOrganization.pending, (state, action) => {
                state.mutationLoading = true;
            })
            .addCase(updateOrganization.fulfilled, (state, action) => {
                state.mutationLoading = false;
            })
            .addCase(updateOrganization.rejected, (state, action) => {
                state.mutationLoading = false;
            })
    }
});

export const { bindOrganizationData } = organizationSlice.actions;

export default organizationSlice.reducer;