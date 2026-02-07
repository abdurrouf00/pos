import api from '@/lib/redux/api'

const unitStyleAPI = 'inventory/unit-styles'

const unitStyleApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllUnitStyles: builder.query({
      query: () => ({ url: unitStyleAPI, method: 'GET' }),
      providesTags: ['UnitStyles'],
    }),
    createUnitStyle: builder.mutation({
      query: data => ({ url: unitStyleAPI, method: 'POST', data }),
      invalidatesTags: ['UnitStyles'],
    }),
    updateUnitStyle: builder.mutation({
      query: ({ id, data }) => ({
        url: `${unitStyleAPI}/${id}`,
        method: 'PUT',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['UnitStyles'],
    }),
    deleteUnitStyle: builder.mutation({
      query: id => ({ url: `${unitStyleAPI}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['UnitStyles'],
    }),
    getUnitStyleById: builder.query({
      query: id => ({ url: `${unitStyleAPI}/${id}`, method: 'GET' }),
    }),
  }),
})

export const {
  useGetAllUnitStylesQuery,
  useCreateUnitStyleMutation,
  useUpdateUnitStyleMutation,
  useDeleteUnitStyleMutation,
  useGetUnitStyleByIdQuery,
} = unitStyleApi
