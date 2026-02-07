import api from '@/lib/redux/api'
const userApi = 'settings/users'

export const userApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getAllUser: builder.query({
      query: params => ({
        url: `${userApi}?${new URLSearchParams(params)}`,
        method: 'GET',
      }),
      overrideExisting: true,
      providesTags: ['users'],
    }),
    createUser: builder.mutation({
      query: data => {
        return {
          url: `${userApi}`,
          method: 'POST',
          data: data,
        }
      },
      invalidatesTags: ['users'],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${userApi}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['users'],
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `${userApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
    getUserById: builder.query({
      query: id => ({
        url: `${userApi}/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = userApiSlice
