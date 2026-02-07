import api from '@/lib/redux/api'

const taxRatesApi = 'inventory/tax-rates'

export const taxRatesApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getTaxRates: builder.query({
      query: () => ({
        url: taxRatesApi,
        method: 'GET',
      }),
      providesTags: ['TaxRates'],
    }),
    getTaxRateById: builder.query({
      query: id => ({
        url: `${taxRatesApi}/${id}`,
        method: 'GET',
      }),
    }),
    createTaxRate: builder.mutation({
      query: data => ({
        url: taxRatesApi,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['TaxRates'],
    }),
    updateTaxRate: builder.mutation({
      query: data => ({
        url: `${taxRatesApi}/${data.id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['TaxRates'],
    }),
    deleteTaxRate: builder.mutation({
      query: id => ({
        url: `${taxRatesApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TaxRates'],
    }),
  }),
})

export const {
  useGetTaxRatesQuery,
  useGetTaxRateByIdQuery,
  useCreateTaxRateMutation,
  useUpdateTaxRateMutation,
  useDeleteTaxRateMutation,
} = taxRatesApiSlice
