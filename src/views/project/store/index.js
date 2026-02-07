import axios from '@/helpers/axios';
import { getObjectWithValidValues } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialProjectData = {
    id: "",
    name: ""
}

export const getAllProjects = createAsyncThunk('project/getAllProjects', (params) => {
    const validParams = getObjectWithValidValues(params);
    const url = new URLSearchParams(validParams);
    const api = `project?${url.toString()}`;
    const result = axios.get(api)
        .then((res) => {
            console.log('project data from redux', res.data.data.data)
            return res.data.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const addProject = createAsyncThunk('section/addProject', (data) => {
    const result = axios.post("project", data)
        .then((res) => {
            console.log('section submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const updateProject = createAsyncThunk('section/updateProject', (data) => {
    const result = axios.post(`project/${data?.id}`, { ...data, _method: "PUT" })
        .then((res) => {
            console.log('section submitted data from redux', res)
            return res;
        })
        .catch((err) => console.log(err))
    return result;
})

export const getProjectById = createAsyncThunk('section/getProjectById', (id) => {
    const result = axios.get(`project/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const deleteProject = createAsyncThunk('section/deleteProject', (id) => {
    const result = axios.delete(`project/${id}`)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => console.log(err))
    return result;
})

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectData: [],
        loading: false,
        basicProjectData: initialProjectData
    },
    reducers: {
        bindProjectData: (state, action) => {
            state.basicProjectData = action.payload || initialProjectData
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProjects.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllProjects.fulfilled, (state, action) => {
                state.projectData = action.payload;
                state.loading = false;
            })
            .addCase(getAllProjects.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getProjectById.fulfilled, (state, action) => {
                state.basicProjectData = action.payload;
            })
    }
});
export const { bindProjectData } = projectSlice.actions;

export default projectSlice.reducer;