import api from '@/lib/redux/api'

const warehousesApi = 'inventory/warehouses'

export const warehousesApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getwarehouses: builder.query({
      query: () => ({
        url: warehousesApi,
        method: 'GET',
      }),
      providesTags: ['warehouses'],
    }),
    getwarehouseById: builder.query({
      query: id => ({
        url: `${warehousesApi}/${id}`,
        method: 'GET',
      }),
    }),
    createwarehouse: builder.mutation({
      query: data => ({
        url: warehousesApi,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['warehouses'],
    }),
    updatewarehouse: builder.mutation({
      query: data => ({
        url: `${warehousesApi}/${data.id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['warehouses'],
    }),
    deletewarehouse: builder.mutation({
      query: id => ({
        url: `${warehousesApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['warehouses'],
    }),
  }),
})

export const {
  useGetwarehousesQuery,
  useGetwarehouseByIdQuery,
  useCreatewarehouseMutation,
  useUpdatewarehouseMutation,
  useDeletewarehouseMutation,
} = warehousesApiSlice
