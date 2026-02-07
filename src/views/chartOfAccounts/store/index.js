import api from '@/lib/redux/api'
import { getObjectWithValidValues } from '@/lib/utils'

const chartOfAccountsApi = 'accounts/account-heads'
const chartOfAccountsEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getChartOfAccounts: builder.query({
      query: () => ({
        url: `${chartOfAccountsApi}/tree`,
        method: 'GET',
      }),
      providesTags: ['chartOfAccounts'],
    }),
    addChartOfAccounts: builder.mutation({
      query: data => ({
        url: `${chartOfAccountsApi}`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['chartOfAccounts'],
    }),
    updateChartOfAccounts: builder.mutation({
      query: data => ({
        url: `${chartOfAccountsApi}/${data.id}`,
        method: 'PUT',
        data: {
          ...data,
          _method: 'PUT',
        },
      }),
      invalidatesTags: ['chartOfAccounts'],
    }),
    deleteChartOfAccounts: builder.mutation({
      query: id => ({
        url: `${chartOfAccountsApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['chartOfAccounts'],
    }),
    getChartOfAccountsById: builder.query({
      query: id => ({
        url: `${chartOfAccountsApi}/${id}`,
        method: 'GET',
      }),
    }),
    getAccountTypes: builder.query({
      query: params => ({
        url: `${chartOfAccountsApi}/account-type`,
        method: 'GET',
      }),
    }),
    getParentAccounts: builder.query({
      query: params => ({
        url: `${chartOfAccountsApi}/query?${new URLSearchParams(getObjectWithValidValues(params))}`,
        method: 'GET',
      }),
    }),
    //need lazy query
    seedChartOfAccounts: builder.query({
      query: () => ({
        url: `${chartOfAccountsApi}/seed`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetChartOfAccountsQuery,
  useAddChartOfAccountsMutation,
  useUpdateChartOfAccountsMutation,
  useDeleteChartOfAccountsMutation,
  useGetChartOfAccountsByIdQuery,
  useGetAccountTypesQuery,
  useGetParentAccountsQuery,
  //lazy query
  useLazySeedChartOfAccountsQuery,
} = chartOfAccountsEndpoints
