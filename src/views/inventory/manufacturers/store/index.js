import api from '@/lib/redux/api'

const manufacturersAPI = 'inventory/manufacturers'

const manufacturersApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getAllManufacturers: builder.query({
      query: () => ({
        url: manufacturersAPI,
        method: 'GET',
      }),
      providesTags: ['Manufacturers'],
    }),
    createManufacturer: builder.mutation({
      query: data => ({
        url: manufacturersAPI,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Manufacturers'],
    }),
    updateManufacturer: builder.mutation({
      query: ({ id, data }) => ({
        url: `${manufacturersAPI}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['Manufacturers'],
    }),
    deleteManufacturer: builder.mutation({
      query: id => ({
        url: `${manufacturersAPI}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Manufacturers'],
    }),
    getManufacturerById: builder.query({
      query: id => ({
        url: `${manufacturersAPI}/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllManufacturersQuery,
  useCreateManufacturerMutation,
  useUpdateManufacturerMutation,
  useDeleteManufacturerMutation,
  useGetManufacturerByIdQuery,
} = manufacturersApiSlice
