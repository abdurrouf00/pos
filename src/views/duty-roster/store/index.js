import axios from "@/helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const createDutyRoster = createAsyncThunk( 'dutyRoster/createDutyRoster', async ( data ) => {
    const response = await axios.post( 'duty-rostar', data );
    return response.data;
} );
export const getDutyRoster = createAsyncThunk( 'dutyRoster/getDutyRoster', async () => {
    const response = await axios.get( 'duty-rostar' );
    return response.data;
} );
export const dutyRosterSlice = createSlice( {
    name: 'dutyRoster',
    initialState: {
        data: [],
        loading: false,
        error: null,
        mutationLoading: false
    },
    extraReducers: ( builder ) => {
        builder.addCase( createDutyRoster.pending, ( state ) => {
            state.mutationLoading = true;
        } )
        builder.addCase( createDutyRoster.fulfilled, ( state, action ) => {
            state.mutationLoading = false;
            state.data = action.payload;
            toast.success( 'Duty roster created successfully' );
        } )
        builder.addCase( createDutyRoster.rejected, ( state, action ) => {
            state.mutationLoading = false;
            state.error = action.error;
        } )
        builder.addCase( getDutyRoster.pending, ( state ) => {
            state.loading = true;
        } )
        builder.addCase( getDutyRoster.fulfilled, ( state, action ) => {
            state.loading = false;
            state.data = action.payload;
        } )
        builder.addCase( getDutyRoster.rejected, ( state, action ) => {
            state.loading = false;
            state.error = action.error;
        } )
    }
} )

export default dutyRosterSlice.reducer;