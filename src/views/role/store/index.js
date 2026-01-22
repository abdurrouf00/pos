import axios from '@/helpers/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialRoleData = {
    id: "",
    name: ""
}

export const getAllRole = createAsyncThunk('role/getAllRole', async () => {
    const result = axios.get("role")
        .then((res) => {
            console.log('role data from redux', res.data.data.data)
            return res.data.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addRole = createAsyncThunk('role/addRole', async (data) => {
    const result = axios.post("role", data)
        .then((res) => {
            console.log('role submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updateRole = createAsyncThunk('role/updateRole', async (data) => {
    const result = axios.post(`role/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {
            console.log('role submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getRoleById = createAsyncThunk('role/getRoleById', async (id) => {
    const result = axios.get(`role/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deleteRole = createAsyncThunk('role/deleteRole', async (id) => {
    const result = axios.delete(`role/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getRoleAccess = createAsyncThunk('role/getRoleAccess', async (id) => {

    const result = axios.get(`role-access/${id}`)
        .then((res) => {
            console.log(res)
            return res.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const setRoleAccess = createAsyncThunk('role/setRoleAccess', async (data) => {
    const { id, ...rest } = data;
    const result = axios.post(`role-access/${id}`, { ...rest })
        .then((res) => {
            console.log(res)
            return res.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const roleSlice = createSlice({
    name: 'role',
    initialState: {
        roleData: [],
        loading: false,
        basicRoleData: initialRoleData,
        permissions: [],
        menus: [],
        isLoadingPermissions: false,
        mutationLoading: false
    },
    reducers: {
        bindRoleData: (state, action) => {
            state.basicRoleData = action.payload || initialRoleData
        },
        setPermissions: (state, action) => {
            const uniquePermissions = [...new Set(action.payload)];
            state.permissions = uniquePermissions;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllRole.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllRole.fulfilled, (state, action) => {
                state.roleData = action.payload;
                state.loading = false;
            })
            .addCase(getAllRole.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getRoleById.fulfilled, (state, action) => {
                state.basicRoleData = action.payload;
            })
            .addCase(getRoleAccess.pending, (state, action) => {
                state.isLoadingPermissions = true;
            })
            .addCase(getRoleAccess.fulfilled, (state, action) => {
                state.permissions = action.payload.data.accesses.accesses_uid;
                state.menus = action.payload.data.menus;
                state.isLoadingPermissions = false;
            })
            .addCase(getRoleAccess.rejected, (state, action) => {
                state.isLoadingPermissions = false;
            })
            .addCase(addRole.pending, (state, action) => {
                state.mutationLoading = true;
            })
            .addCase(addRole.fulfilled, (state, action) => {
                state.mutationLoading = false;
            })
            .addCase(addRole.rejected, (state, action) => {
                state.mutationLoading = false;
            })
            .addCase(updateRole.pending, (state, action) => {
                state.mutationLoading = true;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.mutationLoading = false;
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.mutationLoading = false;
            })
    }
});

export const { bindRoleData, setPermissions } = roleSlice.actions;

export default roleSlice.reducer;