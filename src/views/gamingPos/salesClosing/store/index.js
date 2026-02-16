import api from '@/lib/redux/api'

const denominationCountApi = 'gamezone-pos/denomination-count'

const METHOD_TYPE_CASH = 1
const METHOD_TYPE_BANK = 2

const denominationCountEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDenominationCountList: builder.query({
      query: (params = {}) => ({
        url: denominationCountApi,
        method: 'GET',
        params,
      }),
      providesTags: ['denominationCount'],
    }),
    getDenominationCountById: builder.query({
      query: (id) => ({
        url: `${denominationCountApi}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'denominationCount', id }],
    }),
    getDenominationCountByDate: builder.query({
      query: ({ date, closing_type }) => ({
        url: `${denominationCountApi}/by-date`,
        method: 'GET',
        params: { date, closing_type },
      }),
      providesTags: ['denominationCount'],
    }),
    getDenominationCountSummary: builder.query({
      query: (params) => ({
        url: `${denominationCountApi}/summary`,
        method: 'GET',
        params,
      }),
      providesTags: ['denominationCount'],
    }),
    createDenominationCount: builder.mutation({
      query: (data) => ({
        url: denominationCountApi,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['denominationCount'],
    }),
    updateDenominationCount: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${denominationCountApi}/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['denominationCount'],
    }),
    deleteDenominationCount: builder.mutation({
      query: (id) => ({
        url: `${denominationCountApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['denominationCount'],
    }),
  }),
})

export const {
  useGetDenominationCountListQuery,
  useGetDenominationCountByIdQuery,
  useGetDenominationCountByDateQuery,
  useGetDenominationCountSummaryQuery,
  useCreateDenominationCountMutation,
  useUpdateDenominationCountMutation,
  useDeleteDenominationCountMutation,
} = denominationCountEndpoints

export { METHOD_TYPE_CASH, METHOD_TYPE_BANK }
