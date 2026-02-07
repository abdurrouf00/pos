import api from '@/lib/redux/api'

const currencyApi = 'inventory/currencies'
const countryApi = 'location/countries'

export const countryApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getAllCountry: builder.query({
      query: params => ({
        url: `${countryApi}?${new URLSearchParams(params)}`,
        method: 'GET',
      }),

      overrideExisting: true,
    }),
  }),
})

export const { useGetAllCountryQuery } = countryApiSlice

export const currrencyApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getAllCurrency: builder.query({
      query: params => ({
        url: `${currencyApi}?${new URLSearchParams(params)}`,
        method: 'GET',
      }),
      providesTags: ['currencies'],
      overrideExisting: true,
    }),
    createCurrency: builder.mutation({
      query: data => ({
        url: `${currencyApi}`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['currencies'],
    }),
    updateCurrency: builder.mutation({
      query: ({ id, data }) => ({
        url: `${currencyApi}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['currencies'],
    }),
    deleteCurrency: builder.mutation({
      query: id => ({
        url: `${currencyApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['currencies'],
    }),
    getCurrencyById: builder.query({
      query: id => ({
        url: `${currencyApi}/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllCurrencyQuery,
  useCreateCurrencyMutation,
  useUpdateCurrencyMutation,
  useDeleteCurrencyMutation,
  useGetCurrencyByIdQuery,
} = currrencyApiSlice
