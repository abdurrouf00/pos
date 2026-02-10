import axios from '@/helpers/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialCompanyData = {
  id: '',
  organization_id: '',
  name: '',
  address: '',
  phone: '',
  email: '',
  has_overtime: 0,
  overtime_rate: '',
  min_overtime_minutes: '',
  attendance_change_days: '',
}

const companyApi = 'settings/companies'

export const getAllCompanies = createAsyncThunk('company/getAllCompanies', async () => {
  const result = axios
    .get(companyApi)
    .then(res => {
      const resData = res.data?.companies?.data?.map(item => ({
        ...item,
        has_overtime: item.has_overtime === 1 ? 'Yes' : 'No',
      }))
      return resData
    })
    .catch(err => console.log(err))
  return result
})

export const addCompany = createAsyncThunk('company/addCompany', async data => {
  const result = axios
    .post(companyApi, data)
    .then(res => {
      return res
    })
    .catch(err => console.log(err))
  return result
})

export const updateCompany = createAsyncThunk('company/updateCompany', async data => {
  const result = axios
    .post(`${companyApi}/${data?.id}`, { ...data, _method: 'PUT' })
    .then(res => {
      return res
    })
    .catch(err => console.log(err))
  return result
})

export const getCompanyById = createAsyncThunk('company/getCompanyById', async id => {
  const result = axios
    .get(`${companyApi}/${id}`)
    .then(res => {
      return { ...res.data.company, has_overtime: res.data.company.has_overtime ? 1 : 0 }
    })
    .catch(err => console.log(err))
  return result
})

export const deleteCompany = createAsyncThunk('company/deleteCompany', async id => {
  const result = axios
    .delete(`${companyApi}/${id}`)
    .then(res => {
      return res.data.data
    })
    .catch(err => console.log(err))
  return result
})

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyData: [],
    loading: false,
    basicCompanyData: initialCompanyData,
    isFetching: false,
    isSubmitting: false,
  },
  reducers: {
    bindCompanyData: (state, action) => {
      state.basicCompanyData = action.payload || initialCompanyData
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCompanies.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.loading = false
        state.companyData = action.payload
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getCompanyById.pending, (state, action) => {
        state.isFetching = true
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.basicCompanyData = action.payload
        state.isFetching = false
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.isFetching = false
      })
      .addCase(addCompany.pending, (state, action) => {
        state.isSubmitting = true
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.isSubmitting = false
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.isSubmitting = false
      })
      .addCase(updateCompany.pending, (state, action) => {
        state.isSubmitting = true
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.isSubmitting = false
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.isSubmitting = false
      })
  },
})

export const { bindCompanyData } = companySlice.actions

export default companySlice.reducer
