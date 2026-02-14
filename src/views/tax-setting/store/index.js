import api from '@/lib/redux/api'

const taxSettingApi = 'accounts/tax-settings'

export const taxSettingApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getTaxSettings: builder.query({
      query: () => ({
        url: taxSettingApi,
        method: 'GET',
      }),
      providesTags: ['TaxSettings'],
    }),
    createTaxSetting: builder.mutation({
      query: data => ({
        url: taxSettingApi,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['TaxSettings'],
    }),
    updateTaxSetting: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${taxSettingApi}/${id}`,
        method: 'POST',
        data: { ...data },
      }),
      invalidatesTags: ['TaxSettings'],
    }),
    deleteTaxSetting: builder.mutation({
      query: id => ({
        url: `${taxSettingApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TaxSettings'],
    }),
    getTaxSettingById: builder.query({
      query: id => ({
        url: `${taxSettingApi}/${id}`,
        method: 'GET',
      }),
      providesTags: ['TaxSettings'],
    }),
  }),
})

export const { useGetTaxSettingsQuery,
     useCreateTaxSettingMutation, 
     useUpdateTaxSettingMutation, 
     useDeleteTaxSettingMutation,
      useGetTaxSettingByIdQuery } = taxSettingApiSlice