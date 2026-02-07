import api from '@/lib/redux/api'

const vendorsApi = 'accounts/vendors'

export const vendorsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getVendors: builder.query({
      query: () => ({ url: vendorsApi, method: 'GET' }),
      providesTags: ['Vendors'],
    }),
    getVendorById: builder.query({
      query: id => ({ url: `${vendorsApi}/${id}`, method: 'GET' }),
    }),
    createVendor: builder.mutation({
      query: data => ({ url: vendorsApi, method: 'POST', data }),
      invalidatesTags: ['Vendors'],
    }),
    updateVendor: builder.mutation({
      query: ({ id, data }) => ({
        url: `${vendorsApi}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['Vendors'],
    }),
    deleteVendor: builder.mutation({
      query: id => ({ url: `${vendorsApi}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Vendors'],
    }),
  }),
})

export const {
  useGetVendorsQuery,
  useGetVendorByIdQuery,
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
} = vendorsApiSlice
