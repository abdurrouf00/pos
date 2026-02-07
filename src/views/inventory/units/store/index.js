import api from '@/lib/redux/api'
const unitsAPI = 'inventory/units'

const unitsApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllUnits: builder.query({
      query: () => ({
        url: unitsAPI,
        method: 'GET',
      }),
      providesTags: ['Units'],
    }),
    createUnit: builder.mutation({
      query: data => ({
        url: unitsAPI,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Units'],
    }),
    updateUnit: builder.mutation({
      query: ({ id, data }) => ({
        url: `${unitsAPI}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['Units'],
    }),
    deleteUnit: builder.mutation({
      query: id => ({
        url: `${unitsAPI}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Units'],
    }),
    getUnitById: builder.query({
      query: id => ({
        url: `${unitsAPI}/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllUnitsQuery,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
  useGetUnitByIdQuery,
} = unitsApi
